# DEBUG OIST CLUB WEBSITE

![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-blue)
![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-Components-purple)
![Aceternity UI](https://img.shields.io/badge/Aceternity-UI-orange)

## 🚀 Project Overview
This project is a **Next.js-based CLUB WEBSITE** designed to manage events, users, and future features of the club. It utilizes **Clerk Authentication**, **MongoDB**, and **shadcn/UI** for a modern UI experience. The dashboard supports CRUD operations for events, user management, and email notifications via external services like SendGrid or Mailgun.

## 📌 Features
- **Authentication**: Clerk for login and session management.
- **Dashboard UI**: Built with shadcn/UI, Aceternity UI, and Tailwind CSS.
- **Events Module**:
    - Create, update, delete events.
    - Register users for events.
    - Send event-related emails.
- **Members Module**:
    - Manage user profiles.
    - View and modify user roles.
- **Database**: MongoDB for storing events and user data.
- **External Services**: SendGrid/Mailgun for email notifications.
- **Future Features**: Placeholder for upcoming improvements.

## 🏗️ System Architecture

<img src="./arch.png" alt="System Architecture" width="100%" height="100%"/>

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, shadcn/UI, Aceternity UI
- **Backend**: Next.js API Routes, Server Actions
- **Authentication**: Clerk
- **Database**: MongoDB
- **Email Service**: SendGrid / Mailgun
- **State Management**: React hooks (local state)

## 📦 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AryanKumarOfficial/DebugOIST.git
cd DebugOIST
```

### 2️⃣ Install Dependencies
```sh
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
CLERK_API_KEY=<your_clerk_backend_api_key>
MONGODB_URI=<your_mongodb_connection_string>
EMAIL_SERVICE=<your_email_service_api_key>
```

### 4️⃣ Run the Development Server
```sh
yarn run dev
```
Access the website at `http://localhost:3000`

## 🚀 Deployment
To deploy the project, use **Vercel** (recommended) or any cloud hosting provider:
```sh
vercel deploy
```

## 🛡️ Security Considerations
- Use **environment variables** to manage sensitive credentials.
- Ensure **role-based access control (RBAC)** for user management.

[//]: # (- Implement **rate limiting** on API routes.)

## 📝 Contribution Guidelines
1. **Fork the repository**.
2. **Create a new feature branch**.
3. **Commit your changes**.
4. **Push the branch** and create a Pull Request.

## 📜 License
This project is **MIT Licensed**. Feel free to use and modify it for your needs.

---
🚀 **Built with Next.js, MongoDB & Clerk Authentication.**