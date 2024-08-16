# Passport.js POC V2

Project Description:
This is a Proof of Concept (POC) project using Passport.js to manage multiple authentication strategies for various platforms such as eCW, AMD, Quest, Behavidance, and Onntop. The application allows user creation, login, logout, and access to a dashboard.

## System Requirements:
- Node.js (version 14 or higher)
- MongoDB (installed and running)
- NPM or Yarn

## Installation:
1. Clone the repository to your local machine:

   git clone https://github.com/Passport.js-V2.git

2. Install the dependencies:

   cd passport-js-poc
   npm install

3. Create a `.env` file in the project directory and configure the environment variables:

   DB_CONNECTION_STRING=mongodb://localhost:27017/OonTopPoc
   PORT=8080
   JWT_SECRET=your_jwt_secret_key

## Running the Application:
To run the server in development mode:

   npm run dev

The server will run at: http://localhost:8080

### Project Structure:
/src
  /config
    passport.ts         # Passport.js configuration and strategy setup
  /controllers
    authController.ts   # Authentication controller with functions for Login, Logout, Dashboard, and CreateUser
  /models
    User.ts             # Mongoose User model
  /routes
    authRoutes.ts       # Authentication routes definition
  index.ts                # Express application setup
 

## API Endpoints:

1. Create a New User
   - URL: /auth/register
   - Method: POST
   - Headers:
     - Content-Type: application/json
   - Body:
     {
       "email": "example@ecw.com",
       "password": "password123",
       "platform": "eCW",
       "clinic": "clinic1",
       "organizationId": "5f50c31f9e5b5c44d8b5b9b2"
     }

2. User Login
   - URL: /auth/login/:platform
   - Method: POST
   - Headers:
     - Content-Type: application/json
   - Body:
     {
       "email": "example@ecw.com",
       "password": "password123"
     }

3. User Logout
   - URL: /auth/logout
   - Method: GET

4. Access Dashboard
   - URL: /auth/dashboard
   - Method: GET
   - Headers:
     - Cookie: Ensure you send the Cookie received after login.

## Testing the API:
You can test the API using Postman or any other HTTP request tool.

Create a User:
1. Send a POST request to /auth/register with the required details.
2. Ensure the user is created successfully in the database.

User Login:
1. Send a POST request to /auth/login/:platform with the required details.
2. Ensure the user logs in successfully.

Access Dashboard:
1. Send a GET request to /auth/dashboard with the Cookie from the login.
2. Ensure the dashboard access is displayed correctly.

User Logout:
1. Send a GET request to /auth/logout.
2. Ensure the user is logged out successfully.

## Postman Documentation:
You can view detailed API documentation and examples via Postman Documenter:

https://documenter.getpostman.com/view/33710711/2sA3s7j9JF

## Additional Notes:
- Ensure MongoDB is running before starting the server.
- The passport.ts file includes authentication strategies for all supported platforms.

## Important Links:
- Passport.js Documentation: http://www.passportjs.org/
- Mongoose Documentation: https://mongoosejs.com/
- Express Documentation: https://expressjs.com/
