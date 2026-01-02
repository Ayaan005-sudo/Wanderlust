# Wanderlust – Airbnb Clone

## Description
Wanderlust is a full-stack Airbnb-like web application where users can explore places, create their own listings, and share reviews and ratings. The project demonstrates real-world CRUD functionality, secure authentication and authorization, database relationships, and map integration.

The application is fully deployed and built using the MVC architecture.

## Live Demo
Deployed Link:[(https://wanderlust-ldc7.onrender.com)](https://wanderlust-ldc7.onrender.com)

## Tech Stack
Frontend: EJS, HTML, CSS, Bootstrap, JavaScript  
Backend: Node.js, Express.js  
Database: MongoDB (Mongoose)  
Authentication: Passport.js, Sessions, Cookies  
Maps & Geocoding: Leaflet.js  
Architecture: MVC Pattern

## Features

### Authentication & Authorization
- User signup and login using Passport.js  
- Session and cookie-based authentication  
- Only authorized users can modify their own data

### Listings Management
- Users can create their own listings  
- Listing owners can edit and delete their listings  
- Other users cannot edit or delete someone else’s listing

### Reviews & Ratings
- Logged-in users can add reviews and ratings  
- Review authors can delete their own reviews only

### Map Integration
- Each listing displays its location on an interactive map  
- Helps users easily identify where the place is located

### Search & Filter
- Search listings based on country  
- Filter listings based on category

### Database Relationships
- User ↔ Listings relationship  
- Listings ↔ Reviews relationship  
- Implemented using Mongoose for data consistency

## Key Learnings
- Implementing CRUD operations in a real-world project  
- Authentication and authorization using Passport.js  
- MongoDB relationships with Mongoose  
- MVC architecture in Express applications  
- Map integration using Leaflet

## Future Improvements
- Image upload using Cloudinary  
- Advanced search filters  
- Booking functionality  
- UI/UX improvements

## How to Run Locally

1. Clone the repository  
   git clone your-repository-link

2. Install dependencies  
   npm install

3. Add environment variables (MongoDB URI, session secret)

4. Start the server  
   npm start

5. Open in browser  
   http://localhost:3000





