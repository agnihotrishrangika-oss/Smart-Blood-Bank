# 🗺️ Google Maps & Hospital Integration Guide

## 📍 Setting Up Google Maps API

### Step 1: Get Google Maps API Key

1. Go to https://console.cloud.google.com
2. Click **"Select a Project"** → **"New Project"**
3. Name it: `Smart Blood Bank`
4. Click **"Create"**
5. Wait for project to be created (2-3 minutes)

### Step 2: Enable Required APIs

1. Search for "Maps JavaScript API"
2. Click it and press **"Enable"**
3. Search for "Places API"
4. Click it and press **"Enable"**
5. Search for "Geocoding API"
6. Click it and press **"Enable"**

### Step 3: Create API Key

1. Go to **"Credentials"** in left menu
2. Click **"+ Create Credentials"**
3. Select **"API Key"**
4. Copy the key (save it!)

### Step 4: Restrict API Key (Security)

1. Click on your API key
2. Under "Application restrictions"
   - Select **"HTTP referrers"**
   - Add: `localhost:5000`
   - Add: `localhost:3000`
3. Under "API restrictions"
   - Select **"Restrict key"**
   - Add: Maps JavaScript API
   - Add: Places API
   - Add: Geocoding API
4. Click **"Save"**

### Step 5: Update dashboard.html

Find this line in `dashboard.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
```

Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_YOUR_ACTUAL_KEY_HERE&libraries=places,geometry"></script>
```

---

## 🏥 Implementing Real Hospital Search

### Option 1: Using Google Places API (Recommended)

Add this function to replace the mock hospitals:

```javascript
function findNearbyHospitals() {
    const location = document.getElementById('hospitalLocation').value;
    if (!location) {
        showMessage('Please enter your location', 'error');
        return;
    }

    // First, geocode the address to get coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
        if (status !== 'OK') {
            showMessage('Location not found', 'error');
            return;
        }

        const userLocation = results[0].geometry.location;
        
        // Search for hospitals nearby
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: userLocation,
            radius: 10000, // 10 km radius
            type: 'hospital'
        };

        service.nearbySearch(request, (results, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                showMessage('No hospitals found', 'error');
                return;
            }

            displayHospitals(results, userLocation);
        });
    });
}

function displayHospitals(hospitals, userLocation) {
    let html = '';
    
    hospitals.slice(0, 10).forEach((hospital, index) => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            userLocation,
            hospital.geometry.location
        ) / 1000; // Convert to km

        html += `
            <div class="hospital-card">
                <h3>${hospital.name}</h3>
                <div class="hospital-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${hospital.vicinity}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-road"></i>
                        ${distance.toFixed(1)} km away
                    </div>
                    <div class="info-item">
                        <i class="fas fa-star"></i>
                        Rating: ${hospital.rating || 'N/A'} ⭐
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;">
                            Get Contact Info
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('hospitalsList').innerHTML = html;
    showMessage('✅ Found ' + hospitals.length + ' hospitals', 'success');
}
```

### Option 2: Using Third-Party API

**NearbyHospitals.com API** (Free tier available)

```javascript
async function findNearbyHospitals() {
    const location = document.getElementById('hospitalLocation').value;
    
    try {
        const response = await fetch(
            `https://api.example.com/hospitals?city=${location}&radius=10`
        );
        const hospitals = await response.json();
        
        let html = '';
        hospitals.forEach(hospital => {
            html += `
                <div class="hospital-card">
                    <h3>${hospital.name}</h3>
                    <div class="hospital-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            ${hospital.address}
                        </div>
                        <div class="info-item">
                            <i class="fas fa-phone"></i>
                            <a href="tel:${hospital.phone}">${hospital.phone}</a>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-globe"></i>
                            <a href="${hospital.website}" target="_blank">${hospital.website}</a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('hospitalsList').innerHTML = html;
    } catch (error) {
        showMessage('Error finding hospitals: ' + error.message, 'error');
    }
}
```

### Option 3: Manual Database

Create a `hospitals.json` file:

```json
{
  "hospitals": [
    {
      "id": 1,
      "name": "City Medical Hospital",
      "location": "Delhi",
      "address": "123 Main St, Delhi",
      "phone": "+91-9876543210",
      "website": "www.citymedical.com",
      "bloodTypes": ["O+", "A+", "B+", "AB+"],
      "coordinates": {
        "lat": 28.7041,
        "lng": 77.1025
      }
    },
    {
      "id": 2,
      "name": "General Healthcare",
      "location": "Delhi",
      "address": "456 Park Rd, Delhi",
      "phone": "+91-9876543211",
      "website": "www.generalhealthcare.com",
      "bloodTypes": ["O-", "AB-", "AB+"],
      "coordinates": {
        "lat": 28.6139,
        "lng": 77.2090
      }
    }
  ]
}
```

Then load it:

```javascript
async function loadHospitals() {
    const response = await fetch('hospitals.json');
    const data = await response.json();
    return data.hospitals;
}

async function findNearbyHospitals() {
    const location = document.getElementById('hospitalLocation').value;
    const hospitals = await loadHospitals();
    
    // Filter hospitals by location
    const nearby = hospitals.filter(h => 
        h.location.toLowerCase().includes(location.toLowerCase())
    );
    
    displayHospitalsList(nearby);
}
```

---

## 🗺️ Display Map with Markers

Update the `initMap` function:

```javascript
function initMap() {
    // Default location (Delhi, India)
    const defaultLocation = { lat: 28.7041, lng: 77.1025 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: defaultLocation,
        styles: [
            {
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
}

function addMarkersToMap(hospitals, userLocation) {
    // Clear existing markers
    if (window.markers) {
        window.markers.forEach(marker => marker.setMap(null));
    }
    window.markers = [];

    // Add user location marker (blue)
    const userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    window.markers.push(userMarker);

    // Add hospital markers (red)
    hospitals.forEach((hospital, index) => {
        const marker = new google.maps.Marker({
            position: hospital.geometry.location,
            map: map,
            title: hospital.name,
            label: (index + 1).toString(),
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="font-size: 12px;">
                        <strong>${hospital.name}</strong><br>
                        ${hospital.vicinity}<br>
                        Rating: ${hospital.rating || 'N/A'} ⭐
                    </div>
                `
            });
            infoWindow.open(map, marker);
        });

        window.markers.push(marker);
    });

    // Fit map to show all markers
    const bounds = new google.maps.LatLngBounds();
    window.markers.forEach(marker => bounds.extend(marker.getPosition()));
    map.fitBounds(bounds);
}
```

---

## 📍 Add Location Auto-Complete

Add this to the HTML where location input is:

```html
<input 
    type="text" 
    id="hospitalLocation" 
    placeholder="Enter your city" 
    required
    autocomplete="off"
>
<div id="locationSuggestions"></div>
```

Add this JavaScript:

```javascript
const locationInput = document.getElementById('hospitalLocation');
const geocoder = new google.maps.Geocoder();

locationInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length < 2) return;

    geocoder.geocode({ address: query }, (results, status) => {
        if (status === 'OK') {
            const suggestions = results.slice(0, 5).map(result => result.formatted_address);
            displaySuggestions(suggestions);
        }
    });
});

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('locationSuggestions');
    suggestionsDiv.innerHTML = suggestions
        .map(s => `<div onclick="selectLocation('${s}')">${s}</div>`)
        .join('');
}

function selectLocation(location) {
    document.getElementById('hospitalLocation').value = location;
    document.getElementById('locationSuggestions').innerHTML = '';
}
```

---

## 🩸 Blood Availability at Hospitals

Create a backend endpoint to check blood at hospitals:

```javascript
// In routes/blood.js
router.get('/hospital/:hospitalId/available', async (req, res) => {
    try {
        const blood = await Blood.find({ 
            hospitalId: req.params.hospitalId,
            status: 'available'
        }).sort({ expiryDate: 1 });

        const summary = {};
        blood.forEach(b => {
            if (!summary[b.bloodType]) {
                summary[b.bloodType] = 0;
            }
            summary[b.bloodType] += b.quantity;
        });

        res.json({
            success: true,
            hospitalId: req.params.hospitalId,
            bloodAvailable: summary,
            total: blood.length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

---

## 🚨 Important: Billing Alerts

⚠️ **Google Maps API is FREE but has quotas:**

### Free Tier Limits:
- Maps: 28,000 free loads/month
- Places: 1,000 free requests/month
- Geocoding: 5,000 free requests/day

### To Enable Billing (After testing):
1. Set up billing account
2. Maps: $7 per 1000 loads (after free tier)
3. Places: $1.60 per 1000 requests (after free tier)

### Keep Costs Low:
- Cache results (don't re-query same location)
- Use session tokens for Places requests
- Implement rate limiting
- Show only top 5-10 results

---

## 🧪 Testing Google Maps

1. Update API key in `dashboard.html`
2. Restart server: `npm start`
3. Go to dashboard → Find Hospitals tab
4. Enter a city name (e.g., "Delhi")
5. Click "Find Hospitals"
6. Should show hospitals on map and list

### Troubleshooting

**Map not showing:**
- Check API key is valid
- Check browser console (F12)
- Verify APIs enabled in Google Cloud

**Hospitals not appearing:**
- Check internet connection
- Verify location name is correct
- Check API quota

**Blank map:**
- Clear browser cache
- Check API key restrictions

---

## 📱 Sample Hospitals Data (India)

Pre-load your database with hospital data:

```javascript
const hospitals = [
    // Delhi
    { name: 'Apollo Hospital', city: 'Delhi', phone: '+91-1140620000', lat: 28.5721, lng: 77.1878 },
    { name: 'Max Healthcare', city: 'Delhi', phone: '+91-1142572345', lat: 28.5355, lng: 77.2065 },
    { name: 'Fortis Hospital', city: 'Delhi', phone: '+91-1125626666', lat: 28.4282, lng: 77.2095 },
    
    // Mumbai
    { name: 'Breach Candy Hospital', city: 'Mumbai', phone: '+91-2230612123', lat: 19.0176, lng: 72.8298 },
    { name: 'Hinduja Hospital', city: 'Mumbai', phone: '+91-2250300300', lat: 19.0215, lng: 72.8297 },
    
    // Bangalore
    { name: 'Manipal Hospital', city: 'Bangalore', phone: '+91-8041440000', lat: 12.9716, lng: 77.5946 },
    { name: 'Apollo Bangalore', city: 'Bangalore', phone: '+91-8025550000', lat: 13.0827, lng: 77.6138 }
];
```

---

## 🎯 Next Steps

1. ✅ Get Google Maps API key
2. ✅ Update `dashboard.html` with your key
3. ✅ Test hospital search
4. ✅ Customize for your region
5. ✅ Add real hospital data
6. ✅ Deploy with billing enabled (if needed)

**Your location-based blood bank system is ready! 🚀**
