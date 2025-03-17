# Restaurant App Back End

## Project Summary

This project creates the back end for a restaurant app, built using Node.js, Express.js and PSQL. It provides API endpoints for managing menu categories, products, orders and more. 

## Features 
- **RESTful API:** Provides endpoints for menu items, orders, etc. 
- **Authentication:** Uses JWT-based authentication for secure access.
- **Database Integration:** Supports PSQL. 
- **Order Management:** Handles user orders and Stripe payments. 
- **Middleware:** Includes error handling and validation.


## Set-Up Instructions 
### Prerequisites
Ensure you have the following installed: 
- Node.js (>= 21.0.0 recommended)
- npm or yarn
- PostgreSQL (>= 14.11 recommended)

### Clone the Repository
```
git clone https://github.com/Billy-Dentith/restaurant-app-be.git
```

### Install the Dependencies 
```
npm install (or yarn install)
```

### Environment Variables
```
PORT=5000
PGDATABASE=
```

### Initialise and Seed the Databases 
```
npm run setup-dbs
npm run seed
```

### Run the Development Server
```
npm run start (or yarn start)
```

The backend server will run at http://localhost:5000.


## API Endpoints

| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| GET    | /api/categories     | Fetch all menu categories |
| GET    | /api/products       | Fetch all menu items |
| POST   | /api/products       | Add a new menu item (Admin) |
| GET    | /api/products/:id   | Fetch a menu item |
| PATCH  | /api/products/:id   | Edit a menu item (Admin) |
| GET    | /api/orders         | Fetch orders |
| POST   | /api/orders         | Create a new order |
| PATCH  | /api/orders/:id     | Edit an order (Admin) |
