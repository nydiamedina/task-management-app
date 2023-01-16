# Nicasource Coding Challenge: Task Management App

## Challenge Details

**The Challenge**

You will be required to build a REST API for a simple task management application. The API should allow users to create, read, update, and delete tasks. Each task should have the following properties:

- Title (string)
- Description (string)
- Status (enum: "pending", "in progress", "done")

The API should also have a user authentication system using JSON Web Tokens (JWTs). Users should be able to sign up, log in, and log out.

**Requirements:**

1. The API should be built using Typescript, Node.js, and Express.js.
2. The database should be MySQL and the ORM should be TypeORM.
3. The code should be organized using a model-repository-service architecture.
4. The API should be Dockerized and the Docker configuration files should be included in the project.
5. Document the API with Swagger (Plus)