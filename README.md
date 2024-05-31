# Dynamic Form Builder 

## Overview 

This project is a dynamic form builder application designed to facilitate communication and collaboration among university students for forming study groups. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the application offers a platform for creating, editing, and publishing forms.

## Features 
- Drag-and-Drop Interface: Intuitive drag-and-drop interface for seamless form creation and editing.
- RESTful APIs: Utilized RESTful APIs to manage user data and form interactions, tested rigorously with Postman.
- Material-UI: Incorporated Material-UI for a visually appealing, responsive user interface, ensuring a consistent appearance across devices
- Authentication & Security: Implemented authentication and security using JSON Web Tokens (JWT) to ensure secure access and data integrity.
- Comprehensive Functionalities: Includes user login, form creation, form editing, form preview, form saving, form publishing, response submission, and response viewing.

## Future Enhancements

- Study Group and Session Models: Plan to design and integrate study group and study session models to replace current hardcoded elements, improving scalability and functionality.
- Deployment: Plan to deploy the app on Vercel, enabling anyone from all over the world to access the project

## Technologies Used
- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- API Testing: Postman

## Installaion and Setup

### Backend Setup
1. Clone the repository
     ```bash
   git clone https://github.com/shubhiupa19/studysync.git
2. Install dependencies
   ```bash
   npm install
3. Create a new .env file in root directory with MongoDB URI and JWT Secret
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
4. Start the backend server
   ```bash
   npm run dev

### Frontend Setup
1. Navigate to frontend directory
   ```bash
   cd/frontend
2. Install dependencies
   ```bash
   npm install
3. Start the frontend development server
   ```bash
   npm start



Sure, here's the same content in markdown format:

markdown
Copy code
# Dynamic Form Builder Application

## Overview

This project is a dynamic form builder application designed to facilitate communication and collaboration among university students for forming study groups. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the application offers a robust platform for creating, editing, and publishing forms.

## Features

- **Drag-and-Drop Interface**: Intuitive drag-and-drop interface for seamless form creation and editing.
- **RESTful APIs**: Engineered RESTful APIs to manage user data and form interactions, tested rigorously with Postman.
- **Material-UI**: Incorporated Material-UI for a sleek, responsive user interface, ensuring a consistent look and feel across different devices.
- **Authentication & Security**: Implemented authentication and security using JSON Web Tokens (JWT) to ensure secure access and data integrity.
- **Comprehensive Functionalities**: Includes user login, form creation, form editing, form preview, form saving, form publishing, response submission, and response viewing.

## Future Enhancements

- **Study Group and Session Models**: Plan to design and integrate study group and study session models to replace current hardcoded elements, improving scalability and functionality.

## Technologies Used

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API Testing**: Postman

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-form-builder.git
   cd dynamic-form-builder/backend
Install dependencies:

bash
Copy code
npm install
Create a .env file and add your MongoDB URI and JWT secret:

plaintext
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Start the backend server:

bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend development server:


## Usage
Access the application at http://localhost:3001/.
Use the form builder interface to create and edit forms.
Publish forms and view responses.
