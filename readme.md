# Location Service

## Description

Location Service is an application designed to provide functionalities related to location management and distance calculation. User needs to be Authenticated to use all the functions.

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

4. **Start the server:**

```bash
npm start
```

## API Documentation

The API documentation is generated using Swagger and can be accessed at `/api-docs` endpoint when the server is running.

To view the documentation, navigate to `http://localhost:3000/api-docs` in your web browser.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or features.