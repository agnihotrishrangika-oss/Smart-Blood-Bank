# 🎯 Complete System Usage Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- ✅ Node.js installed
- ✅ MongoDB Atlas account created
- ✅ `.env` file configured
- ✅ Server running (`npm start`)

### Step 1: Start the Application

```bash
npm start
```

You should see:
```
✅ Server running on port 5000
✅ MongoDB connected
```

### Step 2: Access Home Page

Open in browser:
```
http://localhost:5000/Blood_Bank.html
```

You'll see the blood bank homepage with red gradient theme and blood drop animation.

---

## 👤 User Registration & Login

### How to Register

1. **Click "Register" Button**
   - On Blood_Bank.html homepage

2. **Fill Registration Form**
   - **Full Name:** Only alphabets (e.g., "John Doe")
   - **Email:** Valid email (e.g., "john@gmail.com")
   - **Password:** Min 8 chars, letters + numbers (e.g., "Password123")
   - **Phone:** 10-digit Indian number starting with 6-9 (e.g., "9876543210")

3. **Click Register Button**
   - System validates all fields
   - Password is hashed and saved securely
   - Success message appears
   - Auto-redirected to Login page

### How to Login

1. **Click "Login" Button**
   - From Blood_Bank.html homepage

2. **Enter Credentials**
   - **Email:** Your registered email
   - **Password:** Your password

3. **Click Login Button**
   - System verifies email and password
   - JWT token generated and saved
   - Redirected to Dashboard

---

## 📊 Dashboard Overview

After login, you're on the dashboard with 5 tabs:

### Tab 1: Dashboard (Home)
Shows:
- **📊 Statistics**
  - Total Donations registered
  - Total Blood Requests made
  - Available Units (total ml in inventory)
  
- **🩸 Blood Inventory**
  - Cards showing each blood type
  - Quantity available in ml
  - Color-coded for quick reference

- **📈 Quick Stats**
  - Database statistics
  - Blood types breakdown

### Tab 2: Donate Blood
For blood donors to register donations.

### Tab 3: Request Blood
For hospitals/patients to request blood.

### Tab 4: Find Hospitals
Search for nearby hospitals by location.

### Tab 5: Profile
View personal info and history.

---

## 🩸 How to Donate Blood

### Step 1: Click "Donate Blood" Tab

### Step 2: Select Blood Type
- Click one of 8 blood type buttons
- Button turns red when selected
- Options: O+, O-, A+, A-, B+, B-, AB+, AB-

### Step 3: Enter Donation Details
- **Quantity (ml):** Enter volume (e.g., 450)
  - Standard donation is 450ml
  - Range: 100-1000 ml
  
- **Expiry Date:** Select date
  - Blood typically good for 42 days
  - Select a future date
  
- **Your Location (Optional):** Enter city
  - For tracking donation location
  - Optional field

### Step 4: Click "Register Donation"
- System validates all fields
- Data saved to MongoDB
- Success message appears
- Dashboard updates with new inventory

### Example
```
Blood Type: O+
Quantity: 450 ml
Expiry: 2026-03-16 (30 days from now)
Location: Delhi
```

---

## 🏥 How to Request Blood

### Step 1: Click "Request Blood" Tab

### Step 2: Select Blood Type
- Click the blood type button you need
- Selected button turns red

### Step 3: Enter Request Details

**Patient Information:**
- **Patient Name:** Name of patient needing blood
- **Quantity Needed:** Amount in ml

**Hospital Information:**
- **Hospital Name:** Medical facility name
- **Contact Number:** 10-digit phone number

**Location:**
- **Your Location (City):** Your city for matching

**Optional:**
- **Medical Condition/Note:** Brief description of why blood is needed

### Step 4: Click "Find & Request Blood"

System will:
1. Search available blood of requested type
2. Show matching blood units with:
   - Blood type
   - Available quantity
   - Expiry date
   - Donor information

3. If match found, "Confirm Request" button appears
4. Click to confirm
5. Request submitted to blood bank

### Example
```
Blood Type: O+
Quantity Needed: 450 ml
Patient Name: Ram Kumar
Hospital: City Medical Hospital
Contact: 9876543210
Location: Delhi
Note: Emergency surgery required
```

---

## 🏥 How to Find Hospitals

### Step 1: Click "Find Hospitals" Tab

### Step 2: Enter Your Location
- **Your Location:** City name (e.g., "Delhi", "Mumbai", "Bangalore")
- Click on location suggestion if provided

### Step 3: Click "Find Hospitals"

System displays:
- **Hospital Name** - Name of medical facility
- **Address** - Full address
- **Phone** - Contact number (clickable to call)
- **Distance** - Distance from your location
- **Hours** - Operating hours (24/7)
- **Blood Available** - Which blood types they stock

### Step 4: Contact Hospital
- Click phone number to call directly
- Or click "Contact Hospital" button
- Send inquiry about blood availability

### Map View
- Google Map shows your location (blue marker)
- Hospitals shown as red markers
- Click marker to see hospital details
- Zoom and pan to explore

---

## 👤 How to View Profile

### Step 1: Click "Profile" Tab

### Shows 3 Sections:

**Section 1: My Profile**
- Full Name (read-only)
- Email (read-only)
- Phone (read-only)
- Member Since (account creation date)

**Section 2: My Donation History**
- List of all blood donations made
- Blood type donated
- Quantity and date
- Expiry date

**Section 3: My Requests**
- List of all blood requests made
- Patient names and requirements
- Request status
- Hospital information

---

## 🔐 How to Logout

1. Click **"Logout"** button (top-right)
2. Confirms you want to logout
3. Clears session data
4. Redirects to home page (Blood_Bank.html)

---

## 📱 Blood Type Information

### Understanding Blood Types

| Type | Can Donate To | Can Receive From |
|------|---------------|-----------------|
| O+ | Everyone | O+, O- |
| O- | Everyone (Universal Donor) | O- only |
| A+ | A+, AB+ | A+, A-, O+, O- |
| A- | A+, A-, AB+, AB- | A-, O- |
| B+ | B+, AB+ | B+, B-, O+, O- |
| B- | B+, B-, AB+, AB- | B-, O- |
| AB+ | AB+ only | Everyone |
| AB- | AB+, AB- | AB-, A-, B-, O- |

### Blood Type % in India
- O+: 37% (most common)
- B+: 34%
- A+: 22%
- AB+: 5%
- Negative types: 2%

---

## 🔔 What Happens After You Request Blood

1. **Request Submitted**
   - Your request sent to blood bank
   - Confirmation message shown

2. **Blood Bank Reviews**
   - Staff checks availability
   - Verifies patient information
   - Confirms hospital details

3. **Match Found**
   - System matches available blood
   - Notification sent to you
   - Blood prepared for transfer

4. **Blood Transfer**
   - Donor location tracked
   - Blood transported to hospital
   - Hospital verifies receipt

5. **Completion**
   - Request marked as fulfilled
   - Tracking history updated

---

## 🩸 Blood Inventory Management

### How Blood is Tracked

Each blood unit has:
- **Blood Type:** O+, O-, A+, A-, B+, B-, AB+, AB-
- **Quantity:** ml of blood
- **Donor:** Who donated (anonymous option available)
- **Expiry Date:** When it must be used by
- **Status:** Available, Reserved, or Used

### Inventory Rules

✅ **Available** - Can be requested
⏸️ **Reserved** - Someone requesting, waiting for confirmation
❌ **Used** - Already transferred to patient

### Dashboard Shows
- Total ml by blood type
- Number of units
- Soonest expiry dates
- Geographic availability

---

## ⚠️ Important Notes

### Data Validation
✅ All fields validated before submission
✅ Email format checked
✅ Phone format checked (Indian numbers)
✅ Password strength verified
✅ Blood type limited to valid options

### Security
✅ Passwords encrypted (bcryptjs)
✅ Session tokens generated (JWT)
✅ HTTPS recommended for production
✅ Never share your password

### Privacy
✅ Donor names can be anonymous
✅ Medical information protected
✅ Contact info secure
✅ Data not shared with third parties

---

## 🆘 Troubleshooting

### "Page Not Found"
**Problem:** URL doesn't work
**Solution:** 
- Make sure server is running
- Check URL is correct
- Refresh page

### "Login Failed"
**Problem:** Cannot login
**Solution:**
- Check email spelling
- Verify password (case-sensitive)
- Ensure account registered
- Clear browser cache

### "Blood Not Saved"
**Problem:** Blood donation not appearing in inventory
**Solution:**
- Check MongoDB connection
- Verify all fields filled
- Check browser console (F12) for errors
- Refresh dashboard

### "Cannot Find Hospitals"
**Problem:** No hospitals showing
**Solution:**
- Enter valid city name
- Check internet connection
- Verify Google Maps API key (if using real API)
- Try different city

### "Page Shows Blank"
**Problem:** Dashboard not loading
**Solution:**
- Clear localStorage: Press F12 → Console → type `localStorage.clear()`
- Refresh page
- Login again
- Check server logs

---

## 📊 Typical Usage Scenarios

### Scenario 1: Emergency Blood Needed
```
Patient in hospital needs blood urgently
↓
Hospital staff logs in with hospital credentials
↓
Goes to "Request Blood" tab
↓
Selects blood type and quantity
↓
Enters patient and hospital info
↓
System searches available blood
↓
Match found!
↓
Blood transferred within hours
```

### Scenario 2: Regular Blood Donation
```
Donor wants to donate blood
↓
Logs in with personal credentials
↓
Goes to "Donate Blood" tab
↓
Selects blood type and quantity
↓
Sets expiry date (42 days from now)
↓
Submission successful
↓
Blood added to inventory
↓
Available for requests
```

### Scenario 3: Finding Hospital for Transfusion
```
Patient needs blood transfusion
↓
Family member uses app
↓
Goes to "Find Hospitals" tab
↓
Enters city name
↓
Sees nearby hospitals with blood availability
↓
Calls hospital to confirm
↓
Goes to hospital
↓
Hospital staff requests blood for patient
```

---

## 🎓 Learning the System

### For First-Time Users
1. Start with Registration & Login
2. View Dashboard to understand inventory
3. Browse Profile section
4. Try "Find Hospitals" feature
5. Read this guide as needed

### For Blood Donors
1. Register account
2. Log in to dashboard
3. Click "Donate Blood" tab
4. Fill donation form
5. Check profile for donation history

### For Hospitals/Patients
1. Register hospital account
2. Log in to dashboard
3. Click "Request Blood" tab
4. Search for available blood
5. Confirm request
6. Wait for blood bank confirmation

### For Administrators
1. View TEST_CONNECTION.md
2. Access test endpoints
3. View database stats
4. Manage inventory

---

## 🚀 Advanced Features (Coming Soon)

- [ ] Real-time notifications
- [ ] SMS alerts for requests
- [ ] Email confirmations
- [ ] Advanced analytics
- [ ] Multiple blood bank support
- [ ] Blood test results upload
- [ ] Donor health screening
- [ ] Compatibility checking
- [ ] Appointment scheduling
- [ ] Payment integration

---

## 📞 Support & Help

### Check These First
1. **TEST_CONNECTION.md** - Testing guide
2. **MONGODB_SETUP.md** - Database setup
3. **DEPLOYMENT.md** - Deployment guide
4. **GOOGLE_MAPS_SETUP.md** - Location features
5. **SYSTEM_ARCHITECTURE.md** - System overview

### View Logs
1. Terminal where `npm start` is running
2. Browser Console (F12)
3. Network tab (F12 → Network)

### Common Commands
```bash
# View server logs
npm start

# Test connection
npm start
# Then visit: http://localhost:5000/test/connection

# Clear database
Visit: http://localhost:5000/test/clear-data
```

---

**🎉 Your Smart Blood Bank System is Ready to Use!**

Start by registering an account and exploring the dashboard. For any issues, check the troubleshooting section or review the relevant guide document.

**Save Lives with Smart Blood Banking! 🩸❤️**
