import React, { useState } from "react";
import Assignment from "./Assignment";
import "./css/base/utilities.css";

const Assignments = () => {
  const [userRole] = useState("student");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Assignment 1",
      description: "Solve algebra problems.",
    },
    {
      id: 2,
      title: "Physics Assignment 2",
      description: "Describe Newton's laws.",
    },
  ]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
  });

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.description) {
      setAssignments([
        ...assignments,
        {
          id: assignments.length + 1,
          title: newAssignment.title,
          description: newAssignment.description,
        },
      ]);
      setNewAssignment({ title: "", description: "" });
      alert("Assignment added successfully!");
    } else {
      alert("Title and description are required.");
    }
  };

  return (
    <div>
      <h3>Assignments</h3>

      <div className="container">
        {assignments.map((assignment) => (
          <Assignment
            key={assignment.id}
            assignment={assignment}
            userRole={userRole}
          />
        ))}
      </div>

      {userRole === "instructor" && (
        <div className="form-container">
          <h4>Add New Assignment</h4>
          <input
            type="text"
            placeholder="Title"
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) =>
              setNewAssignment({
                ...newAssignment,
                description: e.target.value,
              })
            }
          ></textarea>
          <button onClick={handleAddAssignment}>Add Assignment</button>
        </div>
      )}
    </div>
  );
};

export default Assignments;
