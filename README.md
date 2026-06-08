# Comprehensive Quiz Portal

An elegant, high-performance, full-stack quiz web application explicitly designed for **M.Tech Integrated Software Engineering** students to prepare for their comprehensive exams. The platform tracks student progress across 1,165+ technical questions sourced directly from official VTOP course materials.

🚀 **Live Application Link:** [https://vit-quiz-app.vercel.app/](https://vit-quiz-app.vercel.app/)

---

## 💎 Features

- **Royal Blue UI/UX:** A minimalist, premium aesthetic tailored for high-resolution laptop displays featuring negative space and smooth gradients.
- **Robust Authentication:** Real-world authentication using **Firebase Auth**, strictly restricted to valid `@vitstudent.ac.in` email addresses.
- **Cloud Analytics:** Seamless integration with **Cloud Firestore** to persist student details (Name & Registration Number) and complete test history across devices.
- **Dynamic Quiz Engine:** - **Module-Wise Practice:** Focused execution for individual core subjects (DSA, DBMS, OS, CN, COA, Java, Python, and Software Engineering).
  - **Sequential Syllabus Sets:** Fixed progression through 12 organized sets of 100 questions to master all 1,165+ items without repetition.
  - **Random Mock Exam:** Evaluates readiness with 100 fully randomized questions across the entire syllabus.
- **Interactive Review System:** Strict response validation blocking skipped questions, paired with an end-of-test mistake summary showing incorrect choices in light red and correct answers in green.
- **Data Visualizations:** Custom **Radar Charts** mapped to gauge subject mastery alongside a linear **Improvement Timeline** charting score percentages across successive test attempts.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite configuration)
- **Styling:** CSS3 Flexbox (Custom Royal Dynamic Theme)
- **Database & Auth:** Firebase (Authentication & Cloud Firestore)
- **Charts:** Recharts (SVG Data Visualizations)
- **Hosting:** Vercel

---

## 📦 Project Directory Structure

```text
vit-quiz/
├── public/
├── src/
│   ├── data/
│   │   └── questions.json     # Local database of 1165+ questions
│   ├── pages/
│   │   ├── Landing.jsx        # Project overview & VTOP PDF gateway
│   │   ├── Login.jsx          # Firebase email/password authentication
│   │   ├── Signup.jsx         # Collects name, reg number, and uploads to cloud
│   │   ├── Dashboard.jsx      # Mode configuration (2x4 Module Grid Layout)
│   │   ├── Quiz.jsx           # Validation engine & mistake reviewer
│   │   └── Result.jsx         # Recharts performance metrics
│   ├── utils/
│   │   └── quizLogic.js       # Filtering algorithms and Fisher-Yates shuffle
│   ├── App.css                # Royal dynamic theme rules
│   ├── App.jsx                # Layout definitions and client-side routing
│   ├── firebase.js            # Initialized Firebase configuration
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json                # Single-page application redirect rules
└── vite.config.js

```

---

## ⚡ Local Setup and Installation

Follow these steps to run the portal locally on your machine:

1. **Clone the Repository:**
```bash
git clone [https://github.com/Akash2027/VIT-Quiz-App.git](https://github.com/Akash2027/VIT-Quiz-App.git)
cd VIT-Quiz-App

```


2. **Install Dependencies:**
```bash
npm install

```


3. **Configure Firebase Credentials:**
Ensure your `src/firebase.js` matches your Firebase console web app initialization config with the necessary `auth` and `db` exports.
4. **Run the Development Server:**
```bash
npm run dev

```



---

## 🌐 Real-World Deployment

### 1. Cloud Firestore Rules Configuration

To allow the client application to sync metrics securely, configure your database rules in the Firebase Console under **Firestore Database > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

```

### 2. Single Page Application (SPA) Routing on Vercel

To prevent `404 Not Found` errors when refreshing sub-routes like `/dashboard` or `/result` on live URLs, ensure a `vercel.json` file is present in the root directory:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```

---

## 📋 Source Documentation

* **Syllabus Core:** Curated entirely from the official VTOP Course materials.
* **Reference Document:** [Access Source PDF via Google Drive](https://drive.google.com/file/d/1ooKpvppA5JlDr7EDrBFrKTwAOp_boHGy/view?usp=sharing)

---

## 🤝 Support and Feedback

For general inquiries, data corrections, or reporting incorrect answer mappings within the question bank, please connect directly:

## 👨‍💻 Author

**Akash K**

M.Tech Software Engineering

GitHub: https://github.com/Akash2027

LinkedIn: www.linkedin.com/in/akash-k-bb9a20274

```

```
