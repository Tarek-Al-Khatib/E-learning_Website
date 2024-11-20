import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/base/utilities.css";

const InstructorAdmin = () => {
  const [instructors, setInstructors] = useState([]);
  async function getInstructors() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-instructors.php"
    );
    setInstructors(response.data);
  }
  useEffect(() => {
    getInstructors();
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCreate = async () => {
    if (formState.name && formState.email && formState.password) {
      const newInstructor = {
        username: formState.name,
        password: formState.password,
        email: formState.email,
      };

      const response = await axios.post(
        "http://localhost:8080/e-learning/backend/admin/create-instructor.php",
        JSON.stringify(newInstructor)
      );

      console.log(response.data);
      getInstructors();
      setFormState({ name: "", email: "", password: "" });
    } else {
      alert("Please fill out all fields to create an instructor.");
    }
  };

  const handleBan = async (id) => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === id ? { ...instructor, status: "banned" } : instructor
    );
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/admin/ban-user.php",
      JSON.stringify({ userId: Number(id) })
    );
    console.log(response.data);
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
