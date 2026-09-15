# 🩸 Smart Blood Bank - Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
npm start
```

Then open browser: `http://localhost:5000/Blood_Bank.html`

---

## 📍 Key URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:5000/Blood_Bank.html` |
| Dashboard | `http://localhost:5000/dashboard.html` |
| Test Connection | `http://localhost:5000/test-connection.html` |
| API Test | `http://localhost:5000/test/connection` |

---

## 👤 User Flow

```
Blood_Bank.html
    ↓
Register/Login
    ↓
dashboard.html
    ↓
Choose Action:
  • Donate Blood
  • Request Blood
  • Find Hospitals
  • View Profile
```

---

## 🩸 Blood Types

| 🔴 Rh+ Positive | 🔵 Rh- Negative |
|-----------------|-----------------|
| O+ | O- |
| A+ | A- |
| B+ | B- |
| AB+ | AB- |

---

## 📋 Registration Requirements

| Field | Format | Example |
|-------|--------|---------|
| Name | Letters only | John Doe |
| Email | Valid email | john@gmail.com |
| Password | 8+ chars, letters + numbers | Pass123 |
| Phone | 10-digit, starts 6-9 | 9876543210 |

---

## 🔐 Login Requirements

| Field | Format | Example |
|-------|--------|---------|
| Email | Must be registered | john@gmail.com |
| Password | Exact match | Pass123 |

---

## 💾 Environment Variables (.env)

```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/blood-bank
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 📊 Dashboard Tabs

| Tab | Icon | Function |
|-----|------|----------|
| Dashboard | 🏠 | View stats & inventory |
| Donate Blood | ❤️ | Register blood donation |
| Request Blood | 🤝 | Find & request blood |
| Find Hospitals | 🏥 | Search nearby hospitals |
| Profile | 👤 | View personal info |

---

## 🎯 Donation Form

```
Blood Type:  [Select from 8 types]
Quantity:    [Enter ml, e.g., 450]
Expiry Date: [Select date]
Location:    [Optional: Your city]
```

---

## 🎯 Request Form

```
Blood Type:     [Select from 8 types]
Quantity:       [Enter ml needed]
Patient Name:   [Full name]
Hospital:       [Hospital name]
Contact:        [10-digit phone]
Location:       [Your city]
Medical Note:   [Optional details]
```

---

## 🏥 Hospital Search

```
Location:    [Enter city]
Click:       Find Hospitals Button
See:         
  • Hospital names
  • Addresses
  • Phone numbers (clickable)
  • Distances
  • Available blood types
  • Operating hours
```

---

## 🧪 Testing Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/test/connection` | GET | Check MongoDB |
| `/test/add-blood` | POST | Add test data |
| `/test/get-all-blood` | GET | View all blood |
| `/test/get-all-users` | GET | View all users |
| `/test/db-stats` | GET | Database stats |
| `/test/clear-data` | POST | Delete all data |

---

## 🔗 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
```

### Blood
```
GET    /api/blood/available
GET    /api/blood/type/:bloodType
POST   /api/blood/donate
POST   /api/blood/request
GET    /api/blood/stats
```

---

## 🎨 Color Codes

| Element | Color | Hex |
|---------|-------|-----|
| Primary (Red) | Blood Red | #c62828 |
| Secondary (Blue) | Electric Blue | #667eea |
| Success | Green | #28a745 |
| Error | Red | #dc3545 |
| Background | Light Gray | #f5f7fa |

---

## ⚡ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Clear localStorage | F12 → Console → `localStorage.clear()` |
| View Errors | F12 → Console |
| Network Debug | F12 → Network |
| Refresh | Ctrl+R |
| Hard Refresh | Ctrl+Shift+R |

---

## 📁 Project Files

```
smart-blood-bank/
├── Blood_Bank.html          ← Home page
├── Login.html               ← Login page
├── Registration.html        ← Register page
├── dashboard.html           ← Main dashboard
├── server.js                ← Backend server
├── package.json             ← Dependencies
├── .env                     ← Configuration
├── models/
│   ├── User.js
│   └── Blood.js
├── routes/
│   ├── auth.js
│   └── blood.js
└── docs/
    ├── README.md
    ├── MONGODB_SETUP.md
    ├── TEST_CONNECTION.md
    ├── DEPLOYMENT.md
    ├── GOOGLE_MAPS_SETUP.md
    ├── SYSTEM_ARCHITECTURE.md
    ├── COMPLETE_USER_GUIDE.md
    └── QUICK_REFERENCE.md
```

---

## 🐛 Quick Fixes

### Issue: Cannot Connect to MongoDB
```bash
# Check if connection string is correct
# Update .env file
# Restart server: npm start
```

### Issue: "npm is disabled"
```bash
# In PowerShell:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Issue: Page shows blank
```bash
# In browser console (F12):
localStorage.clear()
location.reload()
```

### Issue: Cannot find hospitals
```bash
# Use valid city name
# Check internet connection
# Verify Google Maps API key
```

---

## 📊 Database Commands

```javascript
// View all users
db.users.find()

// View all blood
db.bloods.find()

// Count blood by type
db.bloods.aggregate([
  { $group: { _id: '$bloodType', total: { $sum: '$quantity' } } }
])

// Delete all data
db.users.deleteMany({})
db.bloods.deleteMany({})
```

---

## 💡 Pro Tips

✅ Use the test page to verify connections
✅ Test registration/login before deployment
✅ Add real hospital data before going live
✅ Enable Google Maps for location features
✅ Keep .env file secure (never commit to Git)
✅ Monitor MongoDB usage to avoid exceeding free tier

---

## 📱 Mobile Access

Currently designed for desktop. For mobile:
1. Responsive layout implemented
2. Works on tablet & large phones
3. Touch-friendly buttons
4. Mobile map view supported

---

## 🚀 Deployment Checklist

- [ ] Update `.env` with production MongoDB URI
- [ ] Generate strong JWT_SECRET
- [ ] Update API URLs in HTML files
- [ ] Get Google Maps API key
- [ ] Configure CORS for production domain
- [ ] Test all features
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Backup database
- [ ] Document emergency procedures

---

## 📞 Emergency Contacts (Template)

```
Blood Bank Admin: +91-XXXXXXXXXX
Emergency Line: +91-XXXXXXXXXX
Hospital Support: +91-XXXXXXXXXX
```

---

## 📈 Monitoring

Check these regularly:
- MongoDB connection status
- API response times
- Error logs
- User registrations
- Blood inventory levels
- Request fulfillment rate

---

## 🎓 Learning Resources

- MongoDB Docs: https://docs.mongodb.com
- Express Guide: https://expressjs.com
- Google Maps API: https://developers.google.com/maps
- REST API Design: https://restfulapi.net
- JWT Guide: https://jwt.io

---

## 🔗 Quick Links

- **MongoDB Atlas**: https://mongodb.com/cloud/atlas
- **Google Cloud Console**: https://console.cloud.google.com
- **GitHub**: https://github.com
- **Render Hosting**: https://render.com
- **Vercel Hosting**: https://vercel.com

---

## ✅ Last Checklist

Before going live:

- [ ] Server running successfully
- [ ] MongoDB connected
- [ ] All files created
- [ ] Test connection working
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Donations can be registered
- [ ] Requests can be made
- [ ] Hospitals can be found

---

**🎉 System Ready for Use! 🩸**

For detailed information, refer to the complete guides in the documentation folder.
