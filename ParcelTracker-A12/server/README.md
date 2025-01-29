# FastPathao - Backend

The backend of the **FastPathao** project handles dynamic parcel data processing, providing RESTful API endpoints for managing parcels, delivery statuses, user interactions. It integrates with MongoDB for efficient data storage and supports CRUD operations. JWT authentication ensures secure access to private routes, while CORS is enabled for seamless communication with the client-side application. Built with Node.js, Express.js, and MongoDB, the backend offers a robust, scalable solution for managing and retrieving parcel data efficiently.

## Live API URL [fastpathao-api](https://parcel-tracker-server-seven.vercel.app/)

## Features:

- **RESTful APIs**: Provides endpoints for managing parcels and user interactions.
- **Database Integration**: Uses MongoDB for efficient and scalable data storage of parcel information.
- **CRUD Operations**: Supports Create, Read, Update, and Delete functionality for parcel management.
- **CORS Enabled**: Ensures the server can communicate with the client-side application from different origins.
- **JWT Authentication**: Secures user routes and ensures authorized access using JSON Web Tokens (JWT), validating user identity for specific operations.

## Tech Stack:

- **Node.js**: Backend runtime for efficient server-side execution.
- **Express.js**: Lightweight framework for building APIs.
- **MongoDB**: NoSQL database for data management of parcel information.
- **JWT**: For user authentication and authorization, ensuring secure access to private routes.