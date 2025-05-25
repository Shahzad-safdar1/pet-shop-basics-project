
# Pet Shop Backend API

This is a Node.js/Express backend API for the Pet Shop Management System.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup:**
   - Make sure XAMPP is running (Apache + MySQL)
   - Create database and table using the SQL queries provided earlier

3. **Environment Configuration:**
   - Update `.env` file with your database credentials if needed
   - Default settings work with XAMPP default configuration

4. **Run the Server:**
   ```bash
   # Development mode (auto-restart on changes)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- **GET** `/api/pets` - Get all pets
- **GET** `/api/pets/:id` - Get single pet by ID
- **POST** `/api/pets` - Add new pet
- **PUT** `/api/pets/:id` - Update pet
- **DELETE** `/api/pets/:id` - Delete pet
- **GET** `/api/health` - Health check

## Example API Usage

### Add Pet (POST /api/pets)
```json
{
  "name": "Buddy",
  "color": "Golden",
  "category": "Dog",
  "quantity": 1,
  "age": 3,
  "gender": "Male",
  "weight": 25.5,
  "price": 500
}
```

The server will run on `http://localhost:3001`
