
# 🫶 Jeevan Aahar  
### A Meal. A Smile. A Life.

Jeevan Aahar is a community-driven **food donation platform** designed to reduce food wastage by connecting **food donors** with **people and organizations in need**. The platform enables seamless food sharing through requests, verification, and tracking.

---

## 🚀 About the Project

Every day, large amounts of food go to waste while many people remain hungry.  
**Jeevan Aahar** aims to bridge this gap by providing a digital platform where:

- Anyone can **donate surplus food**
- NGOs / individuals can **request food**
- Admins can **monitor and manage distributions**
- Transparency and accountability are ensured

This project was built as part of a **hackathon**, focusing on real-world impact, scalability, and simplicity.

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** Firebase / JWT  
- **Deployment:** Render / Vercel  

---

## 📁 Project Structure

```

jeevan-aahar/
├── jeevan-aahar-client/   # Frontend
├── jeevan-aahar-server/   # Backend APIs
├── jeevan-aahar-chain/    # Blockchain logic (optional)
├── README.md
├── SECURITY.md
└── vercel.json

````

---

## ✨ Features

- 🔐 Secure user authentication
- 👥 Role-based access (Donor / Receiver / Admin)
- 🍱 Food donation creation & request system
- 📍 Donation tracking and status updates
- 🧾 Admin control & monitoring

---

## 🧑‍💻 User Roles

| Role | Permissions |
|-----|-------------|
| **Donor** | Create food donation posts |
| **Receiver** | Request and receive food |
| **Admin** | Verify users & manage donations |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB instance

---

### 🔧 Backend Setup

```bash
cd jeevan-aahar-server
npm install
npm run dev
````

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

### 🎨 Frontend Setup

```bash
cd jeevan-aahar-client
npm install
npm start
```

Open: `http://localhost:3000`

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint                   | Description       |
| ------ | -------------------------- | ----------------- |
| POST   | `/api/auth/login`          | User login        |
| POST   | `/api/auth/register`       | User registration |
| GET    | `/api/donations`           | View donations    |
| POST   | `/api/donations`           | Create donation   |
| PUT    | `/api/donations/:id/claim` | Claim donation    |

---

## 🌱 Future Improvements

* 📱 Mobile app version
* 🔔 Notification system
* 💬 Donor-receiver chat
* 🤖 AI food quality verification
* 📊 Analytics dashboard
* 🔗 Blockchain integration for transparent donation tracking

---

## 👨‍👩‍👦 Team
* Team Name: **404notFound**

---


## 💖 Acknowledgements

Thanks to hackathon mentors, open-source contributors, and everyone working towards reducing food waste and hunger.

---

### ⭐ If you like this project, consider giving it a star!




