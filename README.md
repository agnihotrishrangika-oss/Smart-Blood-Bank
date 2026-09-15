# 🩸 Smart Blood Bank Management System

A full-stack blood bank management system with registration, login, and blood inventory management.

## 📋 Features

- **User Registration**: Donors and hospitals can register with validation
- **User Login**: Secure authentication with JWT tokens
- **Blood Inventory**: Track available blood units by blood type
- **Blood Donation**: Record blood donations from donors
- **Blood Request**: Hospitals/patients can request blood units
- **Inventory Statistics**: View blood bank statistics by blood type

## 🏗️ Project Structure

```
smart-blood-bank/
├── models/
│   ├── User.js          # User schema (donors, hospitals, patients)
│   └── Blood.js         # Blood inventory schema
├── routes/
│   ├── auth.js          # Authentication routes (register, login)
│   └── blood.js         # Blood management routes
├── Blood_Bank.html      # Home page
├── Login.html           # Login page
├── Registration.html    # Registration page
├── server.js            # Express server setup
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Edit `.env` file:
```
MONGO_URI=mongodb://localhost:27017/blood-bank
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 4. Start the Server
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

**Register**
```
POST /api/auth/register
Body: { fullName, email, password, phone }
Response: { token, user }
```

**Login**
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Blood Management Routes (`/api/blood`)

**Get Available Blood**
```
GET /api/blood/available
Response: [{ bloodType, quantity, donorId, ... }]
```

**Get Blood by Type**
```
GET /api/blood/type/:bloodType
Response: [{ bloodType, quantity, donorId, ... }]
```

**Donate Blood** (Record donation)
```
POST /api/blood/donate
Body: { donorId, bloodType, quantity, expiryDate }
Response: { msg, blood }
```

**Request Blood** (For hospitals/patients)
```
POST /api/blood/request
Body: { hospitalId, bloodType, quantity }
Response: { msg, blood, donatedBy }
```

**Get Statistics**
```
GET /api/blood/stats
Response: [{ _id: bloodType, totalQuantity, units }]
```

## 🔐 Security Features

- **Password Hashing**: Bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication
- **Input Validation**: Frontend and backend validation
- **CORS**: Cross-Origin Resource Sharing enabled

## 💾 Database Schema

### User
- fullName (String, required)
- email (String, required, unique)
- password (String, hashed, required)
- phone (String, required)
- timestamps

### Blood
- bloodType (String, enum: O+, O-, A+, A-, B+, B-, AB+, AB-)
- quantity (Number, default: 0)
- unit (String, ml or units)
- expiryDate (Date, required)
- donorId (Reference to User)
- hospitalId (Reference to User)
- status (available, reserved, used)
- timestamps

## 📝 Notes

- Passwords must be at least 8 characters with letters and numbers
- Phone numbers must be valid Indian numbers (10 digits starting with 6-9)
- Email validation follows standard email format
- All dates are stored in ISO format
- JWT tokens expire after 7 days for login

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, Bcryptjs
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **API Testing**: Can use Postman or similar tools

## 📦 Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT token generation
- cors: Cross-origin support
- body-parser: Request body parsing
- dotenv: Environment variable management

## 🚦 Next Steps

1. Set up MongoDB locally or use MongoDB Atlas
2. Create an `.env` file with your credentials
3. Run `npm install`
4. Start the server with `npm start`
5. Open `Blood_Bank.html` in your browser
6. Test registration and login flows

## 📧 Support

For issues or questions, please check the console for error messages.

---

**Made with ❤️ for Blood Bank Management**
