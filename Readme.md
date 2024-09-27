# Schedule Management System

This project is a Schedule Management System that allows users to manage employees and their schedules. It leverages GraphQL for API interactions, Cosmos DB for data storage, and integrates with the Gemini API for enhanced user interactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Queries and Mutations](#graphql-queries-and-mutations)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/schedule-management.git
   cd schedule-management
   ```

2. Install dependencies:

``` npm install ```

3. Set up environment variables: Create a .env file in the root directory and add the following variables:
``` COSMOS_DB_ENDPOINT=your_cosmos_db_endpoint
COSMOS_DB_KEY=your_cosmos_db_key
DATABASE_ID=your_database_id
EMPLOYEES_CONTAINER_ID=your_employees_container_id
SCHEDULES_CONTAINER_ID=your_schedules_container_id
PARTITION_KEY=your_partition_key ```

4. Usage
   
``` npm start ```


