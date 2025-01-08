# Gadget Heaven

Gadget Heaven is a user-friendly web application that showcases a curated selection of gadgets. It allows users to browse various categories, view detailed specifications, and manage their favorite items. With intuitive navigation, Gadget Heaven is the perfect destination for tech enthusiasts exploring the latest gadgets.

## Live Site

- [Netlify](https://imaginative-semolina-e3f9d0.netlify.app/)

![Screenshot](gadget.png)

## Technologies Used:

- **React.js**: A JavaScript library for building user interfaces.
- **Context API**: A React API for managing global state across components.
- **React Router**: A library for handling routing and navigation in React apps.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.

## Features

1. **Dynamic Gadget Listings**: Users can browse a curated collection of gadgets organized by categories, each with detailed specifications.

2. **Favorite Management**: Users can tap the heart icon to save gadgets to a favorites list for easy access and comparison later.

3. **Detailed Views**: Each gadget has a dedicated page displaying comprehensive information, including images, descriptions, and specifications.

4. **Intuitive Navigation**: The application features a user-friendly navigation system with NavLink, making it easy for users to access different sections and enhancing their overall experience.

5. **Purchase Functionality**: Users can easily add gadgets to their cart and proceed to checkout, streamlining the purchasing process directly through the app.


## React Fundamental Concepts Used

- **JSX (JavaScript XML)**: Used to write HTML-like syntax within JavaScript, making it easier to define the UI structure.

- **Components**: The application is built using reusable functional components that encapsulate specific parts of the UI.

- **State Management (`useState`)**: Utilized to manage local state within components, allowing for dynamic updates based on user interactions.

- **Effect Hook (`useEffect`)**: Employed to handle side effects such as fetching data from APIs and updating the UI based on dependencies.

- **Context API**: Implemented to manage global state and share data across multiple components without prop drilling.

- **Event Handling**: React’s synthetic event system is used to manage user interactions, such as clicks and form submissions.

- **React Router**: Enables navigation between different pages for a single-page application (SPA) experience, allowing users to navigate without full page reloads.

- **`useNavigate`**: Facilitates programmatic navigation, allowing components to redirect users based on actions (e.g., after form submission).

- **`useParams`**: Extracts URL parameters for rendering dynamic content, such as detailed information about gadgets.

- **`NavLink`**: Creates navigation links with automatic active styling, improving the navigation experience and indicating the current page.

## Data Management

I have used Context API for managing global state across components, enabling seamless data sharing without prop drilling. This approach helps maintain a consistent state throughout the application, particularly for user preferences and selected gadgets.

## Dependencies:

The following dependencies are used in this project:

- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-helmet-async**: ^2.0.5
- **react-icons**: ^5.3.0
- **react-rating-stars-component**: ^2.2.0
- **react-router-dom**: ^6.27.0
- **react-tabs**: ^6.0.2
- **react-toastify**: ^10.0.6
- **recharts**: ^2.13.3

## Local Setup

To run this project locally, follow the steps below:

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

4. Start the development server:
    ```bash
    npm start
    ```

5. Open the project in your browser:
   Go to `http://localhost:3000` in your browser to see the project running.

Make sure to replace `your-username/your-repository-name` with your actual GitHub username and repository name.
