import React, { useState } from "react";
import "./css/base/utilities.css";

const Assignments = () => {
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

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCreate = () => {
    if (formState.name && formState.email && formState.password) {
      const newInstructor = {
        id: instructors.length + 1,
        name: formState.name,
        email: formState.email,
        status: "active",
      };
      setInstructors([...instructors, newInstructor]);
      setFormState({ name: "", email: "", password: "" });
    } else {
      alert("Please fill out all fields to create an instructor.");
    }
  };

  const handleBan = (id) => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === id ? { ...instructor, status: "banned" } : instructor
    );
    setInstructors(updatedInstructors);
  };

  return (
    <div>
      <h3>Manage Instructors</h3>

      <div className="form-container">
        <h4>Create Instructor</h4>
        <input
          type="text"
          name="name"
          placeholder="Instructor Name"
          value={formState.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Instructor Email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Instructor Password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate} className="create-button button">
          Create Instructor
        </button>
      </div>

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
