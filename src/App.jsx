import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

const API = "http://localhost:3000/customers"; 

export default function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setStudents(data);
  };

  const deleteStudent = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StudentList students={students} deleteStudent={deleteStudent} />
          }
        />
        <Route path="/add" element={<StudentForm fetchStudents={fetchStudents} />} />
        <Route path="/edit/:id" element={<StudentForm fetchStudents={fetchStudents} />} />
      </Routes>
    </Router>
  );
}
