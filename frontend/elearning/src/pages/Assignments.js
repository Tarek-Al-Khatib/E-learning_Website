import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Assignments = () => {
  const [assignments] = useState([
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
    {
      id: 3,
      title: "Chemistry Assignment 3",
      description: "Explain chemical reactions.",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <h3>Assignments</h3>
      <div className="container">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h4>{assignment.title}</h4>
            <p>{assignment.description}</p>
            <button
              className="view-button"
              onClick={() =>
                navigate(`/assignment`, {
                  state: {
                    assignment: assignment,
                    userRole: "instructor",
                  },
                })
              }
            >
              View Assignment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
