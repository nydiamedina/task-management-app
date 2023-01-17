# Coding Challenge: Task Management App

A REST API for a task management application using TypeScript, Express.js, TypeORM, and JWT authentication and following the model-repository-service architecture.

# Challenge Details

## The Challenge

You will be required to build a REST API for a simple task management application. The API should allow users to create, read, update, and delete tasks. Each task should have the following properties:

- Title (string)
- Description (string)
- Status (enum: "pending", "in progress", "done")

The API should also have a user authentication system using JSON Web Tokens (JWTs). Users should be able to sign up, log in, and log out.

## Requirements

1. The API should be built using Typescript, Node.js, and Express.js.
2. The database should be MySQL and the ORM should be TypeORM.
3. The code should be organized using a model-repository-service architecture.
4. The API should be Dockerized and the Docker configuration files should be included in the project.
5. Document the API with Swagger (Plus)

# Development

## Up and Running

Placeholder

## Database

Placeholder

## Code Structure

The task management API follows the model-repository-service architecture, and it's structured in the following way:

- **models**: used to define the ORM models, such as, Task, TaskStatus, and User.
- **repositories**: used to provide an abstraction layer between the application and the database, allowing to perform CRUD operations on the data.
- **business-models**: used to represent the business entities in the API and provide a more convenient model for the app to interact with.
- **services**: used to encapsulate the business logic of the API, and the controllers use them to perform specific tasks, such as creating a new user or retrieving a list of tasks.
- **controllers**: used to handle the logic of the API, such as validating user input and generating a response to be sent to the client.
- **middlewares**: functions that are executed before the request reaches the controller and in this case are used to authenticate endpoints.
- **config**: used to store the database configuration.
- **container.ts**: used for dependency injection and to create an instance of all the necessary services for the API to function.
- **app.ts**: entry point of the API. Used to start up the server and listen for the incoming requests.

### Dependencies

- **express**: framework used to build the API in Node.js.
- **cors**: middleware for Express that allows for handling CORS (Cross-Origin Resource Sharing) headers to enable communication between different domains.
- **typeorm**: TypeScript ORM (Object-Relational Mapping) for Node.js to interact with MySQL databases.
- **mysql2**: library that provides a Node.js driver for communicating with MySQL databases.
- **jsonwebtoken**: library to create and verify JSON Web Tokens (JWT) for authentication and authorization.
- **bcryptjs**: library used for hashing and comparing passwords.
- **dotenv**: library used to load environment variables from a .env file.
- **ts-node**: library to run TypeScript files directly with node, without the need for compiling them to JavaScript first.

## API Documentation

Placeholder
