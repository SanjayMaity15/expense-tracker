# 💰 Expense Tracker Application

## 📌 Description

The **Expense Tracker Application** is a full-stack MERN application that allows users to manage personal finances by recording income and expenses. The system provides a transaction summary displaying total income, total expenses, and remaining balance, with secure authentication to ensure user-specific data privacy.

---

## 🗂 Project Structure

```
expense-tracker/
│
├── frontend/     # React client
└── backend/      # Node.js & Express server
```

---

## 🚀 Features

* User authentication using JWT
* Add, edit, and delete income and expense transactions
* Transaction summary (income, expenses, balance)
* Secure user-specific data handling
* Simple and intuitive UI

---

## 🛠 Tech Stack

**Frontend:** React.js, HTML, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Authentication:** JWT
**Tools:** Git, GitHub, Postman

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 Use Case

Helps individuals track daily income and expenses and maintain financial clarity.
