# Location Service Application Documentation

## Overview

Location Service is a Node.js application designed to provide location management functionalities including user registration, authentication, saving user locations, calculating distance between two locations, and finding the closest location to a given point.

## Features

- User registration and authentication
- Saving user locations into a Database
- Calculating distance between two locations
- Finding the closest location to a given point from the database

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt for Password Hashing
- Joi for request validation
- Swagger for API documentation
- Jest for testing

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dkachhot21/Location_Service.git
   ```

2. **Install dependencies:**

   ```bash
   cd Location_Service
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   DB_CONNECTION_STRING=<Create a MongoDB Cluster and save the connection string here>
   ACCESS_TOKEN_KEY=<Secrete_Key_for_JWT>
   ```

## **Start the server:**

### **Approach 1**
- Assuming You have done all the above steps to setup the project
   ```bash
   npm start
   ```
### **Approach 2**
- Pull the Docker Image from docker Hub (Assuming you already have docker in your system with docker hub logged in)
  ```bash
  docker pull dkachhot/location
  ```
- Run the image using docker
  ```bash
  docker run -p 3000:3000 dkachhot/location
  ```
  This will start the server on port 3000  


## Usage

Once the server is running, you can access the following endpoints by going on the http://localhost:3000 :

- **User Registration:**

  ```http
  POST /user/register
  ```

  Register a new user by providing a username, email, and password in the request body.

- **User Login:**

  ```http
  POST /user/login
  ```

  Login with a registered user by providing the email and password in the request body. Upon successful login, you will receive an access token.

- **Get Current User:**

  ```http
  GET /user/current
  ```

  Retrieve information about the currently authenticated user.

- **Save Location:**

  ```http
  POST /api/location
  ```

  Save a new location by providing a name, latitude, and longitude in the request body.

- **Calculate Distance:**

  ```http
  POST /api/distance
  ```

  Calculate the distance between two coordinates by providing their latitude and longitude in the request body.

- **Find Closest Location:**

  ```http
  POST /api/closest
  ```

  Find the closest location to a given point by providing its latitude and longitude in the request body.

## API Documentation

The API documentation is generated using Swagger and can be accessed at `/api-docs` endpoint when the server is running.

To view the documentation, navigate to `http://localhost:3000/api-docs` in your web browser.

## Running Tests

To run the test suite, use the following command (Not for Docker Image):

```bash
npm test
```

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or features.