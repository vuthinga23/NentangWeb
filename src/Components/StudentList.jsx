import React, { useEffect, useState } from 'react';
import StudentItem from './StudentItem';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  const handleDelete = id => {
    if (window.confirm('Xác nhận xóa sinh viên này?')) {
      const updated = students.filter(s => s.id !== id);
      localStorage.setItem('students', JSON.stringify(updated));
      setStudents(updated);

      const totalPages = Math.ceil(updated.length / studentsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  };

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; 
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="table table-striped table-hover">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <StudentItem key={student.id} student={student} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>

      
      <nav>
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
