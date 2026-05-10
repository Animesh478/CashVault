# Expense Tracker – Full Stack Web Application

A production-style expense tracking application built to simulate real-world backend systems with authentication, authorization, payments, cloud storage, AI integration, and scalable APIs.

This project goes beyond basic CRUD and focuses on security, scalability, cloud deployment, and business logic.

## Features

### Authentication & Authorization

- Secure user authentication
- Role-based access control
- Premium vs non-premium user flows

### Premium Membership

- Payment gateway integration
- Unlocks premium-only features after successful payment

### Expense Management

- Add, edit, delete expenses
- Pagination for efficient handling of large datasets
- Optimized database queries using Sequelize ORM

### Reports & File Handling

- Generate expense reports
- Reports are uploaded and stored in AWS S3
- Users can download their past reports anytime

### AI Integration

- Integrated Gemini AI to automatically categorize expenses
- Demonstrates real-world AI usage inside business logic

### Leaderboard

- Displays user rankings based on expenses
- Visible to premium users

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- RESTful APIs
- Sequelize ORM

### Database

- MySQL
- AWS RDS

### Cloud & Deployment

- AWS EC2 (Application deployment)
- AWS S3 (Report storage)

## Architecture Overview

REST-based client–server architecture
Secure API endpoints with middleware validation
Separation of concerns (routes, controllers, services)
Cloud-native setup with persistent storage and scalable compute

## What I Learned

- Designing scalable backend systems
- Implementing secure authentication & authorization
- Handling payments and premium feature access
- Using AWS services (EC2, RDS, S3) in a real deployment
- Optimizing APIs with pagination and indexing
- Integrating AI into real business workflows
- Writing maintainable, production-style backend code

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Animesh478/CashVault.git

### 2. Install Dependencies

npm install

### 3. Configure Environment Variables

Create a .env file and add the environment variables to it

### 4. Run the application

npm run dev
