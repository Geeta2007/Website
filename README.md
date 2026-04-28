<div align="center">

<img src="https://img.shields.io/badge/NourishNet-Food%20Donation%20Platform-FF6B6B?style=for-the-badge&logo=leaf&logoColor=white" alt="NourishNet"/>

# 🍛 NourishNet
### *Connecting Surplus Food to People Who Need It Most*

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)

**52,847 meals donated · 200+ verified NGOs · 500+ active volunteers**

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

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

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MySQL](https://www.mysql.com/) 8.0+
- A modern browser
- [Google Gemini API Key](https://makersuite.google.com/app/apikey) (free)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nourishnet.git
cd nourishnet
```

### 2. Set Up the Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

Start the server:

```bash
node server.js
```

Server runs at `http://localhost:3000`

### 3. Set Up the Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE nourishnet;
USE nourishnet;
SOURCE database/schema.sql;
SOURCE database/sample-data.sql;
```

### 4. Launch the Frontend

Open `index.html` in your browser — no build step needed.

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/ngos` | Fetch all registered NGOs |
| `GET` | `/analytics-data` | Real-time platform statistics |
| `POST` | `/match-ngo` | AI-powered NGO recommendation |
| `POST` | `/chat` | Role-specific chatbot (Hotel / NGO / Volunteer / Donor) |
| `POST` | `/analytics-chat` | Analytics insights chatbot |

### Example: AI NGO Matching

```bash
curl -X POST http://localhost:3000/match-ngo \
  -H "Content-Type: application/json" \
  -d '{
    "foodType": "Biryani & Curry",
    "quantityKg": 20,
    "expiryHours": 4,
    "foodPreference": "Any"
  }'
```

```json
{
  "recommendedNGO": {
    "id": 1,
    "name": "Hope Foundation",
    "score": 95
  },
  "reasoning": "Best match due to high urgency, close proximity (2.3 km), and capacity for 120 people.",
  "alternatives": [
    { "id": 2, "name": "Care for Kids", "score": 88 }
  ]
}
```

---

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

## 🌱 Impact Stats (Platform Demo Data)

```
🍽️  52,847   Total meals donated
🏨  150+     Partner hotels & restaurants  
❤️  200+     Verified NGOs
🚚  500+     Active volunteers
📈  +23%     Donation growth (this month)
♻️  2.3 tons Food waste reduced
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Icons | FontAwesome 6 |
| Backend | Node.js (zero npm dependencies) |
| AI | Google Gemini 1.5 Flash |
| Database | MySQL 8 |
| Hosting | Any static host (Vercel, Netlify, GitHub Pages) + Node server |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ to end hunger, one meal at a time 🍛

**[⬆ Back to Top](#-nourishnet)**

</div>
