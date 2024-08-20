# Menu Management Backend

## Project Overview

This project is a Node.js backend server for managing a hierarchical menu system. The menu is structured into categories, subcategories, and items, each of which can be created, retrieved, updated, and deleted via RESTful API endpoints. This backend is designed to be flexible and scalable, making it suitable for applications that require dynamic menu management.

## Technologies Used

- **Node.js**:
- **Express.js**: 
- **MongoDB**: A NoSQL database chosen for its ability to handle hierarchical and flexible data structures efficiently.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

## Database Choice

I chose **MongoDB** because it's a NoSQL database that handles hierarchical and flexible data structures efficiently. MongoDB's document-based model makes it well-suited for managing categories, subcategories, and items, allowing for easy scalability and fast querying.

## How to Run the Project Locally

### Steps to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/menu-management-backend.git
   
2. **Install Dependencies**
    ```bash
   npm install
    
3. **Set Enviornment Variables**
    ```bash
   MONGODB_URI=
    
4. ** Start Server**
      ```bash
   node server.js
