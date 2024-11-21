import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/base/utilities.css";

const Assignments = ({ userRole }) => {
  const [assignments, setAssignments] = useState([]);
  const [userType] = useState(userRole);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    due_date: "",
    course_id: "",
  });
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAssignmentsFromEnrolled();
    getCourses();
  }, []);

  async function getAssignmentsFromEnrolled() {
    const response = await axios.get(
      `http://localhost:8080/e-learning/backend/student/get-assignments-enrolled.php?student_id=${3}`
    );
    setAssignments(response.data);
  }

  async function getCourses() {
    const response = await axios.get(
      `http://localhost:8080/e-learning/backend/general/get-courses.php`
    );
    setCourses(response.data);
  }

  const handleCreateAssignment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/e-learning/backend/instructor/create-assignment.php",
        JSON.stringify(newAssignment)
      );
      console.log(response.data);
      setNewAssignment({
        title: "",
        description: "",
        due_date: "",
        course_id: "",
      });
      getAssignmentsFromEnrolled();
    } catch (error) {
      console.error("Error creating assignment", error);
    }
  };

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
              className="view-button button"
              onClick={() =>
                navigate(`/assignment`, {
                  state: {
                    assignment: assignment,
                    userRole: userType,
                  },
                })
              }
            >
              View Assignment
            </button>
          </div>
        ))}
      </div>

      {userType === "instructor" && (
        <form onSubmit={handleCreateAssignment} className="form-container">
          <h3>Create Assignment</h3>
          <input
            type="text"
            placeholder="Title"
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) =>
              setNewAssignment({
                ...newAssignment,
                description: e.target.value,
              })
            }
          />
          <input
            type="date"
            value={newAssignment.due_date}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, due_date: e.target.value })
            }
          />
          <select
            value={newAssignment.course_id}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, course_id: e.target.value })
            }
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button type="submit" className="create-button button">
            Create Assignment
          </button>
        </form>
      )}
    </div>
  );
};

export default Assignments;
