# 📚 MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended) ✅

MongoDB Atlas is FREE, cloud-based, and requires no local installation.

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with Email or Google
4. Verify your email

### Step 2: Create a Project

1. After login, click **"Create"** (or create organization first)
2. Create a new project: `Blood-Bank`
3. Click **"Create Project"**

### Step 3: Create a Cluster

1. Click **"Create Deployment"**
2. Choose **"M0 Free"** (Always Free tier)
3. Select provider: **AWS** (or your preferred region)
4. Select region closest to you
5. Click **"Create Deployment"**

**Wait 2-3 minutes for cluster to deploy...**

### Step 4: Create Database User

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Enter:
   - **Username:** `bloodbank_admin`
   - **Password:** Create a strong password (save it!)
   - **Built-in Role:** `Atlas admin`
4. Click **"Add User"**

### Step 5: Whitelist IP Address

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (for development)
   - Or add your specific IP
4. Click **"Confirm"**

### Step 6: Get Connection String

1. Go back to **"Deployment"** or **"Databases"**
2. Click **"Connect"** on your cluster
3. Select **"Drivers"**
4. Choose **"Node.js"** and version **"4.1 or later"**
5. Copy the connection string

**Example:**
```
mongodb+srv://bloodbank_admin:PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority
```

### Step 7: Replace Password in Connection String

Replace `PASSWORD` with the password you created in Step 4:

```
mongodb+srv://bloodbank_admin:your_actual_password@cluster0.mongodb.net/blood-bank?retryWrites=true&w=majority
```

### Step 8: Update .env File

Edit `.env` in your project:

```
MONGO_URI=mongodb+srv://bloodbank_admin:your_actual_password@cluster0.mongodb.net/blood-bank?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_secret_key_here_min_32_chars
PORT=5000
```

### Step 9: Test Connection

```bash
npm start
```

You should see:
```
MongoDB connected
Server running on port 5000
```

✅ **Done! MongoDB is connected!**

---

## Option 2: MongoDB Local Installation (Alternative)

### Windows

**Step 1: Download**
- Go to https://www.mongodb.com/try/download/community
- Download Windows installer

**Step 2: Install**
- Run installer
- Choose **"Complete" setup**
- Choose **"Install as a Service"**
- Finish installation

**Step 3: MongoDB Compass (GUI Tool - Optional)**
- Download from same page
- Run it to view your databases

**Step 4: Update .env**
```
MONGO_URI=mongodb://localhost:27017/blood-bank
JWT_SECRET=your_secure_random_secret_key_here
PORT=5000
```

**Step 5: Start MongoDB**
```bash
# Already running as service on Windows
# Or manually start:
mongod
```

### macOS

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community
```

Update `.env`:
```
MONGO_URI=mongodb://localhost:27017/blood-bank
JWT_SECRET=your_secure_random_secret_key_here
PORT=5000
```

### Linux (Ubuntu)

```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

Update `.env`:
```
MONGO_URI=mongodb://localhost:27017/blood-bank
JWT_SECRET=your_secure_random_secret_key_here
PORT=5000
```

---

## Verify Connection

### Using MongoDB Compass (GUI)

1. Download from https://www.mongodb.com/products/compass
2. Paste your connection string
3. Connect
4. You should see your `blood-bank` database

### Using Node.js

```bash
# In your project terminal
npm start

# Check logs for:
# "MongoDB connected"
```

---

## Create Sample Data (Optional)

After connection, you can test with sample data:

```javascript
// Add this to server.js temporarily to test
const User = require('./models/User');
const Blood = require('./models/Blood');

// Test data insertion (run once then remove)
app.get('/test-data', async (req, res) => {
    try {
        // Add sample blood data
        const blood = new Blood({
            bloodType: 'O+',
            quantity: 100,
            unit: 'ml',
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'available'
        });
        await blood.save();
        res.json({ msg: 'Test data added', blood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

Visit: `http://localhost:5000/test-data`

---

## Check Database Collections

### In MongoDB Compass:
1. Connect to your database
2. Click database name `blood-bank`
3. You'll see collections: `users`, `bloods`

### In MongoDB Atlas Web:
1. Login to Atlas
2. Go to Databases
3. Click **"Browse Collections"**
4. View your data

---

## Database Operations

### View All Users
```javascript
// In Node.js console or API endpoint
const users = await User.find();
console.log(users);
```

### View All Blood Records
```javascript
const bloodRecords = await Blood.find();
console.log(bloodRecords);
```

### Delete Collection (for testing)
```javascript
await User.deleteMany({});  // Delete all users
await Blood.deleteMany({});  // Delete all blood records
```

---

## Troubleshooting

### "Connection refused"
- **Local MongoDB:** Make sure `mongod` is running
- **MongoDB Atlas:** Check IP whitelist in Network Access

### "Authentication failed"
- Verify username and password in connection string
- Make sure database user is created
- Check special characters are URL encoded

### "Cannot find module 'mongoose'"
```bash
npm install mongoose
```

### "MONGO_URI not found"
- Create `.env` file in project root
- Restart server after updating `.env`

### "Database already exists"
- MongoDB automatically creates database on first write
- Safe to proceed

---

## Security Notes

⚠️ **IMPORTANT:**

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong passwords** - Random 16+ characters
3. **Restrict IP** - In production, whitelist only your server IPs
4. **Enable encryption** - MongoDB Atlas uses TLS by default
5. **Change default credentials** - After testing

### Sample .gitignore
```
node_modules/
.env
.env.local
.DS_Store
*.log
.git
```

---

## MongoDB Atlas Free Tier Limits

✅ **What's included:**
- 512 MB storage
- Unlimited databases & collections
- 3 replicas for HA
- Free backups
- 1 GB data transfer/month
- Real-time monitoring

⚠️ **Limitations:**
- No VPC
- Basic support only
- 10 GB max backup storage

**Perfect for development and testing!**

---

## Next Steps

1. ✅ Set up MongoDB (Atlas or Local)
2. ✅ Update `.env` file
3. ✅ Test connection: `npm start`
4. ✅ Test registration/login
5. ✅ Check data in MongoDB Compass

---

## Quick Commands Reference

```bash
# Start your app
npm start

# Start with auto-reload (dev)
npm run dev

# View MongoDB logs
mongod --logpath /var/log/mongodb/mongod.log

# Connect to local MongoDB shell
mongosh

# Within MongoDB shell
use blood-bank
db.users.find()
db.bloods.find()
```

---

**MongoDB is now ready! 🎉**

Test by registering a user in your app and checking if it appears in MongoDB Compass!
