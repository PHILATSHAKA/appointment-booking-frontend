# 🗓️ Appointment Booking Frontend

A modern, responsive appointment booking web app built with **Next.js 15**, **Zod**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Features

- 📅 Schedule appointments with ease
- 🏦 Browse and select branches
- 💡 Interactive UI with Tailwind CSS
- ⚙️ Fully containerized using Docker
- 🔗 Connects seamlessly to backend API

---

## 🧠 Tech Stack

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **React Context API**
- **Docker**

---

## 🧰 Prerequisites

Ensure you have the following installed:

- [Node.js ≥ 18](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

---

## 🏗️ Local Development

⚙️ Environment Variables

Create an .env file in the root folder:
NEXT_PUBLIC_API_URL=http://localhost:4000

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

```

# App runs at: http://localhost:3000

🐳 Run with Docker

1. Build the Docker image
   docker compose build --no-cache

2. Run the container
   docker compose up --build

The app will be available at http://localhost:3000

📁 Project Structure
.
├── app/ # Next.js app directory
├── components/ # Reusable UI components
├── context/ # Global React context
├── public/ # Static assets
├── styles/ # Tailwind / global styles
├── Dockerfile # Docker build config
├── docker-compose.yml # Optional compose setup
└── README.md

🧹 Useful Commands

# Lint code

npm run lint

# Build for production

npm run build

# Run production build

npm start
