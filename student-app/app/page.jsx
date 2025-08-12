"use client"
import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../lib/api";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // <-- NEW state for Date of Birth
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setDob(""); // <-- reset dob too
    setEditId(null);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !email || !dob) {
      alert("Please fill Name, Email, and Date of Birth");
      return;
    }
    if (editId) {
      await updateStudent(editId, name, email);
    } else {
      await addStudent({ name, email, dob }); // <-- send dob to backend
    }
    resetForm();
    fetchData();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setDob(student.dob || ""); // <-- prefill dob if available
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;
    await deleteStudent(id);
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management</h1>

      {/* FORM */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* NEW dob input */}
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId ? "Update Student" : "Add Student"}
        </button>
        {editId && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.dob}</td> 
              <td>{s.age}</td> 
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
