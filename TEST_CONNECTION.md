# 🧪 Testing Your Connection - Quick Guide

## Step 1: Update `.env` File

First, make sure your `.env` file has the correct MongoDB connection string:

```
MONGO_URI=mongodb+srv://bloodbank_admin:YOUR_PASSWORD@cluster0.mongodb.net/blood-bank?retryWrites=true&w=majority
JWT_SECRET=your_secure_secret_key
PORT=5000
```

**Replace:**
- `YOUR_PASSWORD` with your actual MongoDB Atlas password
- Keep `JWT_SECRET` as is or create a new one

## Step 2: Check if Node Modules Are Installed

```bash
# In your project terminal
npm install
```

Wait for all packages to install.

## Step 3: Start the Server

```bash
npm start
```

You should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

If you see an error, check your `.env` file.

## Step 4: Test Connection

Open your browser and go to:
```
http://localhost:5000/test/connection
```

You should see:
```json
{
  "status": "connected",
  "connected": true,
  "message": "✅ MongoDB Connected!"
}
```

## Step 5: Use the Visual Test Page

Open this file in your browser:
```
http://localhost:5000/test-connection.html
```

Or use the file directly by double-clicking: `test-connection.html`

### Available Tests:

| Button | What It Does | Use When |
|--------|------------|----------|
| 🔗 Test Connection | Checks if MongoDB is connected | First test - verify connection |
| 📊 Get Stats | Shows database statistics | See how much data you have |
| 🩸 View Blood | Lists all blood units | Check blood inventory |
| 👥 View Users | Lists all registered users | Check who registered |
| ➕ Add Test Blood | Adds sample blood data | Test if data saves |
| 🗑️ Clear Data | Deletes everything | Clean up for fresh start |

## Step 6: Test User Registration

1. Go to `http://localhost:5000/test-connection.html` (or click "Test Connection" button)
2. Click **"🔗 Test Connection"** - verify it shows "connected"
3. Go to `Blood_Bank.html` → Click **Register**
4. Fill in the form with test data:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `Password123`
   - Phone: `9876543210`
5. Click **Register**
6. Go back to test page
7. Click **"👥 View Users"** 
8. You should see your new user! ✅

## Step 7: Test Login

1. Go to `Blood_Bank.html` → Click **Login**
2. Use the same email and password from registration
3. Click **Login**
4. Should show success message ✅

## Troubleshooting

### ❌ "MongoDB Not Connected"

**Solution 1: Check MongoDB Atlas**
- Go to https://mongodb.com/cloud/atlas
- Check if cluster is running (green status)
- Check Network Access → Your IP is whitelisted
- Try "Allow access from anywhere" if testing locally

**Solution 2: Check .env file**
- Make sure MONGO_URI doesn't have typos
- Password must match MongoDB Atlas password
- Make sure special characters are escaped (e.g., `@` → `%40`)

**Solution 3: Restart everything**
```bash
# Kill server (Ctrl+C in terminal)
# Then restart
npm start
```

### ❌ "Cannot GET /test-connection.html"

**Solution:**
- The test page is an HTML file, open it directly:
- Double-click: `test-connection.html`
- Or: `http://localhost:5000/test/connection` (API endpoint)

### ❌ "Connection Refused"

**Check:**
- [ ] Is server running? (`npm start`)
- [ ] Is it running on port 5000?
- [ ] Did you see "Server running on port 5000"?
- [ ] No other app using port 5000?

### ❌ "ENOTFOUND: getaddrinfo ENOTFOUND"

**This means:**
- MongoDB Atlas cluster name might be wrong
- Check your connection string again
- Copy directly from MongoDB Atlas

## All Test Endpoints

```
GET  /test/connection       - Check MongoDB connection
POST /test/add-blood        - Add test blood data
GET  /test/get-all-blood    - View all blood records
GET  /test/get-all-users    - View all users
GET  /test/db-stats         - Database statistics
POST /test/clear-data       - Delete all data
```

## Using Postman (Advanced)

If you have Postman installed:

1. Open Postman
2. Create requests:

**Test Connection:**
- Method: GET
- URL: `http://localhost:5000/test/connection`
- Click Send

**Add Test Blood:**
- Method: POST
- URL: `http://localhost:5000/test/add-blood`
- Click Send

**View All Blood:**
- Method: GET
- URL: `http://localhost:5000/test/get-all-blood`
- Click Send

## Success Checklist ✅

- [ ] MongoDB Atlas account created
- [ ] Cluster deployed (green status)
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string in `.env`
- [ ] `npm install` completed
- [ ] `npm start` shows "MongoDB connected"
- [ ] `/test/connection` returns "connected: true"
- [ ] User registration works
- [ ] New user appears in database

**If all checked, you're ready to go! 🚀**

## Next Steps

1. ✅ Connection tested
2. Create a dashboard page
3. Add blood donation feature
4. Deploy to production

---

**Need help? Check the console (F12) for error messages!**
