
# Example GraphQL Queries and Mutations

## Create an Employee:

```graphql
mutation {
  createEmployee(
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    needsChildCare: false,
    prefersOvertime: true,
    role: "Engineer",
    department: "Development",
    availability: ["Monday 9-5", "Wednesday 9-5"],
    overtimePreferences: ["Thursday 5-9"]
  ) {
    id
    name
    email
  }
}
```

## Create a Schedule:

```graphql
mutation {
  createSchedule(
    employeeId: "bob.johnson@example.com",
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-01T17:00:00Z",
    isOvertime: false,
    notes: "Regular working hours"
  ) {
    id
    startTime
    endTime
  }
}
```

## Update an Employee:

```graphql
mutation {
  updateEmployee(
    id: "bob.johnson@example.com",
    name: "Bob Johnson Updated",
    email: "bob.johnson@example.com",
    needsChildCare: true,
    prefersOvertime: false,
    role: "Senior Engineer",
    department: "Development",
    availability: ["Monday 9-6", "Wednesday 9-6"],
    overtimePreferences: ["Friday 5-9"]
  ) {
    id
    name
    email
    needsChildCare
    prefersOvertime
    role
    department
    availability
    overtimePreferences
  }
}
```

## Update a Schedule:

```graphql
mutation {
  updateSchedule(
    id: "1727400263394",
    employeeId: "bob.johnson@example.com",
    startTime: "2023-10-02T09:00:00Z",
    endTime: "2023-10-02T17:00:00Z",
    isOvertime: false,
    notes: "Updated working hours"
  ) {
    id
    startTime
    endTime
    isOvertime
    notes
  }
}
```

## GraphQL Query to Get Schedule

```graphql
query {
  schedule(id: "1727400263394", employeeId: "bob.johnson@example.com") {
    id
    employee {
      id
      name
    }
    startTime
    endTime
    isOvertime
    notes
  }
}
```Example GraphQL Queries and Mutations

Create an Employee:

mutation {
  createEmployee(
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    needsChildCare: false,
    prefersOvertime: true,
    role: "Engineer",
    department: "Development",
    availability: ["Monday 9-5", "Wednesday 9-5"],
    overtimePreferences: ["Thursday 5-9"]
  ) {
    id
    name
    email
  }
}

Create a Schedule:

mutation {
  createSchedule(
    employeeId: "bob.johnson@example.com",
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-01T17:00:00Z",
    isOvertime: false,
    notes: "Regular working hours"
  ) {
    id
    startTime
    endTime
  }
}

Update an Employee:

mutation {
  updateEmployee(
    id: "bob.johnson@example.com",
    name: "Bob Johnson Updated",
    email: "bob.johnson@example.com",
    needsChildCare: true,
    prefersOvertime: false,
    role: "Senior Engineer",
    department: "Development",
    availability: ["Monday 9-6", "Wednesday 9-6"],
    overtimePreferences: ["Friday 5-9"]
  ) {
    id
    name
    email
    needsChildCare
    prefersOvertime
    role
    department
    availability
    overtimePreferences
  }
}

Update a Schedule:

mutation {
  updateSchedule(
    id: "1727400263394",
    employeeId: "bob.johnson@example.com",
    startTime: "2023-10-02T09:00:00Z",
    endTime: "2023-10-02T17:00:00Z",
    isOvertime: false,
    notes: "Updated working hours"
  ) {
    id
    startTime
    endTime
    isOvertime
    notes
  }
}

GraphQL Query to Get Schedule

query {
  schedule(id: "1727400263394", employeeId: "bob.johnson@example.com") {
    id
    employee {
      id
      name
    }
    startTime
    endTime
    isOvertime
    notes
  }
}

