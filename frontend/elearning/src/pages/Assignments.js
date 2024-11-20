import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getAssignmentsFromEnrolled();
  }, []);

  async function getAssignmentsFromEnrolled() {
    const response = await axios.get(
      `http://localhost:8080/e-learning/backend/student/get-assignments-enrolled.php?student_id=${3}`
    );
    setAssignments(response.data);
  }
  const navigate = useNavigate();

  return (
    <div>
      <h3>Assignments</h3>
      <div className="container">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h4>{assignment.title}</h4>
            <p>{assignment.description}</p>
            <h5>Due Date: {assignment.due_date}</h5>
            <p>
              <strong>Course: {assignment.course_name}</strong>
            </p>
            <button
              className="view-button"
              onClick={() =>
                navigate(`/assignment`, {
                  state: {
                    assignment: assignment,
                    userRole: "student",
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
