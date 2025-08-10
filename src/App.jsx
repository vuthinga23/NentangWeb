// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { students } from './data/students.js';
import EmployeeForm from './Components/EmployeeForm.jsx';
import StudentList from './Components/StudentList.jsx';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Nạp data.js vào localStorage nếu chưa có
    const existing = localStorage.getItem('students');
    if (!existing) {
      localStorage.setItem('students', JSON.stringify(students));
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div>Đang khởi tạo dữ liệu…</div>;
  }

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Quản lý Sinh Viên </a>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/">Danh sách</Link>
            <Link className="btn btn-success" to="/add">Thêm mới</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm editMode={true} />} /> 
      </Routes>
    </div>
  );
}
