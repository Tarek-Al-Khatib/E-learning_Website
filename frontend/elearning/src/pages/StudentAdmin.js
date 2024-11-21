import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./css/base/utilities.css";
const StudentAdmin = ({ token }) => {
  const [students, setStudents] = useState([]);
  async function getStudents() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-students.php"
    );
    setStudents(response.data);
  }
  useEffect(() => {
    getStudents();
  }, []);

  const handleBan = async (id) => {
    const updatedStudents = students.map((student) =>
      student.id == id ? { ...student, status: "banned" } : student
    );
    console.log(id);
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/admin/ban-user.php",
      JSON.stringify({ userId: Number(id) }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    console.log(response.data);
    setStudents(updatedStudents);
  };
  return (
    <div>
      <h3>Manage Students</h3>
      <div className="container">
        {students.map((student) => (
          <div key={student.id} className={`card ${student.status}`}>
            <h4>{student.username}</h4>
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
