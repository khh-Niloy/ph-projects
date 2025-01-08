# EquiSports - Backend

The EquiSports backend handles sports equipment data using Node.js and Express.js, with MongoDB for efficient storage. It exposes API endpoints for product management, user authentication, and inventory updates. The backend supports real-time updates, searching, and filtering of products, with CORS for secure communication between client and server.

## Live API URL [equiSports-api](https://equi-sports-server-side.vercel.app/equipments)

## Features:
- **RESTful APIs**: Provides endpoints for managing sports equipment and user interactions.
- **Database Integration**: Uses MongoDB for efficient and scalable data storage of sports equipment.
- **CRUD Operations**: Supports Create, Read, Update, and Delete functionality for sports equipment.
- **CORS Enabled**: Ensures the server can communicate with the client-side application from different origins.

## Technologies Used:
- **Node.js**: Backend runtime for efficient server-side execution.
- **Express.js**: Lightweight framework for building APIs.
- **MongoDB**: NoSQL database for data management of sports equipment.

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
