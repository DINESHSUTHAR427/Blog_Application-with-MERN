# Blogify - A Simple Blogging Application

Welcome to Blogify! This is a simple blogging application built with Node.js, Express, and MongoDB. It provides basic user authentication features like signup and signin, with secure password storage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

## Features

-   **User Authentication**:
    -   User signup with email and password.
    -   User signin.
-   **Secure Password Storage**: Passwords are not stored in plain text. They are hashed using Node.js `crypto` module with a unique salt for each user.

## Technologies Used

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Templating Engine**: EJS (Embedded JavaScript)
-   **Password Hashing**: Node.js `crypto` module

## Project Structure

```
Bloging appliction/
├── models/
│   └── user.js         # Mongoose User schema and model
├── node_modules/
├── public/
│   └── user.webp       # Default user image
├── routes/
│   └── user.js         # User-related routes (signup, signin)
├── views/
│   ├── home.ejs
│   ├── signin.ejs
│   └── signup.ejs
├── .gitignore
├── index.js            # Main application entry point
├── package-lock.json
└── package.json
```

## Prerequisites

-   Node.js (v14.x or later recommended)
-   npm
-   MongoDB installed and running on `mongodb://localhost:27017`.

## Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd "Bloging appliction"
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

## Usage

1.  **Start the server:**

    To run the application, execute the following command from the `Bloging appliction` directory:

    ```sh
    node index.js
    ```

    For development, it's recommended to use `nodemon` to automatically restart the server on file changes:

    ```sh
    npm install -g nodemon
    nodemon index.js
    ```

2.  **Access the application:**

    Open your web browser and navigate to `http://localhost:8000`.

## API Endpoints

The following are the main routes available for user management:

-   `GET /`: Renders the home page.
-   `GET /user/signup`: Renders the user registration page.
-   `POST /user/signup`: Handles new user creation.
-   `GET /user/signin`: Renders the user login page.
-   `POST /user/signin`: Handles user login.

## Future Improvements

This project has a solid foundation. Here are some features that could be added next:

-   **Complete Sign-in Logic**: Implement session management (e.g., using JWT or express-session) upon successful login to keep users authenticated.
-   **Blog Post CRUD**: Allow logged-in users to Create, Read, Update, and Delete their blog posts.
-   **User Profiles**: Create pages for users to view and manage their profiles.
-   **Comments**: Allow users to comment on blog posts.
-   **Frontend Enhancements**: Improve the UI/UX with a CSS framework like Bootstrap or Tailwind CSS.
-   **Error Handling**: Add a centralized error handling middleware for more robust error management.

---
