<div align="center">

<img src="https://img.shields.io/badge/NourishNet-Food%20Donation%20Platform-FF6B6B?style=for-the-badge&logo=leaf&logoColor=white" alt="NourishNet"/>

# 🍛 NourishNet
### *Connecting Surplus Food to People Who Need It Most*
</div>

---

## 🌍 The Problem We're Solving

Every day, **hotels, restaurants, and families** throw away tons of edible food — while millions go hungry just a few kilometers away. The gap isn't food availability. It's **connection, trust, and logistics**.

NourishNet bridges that gap with a transparent, AI-powered platform that connects food donors directly to verified NGOs, with real-time proof of impact.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered NGO Matching** | Google Gemini analyzes food type, quantity, expiry, and distance to recommend the best NGO |
| 📸 **Photo & Video Proof** | NGOs upload real distribution photos — donors see exactly where their food went |
| 🔴 **Live Transparency Feed** | Public real-time feed of every donation, filterable by donor type |
| 🎉 **Celebration Donations** | Donate food on birthdays, weddings, and festivals with personalized impact reports |
| 💬 **Role-Based AI Chatbot** | "Amina" — an AI assistant with context-aware responses for each user role |
| 📊 **Analytics Dashboard** | Real-time platform insights with an AI chatbot for data queries |
| 🏅 **Badges & Certificates** | Digital recognition for donors to share on social media |
| ✅ **NGO Verification System** | Multi-step verification before any NGO can receive donations |

---

## 🏗️ Project Structure

```
NourishNet/
│
├── index.html                  # Landing page (transparency feed, how it works)
├── role-selection.html         # Role picker (Hotel, NGO, Volunteer, Donor)
├── chatbot.html                # Standalone chatbot page
├── analytics-dashboard.html   # Analytics & reporting dashboard
│
├── login-hotel.html            # Hotel/Restaurant login
├── login-ngo.html              # NGO login
├── login-volunteer.html        # Volunteer login
├── login-donor.html            # Individual donor login
│
├── dashboard-hotel.html        # Post donations, track pickups, AI NGO matching
├── dashboard-ngo.html          # Manage incoming donations, upload proof
├── dashboard-volunteer.html    # View & accept delivery tasks
├── dashboard-donor.html        # Track impact, earn badges
│
├── css/
│   └── style.css               # Global styles
│
├── js/
│   ├── app.js                  # Core logic (feed, animations, interactions)
│   ├── chatbot.js              # Chatbot UI & conversation logic
│   └── analytics-chatbot.js   # Analytics chatbot integration
│
├── backend/
│   ├── server.js               # Node.js REST API (zero dependencies)
│   ├── ngos.json               # NGO seed data
│   ├── package.json
│   ├── .env.example            # Environment variable template
│   └── README.md               # Full API documentation
│
├── database/
│   ├── schema.sql              # Full MySQL schema
│   ├── sample-data.sql         # Seed data for testing
│   └── README.md               # Database documentation
│
└── images/
    └── README.md
```

## 👥 User Roles

| Role | What They Do |
|---|---|
| 🏨 **Hotel / Restaurant** | Post surplus food donations, get AI-matched to the best NGO |
| ❤️ **NGO / Charity** | Receive donations, upload distribution photos, build donor trust |
| 🚚 **Volunteer** | Accept pickup/delivery tasks, track routes, log completions |
| 🎁 **Individual Donor** | Donate on special occasions, track impact, earn badges |

---

## 🧠 How the AI Works

1. **Donor submits** food details (type, quantity, expiry time, preference)
2. **Gemini AI** scores every registered NGO against:
   - Urgency level vs. food expiry window
   - Distance optimization
   - Food preference compatibility (Veg / Non-Veg / Any)
   - NGO capacity vs. available quantity
3. **Returns** top match + ranked alternatives with reasoning
4. **Chatbot "Amina"** uses live platform data to answer role-specific questions in real time

---

## 🗄️ Database Schema Overview

The MySQL schema covers 15+ tables across 5 domains:

- **Auth**: `users` (hotel, ngo, volunteer, donor types)
- **Profiles**: `hotels`, `ngos`, `volunteers`, `donors`
- **Donations**: `donations`, `donor_donations`, `volunteer_tasks`
- **Transparency**: `distribution_media`, `feed_posts`, `feed_likes`, `feed_comments`
- **Gamification**: `badges`, `user_badges`, `notifications`

See [`database/README.md`](database/README.md) for full schema docs and sample queries.

---

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">

Made with ❤️ to end hunger, one meal at a time 🍛

**[⬆ Back to Top](#-nourishnet)**

</div>
