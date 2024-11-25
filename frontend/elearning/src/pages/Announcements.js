import { React } from "react";
import { useState } from "react";
import "./css/StudentAdmin.css";
import "./css/base/utilities.css";
const StudentAdmin = () => {
  //mock data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "active",
    },
  ]);

  const handleBan = (id) => {
    const updatedStudents = students.map((student) =>
      student.id == id ? { ...student, status: "banned" } : student
    );
    setStudents(updatedStudents);
  };
  return (
    <div>
      <h3>Manage Students</h3>
      <div className="container">
        {students.map((student) => (
          <div key={student.id} className={`card ${student.status}`}>
            <h4>{student.name}</h4>
            <p>Email: {student.email}</p>
            <p>Status: {student.status}</p>
            {student.status == "active" && (
              <button
                className="ban-button"
                onClick={() => handleBan(student.id)}
              >
                Ban
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAdmin;
