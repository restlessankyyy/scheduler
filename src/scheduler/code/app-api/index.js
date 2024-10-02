const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();
const { analyzeText } = require('./ai');

// Initialize Cosmos DB client
const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT,
  key: process.env.COSMOS_DB_KEY,
});

const databaseId = process.env.DATABASE_ID;
const employeesContainerId = process.env.EMPLOYEES_CONTAINER_ID;
const schedulesContainerId = process.env.SCHEDULES_CONTAINER_ID;
const partitionKey = process.env.PARTITION_KEY;

async function createDatabaseAndContainers() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  await database.containers.createIfNotExists({ id: employeesContainerId, partitionKey: { paths: [partitionKey] } });
  await database.containers.createIfNotExists({ id: schedulesContainerId, partitionKey: { paths: [partitionKey] } });
}

createDatabaseAndContainers().catch(err => {
  console.error('Error creating database and containers:', err);
});

const database = client.database(databaseId);
const employeesContainer = database.container(employeesContainerId);
const schedulesContainer = database.container(schedulesContainerId);

// Define GraphQL schema
const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    needsChildCare: Boolean
    prefersOvertime: Boolean
    role: String
    department: String
    availability: [String!] # Array of available time slots, e.g., ["Monday 9-5", "Tuesday 9-5"]
    overtimePreferences: [String!] # Array of preferred overtime slots, e.g., ["Friday 5-9"]
  }

  type Schedule {
    id: ID!
    employee: Employee!
    startTime: String!
    endTime: String!
    isOvertime: Boolean
    notes: String
  }

  type Query {
    employees: [Employee]
    schedules: [Schedule]
    employee(id: ID!): Employee
    schedule(id: ID!): Schedule
    schedulesByEmployee(employeeId: ID!): [Schedule]
  }

  type Mutation {
    createEmployee(name: String!, email: String!, needsChildCare: Boolean, prefersOvertime: Boolean, role: String, department: String, availability: [String!]!, overtimePreferences: [String!]!): Employee
    createSchedule(employeeId: ID!, startTime: String!, endTime: String!, isOvertime: Boolean, notes: String): Schedule
    updateEmployee(id: ID!, name: String, email: String, needsChildCare: Boolean, prefersOvertime: Boolean, role: String, department: String, availability: [String!], overtimePreferences: [String!]): Employee
    updateSchedule(id: ID!, employeeId: ID!, startTime: String, endTime: String, isOvertime: Boolean, notes: String): Schedule
    deleteEmployee(id: ID!): Boolean
    deleteSchedule(id: ID!, employeeId: ID!): Boolean
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    employees: async () => {
      const { resources } = await employeesContainer.items.readAll().fetchAll();
      return resources;
    },
    schedules: async () => {
      const { resources } = await schedulesContainer.items.readAll().fetchAll();
      return resources;
    },
    employee: async (_, { id }) => {
      const { resource } = await employeesContainer.item(id, id).read();
      return resource;
    },
    schedule: async (_, { id }) => {
      const { resource } = await schedulesContainer.item(id, id).read();
      return resource;
    },
    schedulesByEmployee: async (_, { employeeId }) => {
      const querySpec = {
        query: "SELECT * FROM c WHERE c.employeeId = @employeeId",
        parameters: [
          { name: "@employeeId", value: employeeId },
        ],
      };
      const { resources } = await schedulesContainer.items.query(querySpec).fetchAll();
      return resources;
    },
  },
  Mutation: {
    createEmployee: async (_, { name, email, needsChildCare, prefersOvertime, role, department, availability, overtimePreferences }) => {
      const { resource } = await employeesContainer.items.create({
        id: email,
        name,
        email,
        needsChildCare,
        prefersOvertime,
        role,
        department,
        availability,
        overtimePreferences,
        partitionKey: email,
      });
      return resource;
    },
    createSchedule: async (_, { employeeId, startTime, endTime, isOvertime, notes }) => {
      const { resource: employee } = await employeesContainer.item(employeeId, employeeId).read();
      if (!employee) {
        throw new Error(`Employee with ID ${employeeId} does not exist.`);
      }

      // Check for overlapping schedules
      const querySpec = {
        query: "SELECT * FROM c WHERE c.employeeId = @employeeId AND ((c.startTime < @endTime AND c.endTime > @startTime))",
        parameters: [
          { name: "@employeeId", value: employeeId },
          { name: "@startTime", value: startTime },
          { name: "@endTime", value: endTime },
        ],
      };
      const { resources: existingSchedules } = await schedulesContainer.items.query(querySpec).fetchAll();

      if (existingSchedules.length > 0) {
        throw new UserInputError('Schedule conflict detected. The employee already has an overlapping schedule.');
      }

      const { resource } = await schedulesContainer.items.create({
        id: String(Date.now()),
        employeeId,
        startTime,
        endTime,
        isOvertime,
        notes,
        partitionKey: employeeId,
      });
      return resource;
    },
    updateEmployee: async (_, { id, name, email, needsChildCare, prefersOvertime, role, department, availability, overtimePreferences }) => {
      const { resource } = await employeesContainer.item(id, id).read();
      if (!resource) {
        throw new Error(`Employee with ID ${id} does not exist.`);
      }
      const updatedEmployee = { ...resource, name, email, needsChildCare, prefersOvertime, role, department, availability, overtimePreferences };
      await employeesContainer.item(id, id).replace(updatedEmployee);
      return updatedEmployee;
    },
    updateSchedule: async (_, { id, employeeId, startTime, endTime, isOvertime, notes }) => {
      console.log(`Updating schedule with ID: ${id}`);
      const { resource } = await schedulesContainer.item(id, employeeId).read();
      if (!resource) {
        throw new UserInputError(`Schedule with ID ${id} does not exist.`);
      }

      // Check for overlapping schedules
      const querySpec = {
        query: "SELECT * FROM c WHERE c.employeeId = @employeeId AND c.id != @id AND ((c.startTime < @endTime AND c.endTime > @startTime))",
        parameters: [
          { name: "@employeeId", value: employeeId },
          { name: "@id", value: id },
          { name: "@startTime", value: startTime },
          { name: "@endTime", value: endTime },
        ],
      };
      const { resources: existingSchedules } = await schedulesContainer.items.query(querySpec).fetchAll();

      if (existingSchedules.length > 0) {
        throw new UserInputError('Schedule conflict detected. The employee already has an overlapping schedule.');
      }

      const updatedSchedule = { ...resource, startTime, endTime, isOvertime, notes };
      await schedulesContainer.item(id, employeeId).replace(updatedSchedule);
      console.log(`Updated schedule: ${JSON.stringify(updatedSchedule)}`);
      return updatedSchedule;
    },
    deleteEmployee: async (_, { id }) => {
      // Check for existing schedules
      const querySpec = {
        query: "SELECT * FROM c WHERE c.employeeId = @employeeId",
        parameters: [
          { name: "@employeeId", value: id },
        ],
      };
      const { resources: existingSchedules } = await schedulesContainer.items.query(querySpec).fetchAll();

      if (existingSchedules.length > 0) {
        throw new UserInputError('Cannot delete employee with existing schedules.');
      }

      await employeesContainer.item(id, id).delete();
      return true;
    },
    deleteSchedule: async (_, { id, employeeId }) => {
      const { resource } = await schedulesContainer.item(id, employeeId).read();
      if (!resource) {
        throw new Error(`Schedule with ID ${id} does not exist.`);
      }

      // Check for dependencies or business rules
      const querySpec = {
        query: "SELECT * FROM c WHERE c.employeeId = @employeeId AND c.id != @id",
        parameters: [
          { name: "@employeeId", value: resource.employeeId },
          { name: "@id", value: id },
        ],
      };
      const { resources: remainingSchedules } = await schedulesContainer.items.query(querySpec).fetchAll();

      if (remainingSchedules.length === 0) {
        throw new UserInputError('Cannot delete the last schedule of an employee.');
      }

      await schedulesContainer.item(id, employeeId).delete();
      return true;
    },
  },
  Schedule: {
    employee: async (schedule) => {
      const { resource } = await employeesContainer.item(schedule.employeeId, schedule.employeeId).read();
      if (!resource) {
        throw new Error(`Employee with ID ${schedule.employeeId} does not exist.`);
      }
      return resource;
    },
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});