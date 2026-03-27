import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000";

  // ✅ Fetch students
  const fetchStudents = async () => {
    const res = await fetch(`${API}/students`);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API}/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", age: "", course: "" });
    fetchStudents();
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    await fetch(`${API}/delete/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  // ✅ Edit
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student CRUD</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Course</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;