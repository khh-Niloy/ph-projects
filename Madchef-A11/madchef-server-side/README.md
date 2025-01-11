# Madchef - Backend

The backend of the Madchef project handles dynamic food data processing, providing RESTful API endpoints for managing food products, categories, and user interactions. It integrates with MongoDB for efficient data storage and supports CRUD operations. JWT authentication ensures secure access to private routes, while CORS is enabled for communication with the client-side application. Built with Node.js, Express.js, and MongoDB, the backend offers a robust, scalable solution for managing and retrieving food data.

## Live API URL [madchef-api](https://madchef-server-side.vercel.app/allfood)

## Features:

- **RESTful APIs**: Provides endpoints for managing sports equipment and user interactions.
- **Database Integration**: Uses MongoDB for efficient and scalable data storage of sports equipment.
- **CRUD Operations**: Supports Create, Read, Update, and Delete functionality for sports equipment.
- **CORS Enabled**: Ensures the server can communicate with the client-side application from different origins.
- **JWT Authentication**: Secures user routes and ensures authorized access using JSON Web Tokens (JWT), validating user identity for specific operations.

## Tech Stack:

- **Node.js**: Backend runtime for efficient server-side execution.
- **Express.js**: Lightweight framework for building APIs.
- **MongoDB**: NoSQL database for data management of sports equipment.
- **JWT**: For user authentication and authorization, ensuring secure access to private routes.

## Local Setup

To run the backend of this project locally, follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```

2. Navigate into the project directory:
    ```bash
    cd your-repository-name
    ```

3. Install dependencies:
   Make sure you have `Node.js` installed, then run:
    ```bash
    npm install
    ```

4. Set up MongoDB:
   - Create a MongoDB database (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based instance).
   - Create a `.env` file in the root of the project and add the following:
     ```env
     MONGODB_URI=your-mongodb-uri-here
     ```
   - Replace `your-mongodb-uri-here` with the actual MongoDB connection URI.

5. Start the server:
    ```bash
    npm start
    ```

6. Open the API in your browser or use a tool like Postman:
   Go to `http://localhost:5000/equipments` to access the API.

Make sure to replace `your-username/your-repository-name` with your actual GitHub username and repository name.

