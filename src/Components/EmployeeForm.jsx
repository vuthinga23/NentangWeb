import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function StudentForm({ editMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && id) {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const found = students.find(s => s.id === Number(id));
      if (found) setStudent(found);
    }
  }, [editMode, id]);

  const validate = () => {
    const e = {};
    if (!student.name) e.name = 'Họ tên không được trống';
    if (!student.email || !/\S+@\S+\.\S+/.test(student.email))
      e.email = 'Email không hợp lệ';
    if (!student.address) e.address = 'Địa chỉ không được trống';
    if (!student.phone || !/^\d{9,11}$/.test(student.phone))
      e.phone = 'Số điện thoại không hợp lệ (9-11 số)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const students = JSON.parse(localStorage.getItem('students')) || [];
  const newStudent = {
    id: editMode ? Number(id) : Date.now(),
    ...student
  };

  if (editMode) {
    const index = students.findIndex(s => s.id === Number(id));
    if (index !== -1) {
      students[index] = newStudent;
    }
  } else {
    students.push(newStudent);
  }

  localStorage.setItem('students', JSON.stringify(students));
  navigate('/');
};


  return (
    <form onSubmit={handleSubmit} className="p-4 rounded" style={{ backgroundColor: '#8bd7e0' }}>
      <h4 className="mb-3">{editMode ? 'Sửa Sinh Viên' : 'Thêm Sinh Viên'}</h4>

     
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <input
          type="text"
          className="form-control"
          value={student.name}
          onChange={e => setStudent({ ...student, name: e.target.value })}
        />
        {errors.name && <div className="text-danger small">{errors.name}</div>}
      </div>

      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
        />
        {errors.email && <div className="text-danger small">{errors.email}</div>}
      </div>

     
      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input
          type="text"
          className="form-control"
          value={student.address}
          onChange={e => setStudent({ ...student, address: e.target.value })}
        />
        {errors.address && <div className="text-danger small">{errors.address}</div>}
      </div>

    
      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="text"
          className="form-control"
          value={student.phone}
          onChange={e => setStudent({ ...student, phone: e.target.value })}
        />
        {errors.phone && <div className="text-danger small">{errors.phone}</div>}
      </div>

      <button type="submit" className="btn w-100" style={{ backgroundColor: '#ffca2c', color: '#000' }}>
        {editMode ? 'Cập nhật Sinh Viên' : '+ Thêm mới Sinh Viên'}
      </button>
    </form>
  );
}
