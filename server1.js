const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FILE = "StudentData.json";

app.use(cors());
app.use(express.json());

/* =====================================================
   LOGGING MIDDLEWARE
===================================================== */
app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});


/* =====================================================
    AUTH MIDDLEWARE
   Example: ?auth=true OR header auth=true
===================================================== */
const authMiddleware = (req, res, next) => {
  const auth = req.query.auth || req.headers.auth;

  if (auth === "true") {
    next();
  } else {
    return res.status(401).json({
      error: "Unauthorized access"
    });
  }
};


/* =====================================================
   9. VALIDATION FUNCTION
===================================================== */
const validateStudent = (student) => {
  if (!student.name || !student.course) {
    return "Name and Course are required";
  }

  if (typeof student.age !== "number") {
    return "Age must be a number";
  }

  return null;
};


/* =====================================================
   READ FILE HELPER
===================================================== */
const readData = () => {
  try {
    const data = fs.readFileSync(FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};


/* =====================================================
   GET ALL STUDENTS
===================================================== */
app.get("/students", (req, res) => {
  const students = readData();
  res.json(students);
});


/* =====================================================
   CREATE (ADD)
===================================================== */
app.post("/add", authMiddleware, (req, res) => {
  try {
    const students = readData();
    const newStudent = req.body;

    // VALIDATION
    const error = validateStudent(newStudent);
    if (error) {
      return res.status(400).json({ error });
    }

    // Unique ID
    const newId = students.length ? students[students.length - 1].id + 1 : 1;
    newStudent.id = newId;

    students.push(newStudent);
    writeData(students);

    res.status(201).json({
      message: "Student added",
      data: newStudent
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


/* =====================================================
   UPDATE
===================================================== */
app.put("/update/:id", authMiddleware, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const students = readData();
    const updatedData = req.body;

    // VALIDATION
    const error = validateStudent(updatedData);
    if (error) {
      return res.status(400).json({ error });
    }

    const index = students.findIndex(s => s.id === id);

    // VALIDATION
    if (index === -1) {
      return res.status(404).json({ error: "Student not found" });
    }

    students[index] = { ...students[index], ...updatedData, id };
    writeData(students);

    res.json({
      message: "Student updated",
      data: students[index]
    });

  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


/* =====================================================
   DELETE
===================================================== */
app.delete("/delete/:id", authMiddleware, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const students = readData();

    const newStudents = students.filter(s => s.id !== id);

    if (students.length === newStudents.length) {
      return res.status(404).json({ error: "Student not found" });
    }

    writeData(newStudents);

    res.json({ message: "Student deleted" });

  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


/* =====================================================
   DEFAULT ROUTE
===================================================== */
app.get("/", (req, res) => {
  res.send("API Running...");
});


/* =====================================================
   START SERVER
===================================================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});