import React, { useState, useEffect } from "react";
import "./css/base/utilities.css";
import "./css/Courses.css";
import axios from "axios";
const Courses = () => {
  const [userRole] = useState("student");
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  async function getCourses() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-courses.php"
    );
    setCourses(response.data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  const handleEnroll = (id) => {};

  const handleInvite = (id) => {};

  return (
    <div>
      <h3>Courses</h3>
      <div className="container">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h4>{course.name}</h4>
            <p>Description: {course.description}</p>
            <p>Instructor: {course.username}</p>
            {userRole == "student" && (
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course.id)}
              >
                Enroll
              </button>
            )}

            {userRole == "instructor" && (
              <button
                className="invite-button"
                onClick={() => handleInvite(course.id)}
              >
                Invite Students
              </button>
            )}
          </div>
        ))}
      </div>

      {userRole == "student" && enrolledCourses.length > 0 && (
        <div className="enrolled-container">
          <h4>Enrolled Courses</h4>
          {enrolledCourses.map((course) => (
            <div key={course.id} className="enrolled-card">
              <h5>{course.name}</h5>
              <p>Stream: {course.stream}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
