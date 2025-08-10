// src/components/StudentItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentItem({ student, onDelete }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>
        <Link to={`/edit/${student.id}`} className="btn btn-sm btn-warning me-2"> <i className="bi bi-pencil"></i> </Link>
        <button onClick={() => onDelete(student.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
      </td>
    </tr>
  );
}
