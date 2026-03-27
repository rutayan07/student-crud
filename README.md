# 🚀 Student CRUD App (React + Express + JSON)

A full-stack **Student Management System** built using **React (Vite)** and **Express.js**, implementing complete CRUD operations with middleware, validation, and basic authentication.

---

## 📌 Features

* ✅ View all students
* ➕ Add new student
* ✏️ Update student details
* ❌ Delete student
* 🔐 Basic authentication middleware
* 📋 Request logging middleware
* ✅ Input validation (name, age, course)
* ⚠️ Proper error handling (400, 404, 500)
* 🌐 React frontend with dynamic UI updates

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* Fetch API

### Backend

* Node.js
* Express.js
* File System (JSON as database)
* CORS Middleware

---

## 📂 Project Structure

```
student-crud-app/
│
├── backend/
│   ├── server.js
│   ├── StudentData.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the repository

```bash
git clone https://github.com/your-username/student-crud-app.git
cd student-crud-app
```

---

### 🔹 2. Setup Backend

```bash
cd backend
npm install
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

### 🔹 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| GET    | `/students`             | Get all students |
| POST   | `/add?auth=true`        | Add new student  |
| PUT    | `/update/:id?auth=true` | Update student   |
| DELETE | `/delete/:id?auth=true` | Delete student   |

---

## 🔐 Authentication

Basic authentication is implemented using middleware.

* Pass query parameter:

```
?auth=true
```

Example:

```
http://localhost:3000/add?auth=true
```

If not provided:

```json
{
  "error": "Unauthorized access"
}
```

---

## ✅ Validation Rules

* **name** → required
* **course** → required
* **age** → must be a number

Invalid input returns:

```json
{
  "error": "Invalid input"
}
```

---

## ⚠️ Error Handling

| Status Code | Meaning           |
| ----------- | ----------------- |
| 400         | Invalid input     |
| 401         | Unauthorized      |
| 404         | Student not found |
| 500         | Server error      |

---

## 📋 Middleware Used

* Logging Middleware → Logs method, URL, timestamp
* Authentication Middleware → Checks `auth=true`
* Validation Logic → Ensures correct data format
* Error Handling → Sends proper HTTP responses

---

## 💡 Key Concepts Covered

* REST API (CRUD operations)
* React state management (`useState`, `useEffect`)
* Express middleware
* CORS (Cross-Origin Resource Sharing)
* JSON file as database
* Client-server communication using Fetch API

---

## 🚀 Future Improvements

* 🔥 Use MongoDB instead of JSON
* 🔥 Add JWT authentication
* 🔥 Improve UI using Tailwind CSS
* 🔥 Add form validation with error messages

---

## 👨‍💻 Author

**Rutayan Patra**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
