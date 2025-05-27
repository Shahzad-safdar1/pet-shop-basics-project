
# Pet Shop Project Setup and Run Instructions

## Prerequisites
1. **XAMPP** - Make sure it's installed and running
2. **Node.js** - Make sure it's installed on your system

## Step-by-Step Setup

### 1. Start XAMPP
- Open XAMPP Control Panel
- Start **Apache** and **MySQL** services
- Make sure both services are running (green status)

### 2. Setup Database (Automatic)
The database and table will be created automatically when you start the backend server. Sample data will also be inserted if the table is empty.

### 3. Start Backend Server
Open terminal in VS Code and run:
```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm run dev
```

The backend will run on **http://localhost:3001**

### 4. Start Frontend Server
Open a NEW terminal window in VS Code and run:
```bash
# Make sure you're in the root project folder (not backend)
# Install dependencies (first time only)
npm install

# Start the frontend server
npm run dev
```

The frontend will run on **http://localhost:8080**

## Testing the Application

1. Open your browser and go to **http://localhost:8080**
2. You should see the Pet Online Shop with sample data
3. Try adding a new pet - it should save to the MySQL database
4. Try editing/deleting pets - changes should persist in the database
5. Refresh the page - data should remain because it's stored in MySQL

## Troubleshooting

### If you get database connection errors:
1. Make sure XAMPP MySQL is running
2. Check that the database credentials in `backend/.env` match your XAMPP setup
3. Default XAMPP credentials are usually:
   - Host: localhost
   - User: root
   - Password: (empty)

### If you get CORS errors:
- Make sure both frontend and backend servers are running
- Frontend should be on port 8080, backend on port 3001

### If data doesn't persist:
- Check the backend terminal for any database errors
- Make sure the pets table was created in the `pet_shop` database
- Check phpMyAdmin to verify the database structure

## Default Database Setup
The application will automatically:
- Create `pet_shop` database
- Create `pets` table with proper structure
- Insert 3 sample pets if table is empty
- Handle all CRUD operations with the MySQL database

Now your Pet Shop application is fully connected to MySQL database!
