# Minnano: Rehauled E-Commerce Website for Plushies, Crafts, and Cute Trinkets

This project is a complete rehaul of a previous version of the "Minnano" e-commerce website, aimed at showcasing a wide variety of plushies, crafts, and cute trinkets. The goal of this rework is to not only improve the overall user experience and design but also to deeply understand the intricacies involved in building a robust and scalable web application.

The website serves as an online store where customers can explore and purchase high-quality, handcrafted plushies and various craft items, as well as unique trinkets designed to bring joy and creativity into their everyday lives.

## Key Features

- **Modern Frontend**: Built using **React.js**, with a clean and responsive design enhanced by **Tailwind CSS** or **Material UI**.
- **Backend Overhaul**: Utilizes **Node.js** with **Express**, allowing for a scalable and maintainable server-side architecture.
- **Database Upgrade**: **PostgreSQL** for improved data management and query efficiency.
- **Full-Stack Learning**: Aimed at providing hands-on experience in developing and deploying full-stack web applications.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS or Material UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Version Control**: Git, GitHub

## Installation Instructions

Follow these steps to get the project up and running locally on your machine.

### Prerequisites Before you start, ensure you have the following software installed:

- **Node.js** (for the backend and frontend) – Download Node.js (https://nodejs.org/)
- **npm (Node package manager)** – npm comes bundled with Node.js
- **PostgreSQL (for the database)** – Download PostgreSQL (https://www.postgresql.org/download/)

### 1. Clone the Repository

1. First, clone the repository to your local machine: git clone https://github.com/exze-alegre/minnano.git
2. Navigate to the project directory: cd minnano

### 2. Set Up the Frontend

1. Navigate to the minnano-frontend directory: cd minnano-frontend
2. Install the frontend dependencies: npm install
3. Run the frontend development server: npm start

This will start the React development server, and you should be able to view the frontend at http://localhost:3000.

### 3. Set Up the Backend

1. In a new terminal window, navigate to the minnano-backend directory: cd minnano-backend
2. Install the backend dependencies: npm install
3. Create a .env file in the minnano-backend directory to configure your environment variables. You will need to set up your database connection details, for example:

DB_HOST=localhost DB_USER=your-db-username DB_PASSWORD=your-db-password DB_NAME=minnano_db

4. Start the backend server: npm start

The backend server should now be running at [http://localhost:5000](http://localhost:5000).

### 4. Set Up the Database

Ensure that PostgreSQL is installed and running on your machine. If you haven't set up a database yet, you can follow these steps:

1. Open the PostgreSQL shell or a database management tool like **pgAdmin**.
2. Create a new database for the project:
3. CREATE DATABASE minnano_database;
4. Create tables based on your backend requirements (you may need to import or define your schema in your backend code).

### 5. Verify the Application

Once both the frontend and backend servers are running, open your browser and navigate to the frontend (http://localhost:3000) to ensure everything is connected and working.

If you encounter any issues or need further assistance, feel free to check the documentation or open an issue in the GitHub repository.
