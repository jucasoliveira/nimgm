# Storage Management Application

The application has the chosen stack:

- `Vite` on the front end
- `Rust` on the back end
- `SqLite` as the database
- `Docker` to deploy the application

Reasoning on why I've chose this stack:

- **Vite for Fast and Modern Frontend**: Vite.js ensures a responsive, user-friendly interface with quick development cycles.
- **Rust for Efficient and Safe Backend**: Rust provides the performance and reliability needed for inventory management and sales processing.
- **SQLite for Simple and Portable Database**: SQLite offers a lightweight, zero-configuration database solution ideal for local use.
- **Docker for Consistent and Easy Deployment**: Docker ensures your application is easily deployable and consistent across all store locations.

### Immediate Priorities (3-4 hours):

1. **Basic CRUD Operations**:

   - **Deliveries**: Implement the backend API to accept deliveries and update inventory.
   - **Sales**: Implement the backend API to process sale of items and update inventory.
   - **Stock**: Implement the backend API to take stock and reconcile inventory.
   - **Database Setup**: Ensure SQLite database schema is set up with the necessary tables (deliveries, sales, stock).

1. **Frontend Basic Pages and Forms**:

   - **Deliveries Page**: Create a basic form to record new deliveries.
   - **Sales Page**: Create a basic form to process sales.
   - **Stock Page**: Create a basic form to take stock.
   - **Navigation**: Implement basic navigation between these pages.

1. **Backend Integration**:

   - **API Endpoints**: Create RESTful API endpoints for deliveries, sales, and stock.
   - **Database Integration**: Ensure that the backend is correctly interacting with the SQLite database.

### Future work

1. **Add menu integration**:

   - **Allow Menu Creation** : On that way, users will be able to add the items and quantities used on each

2. **Improved waste management**:
3.
