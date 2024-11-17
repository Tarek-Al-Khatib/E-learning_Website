import { React } from "react";
import { useState } from "react";
import "./css/base/utilities.css";
const InstructorAdmin = () => {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "Prof. Alice Brown",
      email: "alice.brown@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      email: "emily.white@example.com",
      status: "active",
    },
  ]);

  const handleBan = (id) => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id == id ? { ...instructor, status: "banned" } : instructor
    );
    setInstructors(updatedInstructors);
  };
  return (
    <div>
      <h3>Manage Instructors</h3>
      <div className="container">
        {instructors.map((instructor) => (
          <div key={instructor.id} className={`card ${instructor.status}`}>
            <h4>{instructor.name}</h4>
            <p>Email: {instructor.email}</p>
            <p>Status: {instructor.status}</p>
            {instructor.status === "active" && (
              <button
                className="ban-button"
                onClick={() => handleBan(instructor.id)}
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

export default InstructorAdmin;
