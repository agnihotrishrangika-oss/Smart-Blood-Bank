# 🚀 Deployment Guide - Smart Blood Bank

## Option 1: Deploy on Heroku (Easiest for Beginners)

### Step 1: Prepare Your Project
```bash
# Install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-blood-bank-app
```

### Step 2: Set Up MongoDB Atlas (Cloud Database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Set environment variable:
```bash
heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
heroku config:set JWT_SECRET=your_secure_random_secret
```

### Step 3: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

---

## Option 2: Deploy on Vercel (Frontend Only)

### For Frontend (HTML files):
1. Go to https://vercel.com
2. Sign up with GitHub/GitLab
3. Import your repository
4. Deploy (automatic)

**Note:** You'll need to deploy backend separately on Heroku or another service.

---

## Option 3: Deploy on Render (Full Stack)

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/smart-blood-bank.git
git push -u origin main
```

### Step 2: Connect to Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in settings:
   - **Name:** smart-blood-bank
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

### Step 3: Set Environment Variables
Add in Render dashboard:
```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

### Step 4: Deploy
Click "Deploy" - Render will automatically build and deploy

---

## Option 4: Deploy on AWS (Most Scalable)

### Step 1: Set Up EC2 Instance
1. Go to AWS Console
2. Launch EC2 instance (Ubuntu 20.04)
3. Configure security groups (allow ports 80, 443, 5000)

### Step 2: Connect and Setup
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Clone your repository
git clone https://github.com/yourusername/smart-blood-bank.git
cd smart-blood-bank

# Install dependencies
npm install

# Start server
npm start
```

### Step 3: Use PM2 for Background Process
```bash
sudo npm install -g pm2
pm2 start server.js --name "blood-bank"
pm2 startup
pm2 save
```

---

## Option 5: Deploy on DigitalOcean (Affordable)

### Step 1: Create Droplet
1. Go to https://www.digitalocean.com
2. Create a new Droplet (Ubuntu 20.04)
3. Choose basic plan ($5-6/month)

### Step 2: Setup (Same as AWS above)
```bash
ssh root@your_droplet_ip

# Follow the same steps as AWS setup
```

### Step 3: Setup Nginx Reverse Proxy
```bash
sudo apt install nginx -y

# Edit nginx config
sudo nano /etc/nginx/sites-available/default
```

Replace with:
```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## Option 6: Docker + Any Cloud Provider

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Step 2: Create .dockerignore
```
node_modules
npm-debug.log
.git
.env
```

### Step 3: Build Docker Image
```bash
docker build -t blood-bank .
```

### Step 4: Push to Docker Hub
```bash
docker login
docker tag blood-bank yourusername/blood-bank:latest
docker push yourusername/blood-bank:latest
```

### Step 5: Deploy
Use any Docker-compatible platform:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## Recommended Path for Your Project

### For Quick Launch (Recommended):
1. **Backend:** Render.com (Free tier)
2. **Database:** MongoDB Atlas (Free tier)
3. **Frontend:** Vercel (Free tier)
4. **Domain:** Namecheap or GoDaddy ($1-3/year)

### Setup Steps:
1. Push code to GitHub
2. Connect Render to GitHub
3. Add MongoDB Atlas connection string
4. Deploy backend
5. Update API URLs in HTML files (change from `localhost:5000` to your Render URL)
6. Deploy frontend to Vercel

---

## Important Before Publishing

### 1. Update API URLs
In your HTML files, replace:
```javascript
// Change from:
'http://localhost:5000/api/auth/register'

// To your live server URL:
'https://your-app-name.onrender.com/api/auth/register'
```

### 2. Create Production .env
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_strong_random_secret_here
NODE_ENV=production
PORT=5000
```

### 3. Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS (most hosts provide this free)
- [ ] Enable CORS only for your domain
- [ ] Don't commit .env file (add to .gitignore)
- [ ] Set up HTTPS certificate

### 4. Add to .gitignore
```
node_modules/
.env
.env.local
.DS_Store
npm-debug.log
```

---

## Step-by-Step: Render Deployment (Easiest)

### 1. GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit - Blood Bank App"
git remote add origin https://github.com/yourusername/smart-blood-bank.git
git branch -M main
git push -u origin main
```

### 2. MongoDB Atlas Setup
- Create account at mongodb.com/cloud/atlas
- Create cluster (free tier)
- Get connection string
- Example: `mongodb+srv://user:password@cluster.mongodb.net/blood-bank`

### 3. Render Deployment
1. Go to render.com
2. Click "New Web Service"
3. Connect GitHub account
4. Select `smart-blood-bank` repo
5. Set Name: `smart-blood-bank`
6. Set Build Command: `npm install`
7. Set Start Command: `node server.js`
8. Click "Advanced" and add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = random 32-character string
9. Click "Deploy"

### 4. Update Frontend URLs
Edit `Registration.html`, `Login.html`:
```javascript
// Replace:
const response = await fetch('http://localhost:5000/api/auth/register'

// With:
const response = await fetch('https://your-app-name.onrender.com/api/auth/register'
```

### 5. Deploy Frontend to Vercel
1. Go to vercel.com
2. Import your GitHub repo
3. Click Deploy
4. Your HTML files will be live at vercel.app

---

## Access Your Live App

- **Frontend URL:** `https://smart-blood-bank.vercel.app`
- **Backend API URL:** `https://smart-blood-bank.onrender.com`
- **Database:** MongoDB Atlas cloud

---

## Cost Breakdown (Monthly)

- **Render:** $7 (paid tier) or Free with limitations
- **MongoDB Atlas:** Free (shared cluster)
- **Vercel:** Free
- **Domain:** $1-3/year

**Total: ~$7-10/month** for production-ready setup

---

## Troubleshooting

### "Cannot connect to database"
- Check MONGO_URI is correct
- Verify IP whitelist in MongoDB Atlas
- Check database name in connection string

### "CORS errors"
- Add your frontend domain to CORS settings in server.js
- Update CORS configuration

### "Blank pages in production"
- Check browser console for errors (F12)
- Verify API URLs are updated
- Check network tab for failed requests

---

## Need Help?

Check deployment logs:
- **Render:** Logs tab in dashboard
- **Vercel:** Deployments tab
- **MongoDB:** Connection logs

---

**Your app will be live and accessible from anywhere! 🎉**
