# auth-backend

Backend to implement user sign in authentication and register with session management and middleware.

## Built With

- Node.js
- Express
- PostgreSQL
- Redis

## Prerequisites

If running locally, you must have postgres and redis installed and running. You can then modify the values in `.env` to connect to both postgres and redis. Refer to method #1.

If you have docker installed, refer to method #2.

## Installation - Method #1

- Run `npm install` to install dependencies
- Run `npm start` to start the application

## For demo go to 
https://micro-authentication.herokuapp.com/api-docs

for registering
{
"name": "Test User",
"email": "test@test.com",
"password": "Abcdef123456!"
}

for login
{
"email": "test@test.com",
"password": "Abcdef123456!"
}

for testing to get user data use postman after login get the auth token
{
    "success": "true",
    "userId": 3,
    "user": {
        "id": 3,
        "name": "Test User",
        "email": "test@test.com",
        "created": "2021-02-15T10:34:45.930Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MTM0ODg0NzQsImV4cCI6MTYxMzU3NDg3NH0.fjZTSThnFJcl53GVywNKd2iSooDGgVVYWbjDAuJKxIo"
}

go to /user/getAllUsers, put the token in Bearer Token to get the results
