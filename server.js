const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blood', require('./routes/blood'));
app.use('/api/chatbot', require('./routes/chatbot'));

// ====== TEST ENDPOINTS ======

// Test 1: Check MongoDB Connection
app.get('/test/connection', (req, res) => {
    const mongoStatus = mongoose.connection.readyState;
    const statusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    
    res.json({
        status: statusMap[mongoStatus],
        connected: mongoStatus === 1,
        message: mongoStatus === 1 ? '✅ MongoDB Connected!' : '❌ MongoDB Not Connected'
    });
});

// Test 2: Add Test Data
const User = require('./models/User');
const Blood = require('./models/Blood');

app.post('/test/add-blood', async (req, res) => {
    try {
        const testBlood = new Blood({
            bloodType: 'O+',
            quantity: 500,
            unit: 'ml',
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'available'
        });
        
        await testBlood.save();
        res.json({
            success: true,
            message: '✅ Test blood data added!',
            data: testBlood
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Error adding test data',
            error: err.message
        });
    }
});

// Test 3: Get All Blood Records
app.get('/test/get-all-blood', async (req, res) => {
    try {
        const allBlood = await Blood.find();
        res.json({
            success: true,
            count: allBlood.length,
            message: allBlood.length > 0 ? '✅ Blood records found!' : '⚠️ No blood records',
            data: allBlood
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Error fetching blood records',
            error: err.message
        });
    }
});

// Test 4: Get All Users
app.get('/test/get-all-users', async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        res.json({
            success: true,
            count: allUsers.length,
            message: allUsers.length > 0 ? '✅ Users found!' : '⚠️ No users',
            data: allUsers
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Error fetching users',
            error: err.message
        });
    }
});

// Test 5: Database Stats
app.get('/test/db-stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const bloodCount = await Blood.countDocuments();
        const bloodStats = await Blood.aggregate([
            { $group: {
                _id: '$bloodType',
                total: { $sum: '$quantity' }
            }}
        ]);
        
        res.json({
            success: true,
            stats: {
                totalUsers: userCount,
                totalBloodUnits: bloodCount,
                bloodByType: bloodStats
            },
            message: '✅ Database statistics retrieved'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Error getting stats',
            error: err.message
        });
    }
});

// Test 6: Clear Test Data
app.post('/test/clear-data', async (req, res) => {
    try {
        await User.deleteMany({});
        await Blood.deleteMany({});
        res.json({
            success: true,
            message: '✅ All data cleared successfully!'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '❌ Error clearing data',
            error: err.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
