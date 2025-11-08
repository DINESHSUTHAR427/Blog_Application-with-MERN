# Blogify 📝

A simple and elegant blogging platform built with Node.js, Express, and MongoDB. Blogify allows users to sign up, create beautifully formatted blog posts with cover images, and engage with content through comments.

 <!-- Replace with a real screenshot of your app -->
URl For visit =>  
https://blogify-a-simple-blogging-applicati-mu.vercel.app/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

-   **🔐 Secure User Authentication**: Signup and Signin functionality with password hashing (`crypto`) and salting.
-   **📝 Full Blog Management**: Logged-in users can create and view blog posts.
-   **🖼️ Image Uploads**: Users can upload a cover image for each blog post using `multer`.
-   **💬 Commenting System**: Users can post comments on blogs to engage with the content.
-   **🌐 RESTful API**: A clear and structured set of API endpoints for managing users, blogs, and comments.
-   **🔐 JWT-based Sessions**: Secure and stateless session management using JSON Web Tokens.

## Technologies Used

-   **Backend**: Node.js, Express
-   **Database**: MongoDB (with Mongoose)
-   **View Engine**: EJS (Embedded JavaScript)
-   **Authentication**: JSON Web Token (JWT)
-   **File Uploads**: Multer
-   **Styling**: Bootstrap

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
-   Node.js (v16.x or later recommended)
-   npm
-   MongoDB

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/Blogify---A-Simple-Blogging-Application-main.git
    cd Blogify---A-Simple-Blogging-Application-main
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up the database:**
    Ensure your MongoDB server is running. The application connects to `mongodb://localhost:27017/blogify` by default. You can change this connection string in `index.js`.

## Usage

1.  **Start the server for development:**

    This command uses `nodemon` to automatically restart the server on file changes.
    ```sh
    npm run dev
    ```

2.  **Start the server for production:**
    ```sh
    npm start
    ```

3.  **Access the application:**

    Open your web browser and navigate to `http://localhost:8000`.

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
