# Leaderboard System Frontend

## Overview
This project implements a frontend for a leaderboard system using React.js. Users can register, log in, and interact with a dynamic leaderboard that updates based on points awarded to them.

## Technologies Used
- **React.js**: Frontend library for building user interfaces.
- ** CSS**: Utility-first CSS framework for styling.
- **Context API**: For state management and user authentication.

## Routes & Webpage Dynamics
1. **Registration Page**
   - **Route**: `/register`
   - **Functionality**: Users can create a new account by entering their name, email, and password. The form data is submitted to the backend for user registration.
   
2. **Login Page**
   - **Route**: `/login`
   - **Functionality**: Users can log in by providing their email and password. Successful authentication saves user data in `localStorage` and redirects to the leaderboard.

3. **Leaderboard Page**
   - **Route**: `/leaderboard`
   - **Functionality**: Displays a sorted list of users based on total points. A modal appears upon clicking a user’s name, showing their points history.

4. **Home Page**
   - **Route**: `/`
   - **Functionality**: Shows a list of 10 friends with corresponding points. Users can increase points for friends via an API call.

## Authentication
- Utilizes the Context API to manage user authentication state across the application.
- Displays logged-in user details (name, email, points) in the navbar with a user icon for profile access.

## API Integration
- Interacts with the following backend APIs:
  - **Update Points**: `PATCH http://localhost:7000/api/user/v1/claim-points`
  - **Get User History**: `POST http://localhost:7000/api/user/v1/your-history`
  - **Get Users for Leaderboard**: `GET http://localhost:7000/api/user/v1/get-users`
  - **Get Logged-in User Info**: `GET http://localhost:7000/api/user/v1/get-users-info-id`

## Setting Up the Environment
1. Clone the backend repository:
   ```bash
   git clone https://github.com/Biranjay-kumar/leaderboard.git
