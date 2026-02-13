# Test Drive Pro

Real-time test drive management platform built for **Magnetism Motors**.

Identity verification, digital agreements, live tracking, inventory aging alerts, and CRM integration.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Hosting:** Vercel
- **API Routes:** Vercel Serverless Functions
- **ID Verification:** RealID (ready to integrate)

## Deploy to Vercel

### 1. Push to GitHub

```bash
cd testdrivepro
git init
git add .
git commit -m "Initial commit - Test Drive Pro v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/testdrivepro.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import the `testdrivepro` repository
4. Framework will auto-detect as **Vite**
5. Click **Deploy**

### 3. Connect GoDaddy Domain

1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain (e.g. `testdrivepro.com`)
3. Vercel gives you DNS records. Go to GoDaddy:
   - **Option A (recommended):** Change nameservers to Vercel's
   - **Option B:** Add CNAME record: `@` → `cname.vercel-dns.com`
4. SSL is automatic

### 4. Add RealID Keys (after your call)

1. Vercel dashboard → **Settings** → **Environment Variables**
2. Add:
   - `REALID_API_KEY` = your secret key
   - `REALID_API_URL` = their API endpoint
3. Redeploy

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Demo Accounts

| Role        | Email                          | Password    |
|-------------|--------------------------------|-------------|
| Owner/Admin | bilal@magnetismmotors.com      | admin123    |
| Manager     | mike@magnetismmotors.com       | manager123  |
| Salesperson | shafay@magnetismmotors.com     | sales123    |

## Project Structure

```
testdrivepro/
├── api/
│   └── verify-id.js          # RealID serverless proxy
├── src/
│   ├── App.jsx                # Full application
│   └── main.jsx               # React entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .env.example
```

## Roadmap

- [ ] RealID integration (API route ready)
- [ ] Production database (Neon Postgres or Planetscale)
- [ ] ADF/XML CRM push to DriveCentric / CDK
- [ ] SMS notifications via Twilio
- [ ] Native mobile apps (React Native)
- [ ] Multi-dealership white-label
