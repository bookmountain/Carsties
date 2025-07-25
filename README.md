# 🧩 Auction Microservices App (Built with .NET 8, Next.js 14, NextAuth v8)

This project is built by following a hands-on Udemy course focused on modern fullstack development with **.NET 8**, **Next.js 14**, and **Microservices architecture**.

The app simulates an **Auction platform** with multiple backend services, a modern frontend, and infrastructure management using Docker and Kubernetes.

---

## 🛠 Tech Stack

### Backend
- **.NET 8** (Minimal APIs)
- **RabbitMQ** – Service-to-service communication (Message Bus)
- **gRPC** – Inter-service communication
- **IdentityServer** – Authentication & Authorization
- **SignalR** – Real-time updates
- **YARP Gateway** – API Gateway

### Frontend
- **Next.js 14** – App Router architecture
- **NextAuth v8** – Authentication integration with IdentityServer

### Infrastructure
- **Docker / Docker Compose**

---

## 📦 Features

- Microservice architecture with multiple decoupled services
- Dockerized services with compose support
- Authentication & authorization with IdentityServer + NextAuth
- SignalR integration for real-time client notifications
- Full CI/CD pipeline using GitHub Actions
- Optional Kubernetes deployment (local or cloud)
- Practical domain: **Auction Platform**

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/)
- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/) *(or any editor)*
- Kubernetes (optional for appendix)

### Run with Docker Compose
```bash
docker-compose up --build
