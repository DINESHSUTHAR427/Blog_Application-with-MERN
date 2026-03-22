<div align="center">

# Blogify 📝

**A modern, full-stack blog platform — write, share, and connect.**

![Banner](public/Screenshot2026-03-22at19.21.16.png)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://blog-application-with-mern.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About the Project

**Blogify** is a full-stack blogging application built with the **MERN stack** (MongoDB, Express, Node.js) and **EJS** as the templating engine. It allows users to register, log in, create rich blog posts with cover images, leave comments, and manage their own content — all in a sleek, dark-themed UI with particle effects.

---

## 🌐 Live Demo

🔗 **[https://blog-application-with-mern.vercel.app/](https://blog-application-with-mern.vercel.app/)**

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure sign-up, sign-in, and session management via HTTP-only cookies
- 📝 **Full Blog CRUD** — Create, read, update, and delete your blog posts with ease
- 🖼️ **Image Upload** — Upload cover images using **Multer** and store them on **Cloudinary**
- 💬 **Comments System** — Authenticated users can comment on any blog post
- 👤 **Author Profiles** — Each blog displays the author's avatar and username
- 🛡️ **Authorization Guards** — Only blog owners can edit or delete their posts
- 🌌 **Particle.js Background** — Immersive animated dark UI with glassmorphism cards
- 📱 **Responsive Design** — Fully mobile-friendly via Bootstrap 5
- ⚡ **Vercel Deployment** — Serverless-ready with `serverless-http`

---

## 📸 Screenshots

> Screenshots are from the live deployed application.

### 🏠 Home Page
![Home Page](https://raw.githubusercontent.com/DINESHSUTHAR427/Blog_Application-with-MERN/main/public/images/screenshot-home.png)

### 📄 Blog Detail Page
![Blog Page](https://raw.githubusercontent.com/DINESHSUTHAR427/Blog_Application-with-MERN/main/public/images/screenshot-blog.png)

### ✏️ Edit Blog Page
![Edit Blog](https://raw.githubusercontent.com/DINESHSUTHAR427/Blog_Application-with-MERN/main/public/images/screenshot-edit.png)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Templating** | EJS |
| **Styling** | Bootstrap 5 + Vanilla CSS |
| **Auth** | JSON Web Tokens (JWT) + Cookie Parser |
| **Image Upload** | Multer + Cloudinary |
| **Animation** | Particles.js |
| **Deployment** | Vercel (serverless-http) |
| **Dev Tools** | Nodemon, dotenv |

---

## 📁 Project Structure

```
blogify/
├── api/                    # Vercel serverless entry
├── middlewares/
│   ├── authentication.js   # JWT auth middleware
│   └── multer.js           # File upload config
├── models/
│   ├── blog.js             # Blog schema
│   ├── comment.js          # Comment schema
│   └── user.js             # User schema
├── public/
│   ├── images/             # Static assets
│   └── particles-config.js # Particle animation config
├── routes/
│   ├── blog.js             # Blog & comment routes
│   └── user.js             # Auth routes
├── services/
│   └── authentication.js   # JWT sign/validate helpers
├── utils/
│   └── cloudinary.js       # Cloudinary SDK config
├── views/
│   ├── partials/           # Reusable EJS partials (nav, head)
│   ├── home.ejs
│   ├── blog.ejs
│   ├── editBlog.ejs
│   ├── addBlog.ejs
│   ├── signin.ejs
│   └── signup.ejs
├── app.js                  # Main Express server
├── .env.example            # Environment variable template
└── vercel.json             # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A [Cloudinary](https://cloudinary.com/) account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DINESHSUTHAR427/Blog_Application-with-MERN.git

# 2. Navigate to the project directory
cd Blog_Application-with-MERN

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:8000** 🎉

### Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Then fill in your values:

```env
# MongoDB connection string
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogify

# Server port
PORT=8000

# Cloudinary credentials
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# JWT secret key (use a long, random string)
SECRET=your_super_secret_jwt_key
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🔌 API Routes

### Auth Routes (`/user`)

| Method | Path | Description | Auth Required |
|---|---|---|---|
| `GET` | `/user/signin` | Sign-in page | ❌ |
| `POST` | `/user/signin` | Authenticate user | ❌ |
| `GET` | `/user/signup` | Sign-up page | ❌ |
| `POST` | `/user/signup` | Register new user | ❌ |
| `GET` | `/user/logout` | Log out & clear cookie | ✅ |

### Blog Routes (`/blog`)

| Method | Path | Description | Auth Required |
|---|---|---|---|
| `GET` | `/blog/add-new` | New blog form | ✅ |
| `POST` | `/blog/` | Create a blog | ✅ |
| `GET` | `/blog/:id` | View a blog | ❌ |
| `GET` | `/blog/edit/:id` | Edit blog form | ✅ Owner only |
| `POST` | `/blog/edit/:id` | Update blog | ✅ Owner only |
| `POST` | `/blog/delete/:id` | Delete blog | ✅ Owner only |
| `POST` | `/blog/comment/:blogId` | Add a comment | ✅ |

---

## ☁️ Deployment

This project is configured for **Vercel** deployment.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

The `vercel.json` config routes all traffic through the `api/index.js` serverless function.

> Make sure to add all environment variables in your **Vercel project dashboard** under **Settings → Environment Variables**.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **[Dinesh Suthar](https://github.com/DINESHSUTHAR427)**

⭐ If you like this project, give it a star!

</div>
