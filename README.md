# Storage Management Application

## Stack Overview

- **Frontend**: Vite
- **Backend**: Rust
- **Database**: SQLite
- **Deployment**: Docker

### Technology Choices

- **Vite for Fast and Modern Frontend**: Ensures a responsive, user-friendly interface with quick development cycles.
- **Rust for Efficient and Safe Backend**: Provides the performance and reliability needed for inventory management and sales processing.
- **SQLite for Simple and Portable Database**: A lightweight, zero-configuration database solution ideal for local use.
- **Docker for Consistent and Easy Deployment**: Ensures your application is easily deployable and consistent across all store locations.

## Immediate Priorities (3-4 hours)

1. **Basic CRUD Operations**:

Implementation: Rust is my daily driver for projects, making it a natural choice for the backend. It has a lib called Diesel which can integrate fairly easy with SQLite. I've used Actix-web , which is one of the fastest libraries for http requests on the market, allowing the back end to respond in a fast rate.

   - **Deliveries**: Implement backend API to accept deliveries and update inventory.
   - **Sales**: Implement backend API to process sales and update inventory.
   - **Stock**: Implement backend API to take stock and reconcile inventory.
   - **Database Setup**: Ensure SQLite database schema is set up with the necessary tables (deliveries, sales, stock).

2. **Frontend Basic Pages and Forms**:

Implementation: Utilized hooks for seamless backend requests and integrated Tailwind CSS and ShadCN for fast prototyping.

   - **Deliveries Page**: Create a basic form to record new deliveries.

https://github.com/jucasoliveira/nimgm/assets/11979969/fdf850a0-475f-4a14-9ca8-b50d4b2ca6b5
   - **Sales Page**: Create a basic form to process sales.

https://github.com/jucasoliveira/nimgm/assets/11979969/08fcfb28-7b76-4aae-b84f-93a84e352816


   - **Stock Page**: Create a basic form to take stock.

https://github.com/jucasoliveira/nimgm/assets/11979969/f27e76b2-a47c-4d1b-b701-6fe75c54a680


   - **Navigation**: Implement basic navigation between these pages.

3. **Backend Integration**:
   - **API Endpoints**: Create RESTful API endpoints for deliveries, sales, and stock.
   - **Database Integration**: Ensure that the backend interacts correctly with the SQLite database.

### The application doesn't have location selection for now.

## Future Work

1. **Menu Integration**:

   - Allow users to create menus and specify the items and quantities used per menu item.

2. **Improved Waste Management**:
   - Enhance waste management features to allow for better tracking and management of waste.

3. **Location-Specific Data Management**:

   - Since each location has its own menu and inventory needs, future iterations will focus on implementing a mechanism to restrict actions to the recipes and ingredients specific to each location. This ensures that the data is accurate and relevant to each store. Staff will only see and interact with data pertinent to their location, reducing confusion and potential errors.
   - As of right now this solution runs only locally, so it won't be needed to have a location selection.

## How to Run

### Using Docker

1. **Docker Compose**: Use Docker Compose to deploy the application.

   ```bash
   docker-compose up
   ```

2. **Docker Desktop**: Use Docker Desktop to deploy the application.
   ```bash
   docker compose up
   ```

### Running Locally

1. **Client**: Install dependencies and run the development server.

   ```bash
   npm install
   npm run dev
   ```

   Vite usually starts on port `5173`.

2. **Server**:
   ```bash
   cd server
   cargo run
   ```
