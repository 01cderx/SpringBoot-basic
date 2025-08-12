// lib/api.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/v1/student";

export const getStudents = () => axios.get(API_BASE);
export const addStudent = (student) => axios.post(API_BASE, student);
export const updateStudent = (id, name, email) =>
  // controller mein @RequestParam use kiya hai, isliye params se bhej rahe hain
  axios.put(`${API_BASE}/${id}`, null, { params: { name, email } });
export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);
