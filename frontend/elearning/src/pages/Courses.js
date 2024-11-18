import React, { useState } from "react";
import "./css/base/utilities.css";
import "./css/Courses.css";
const Courses = () => {
  const [userRole] = useState("instructor");
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics 101", stream: "Basic Algebra and Geometry" },
    {
      id: 2,
      name: "Physics 201",
      stream: "Newtonian Mechanics and Thermodynamics",
    },
    { id: 3, name: "Chemistry 301", stream: "Organic Chemistry and Reactions" },
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (id) => {};

  const handleInvite = (id) => {};

  return (
    <div>
      <h3>Courses</h3>
      <div className="container">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h4>{course.name}</h4>
            <p>Stream: {course.stream}</p>

            {userRole === "student" && (
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course.id)}
              >
                Enroll
              </button>
            )}

            {userRole === "instructor" && (
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

      {userRole === "student" && enrolledCourses.length > 0 && (
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
