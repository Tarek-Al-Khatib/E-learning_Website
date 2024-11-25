import React, { useState, useEffect } from "react";
import "./css/base/utilities.css";
import "./css/Courses.css";
import axios from "axios";
const Courses = ({ role, token }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    getCourses();
    getEnrolledCourses();
  }, []);
  async function getCourses() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-courses.php"
    );

    const temp = response.data;
    temp.forEach((c) => ((c.showInput = false), (c.email = "")));
    setCourses(temp);
    console.log(courses);
  }

  async function getEnrolledCourses() {
    const response = await axios.get(
      `http://localhost:8080/e-learning/backend/student/get-enrolled-courses.php?id=${3}`
    );
    console.log(response.data);
    setEnrolledCourses(response.data);
  }

  const handleEnroll = async (id) => {
    console.log(id);
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/student/enroll-course.php",
      JSON.stringify({ course_id: id, user_id: 3 })
    );
    console.log(response.data);
    getEnrolledCourses();
  };

  const handleSubmit = async (courseid, email) => {
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/instructor/enroll-student-email.php",
      JSON.stringify({ course_id: courseid, email: email }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    console.log(response.data);
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === courseid ? { ...c, showInput: false, email: "" } : c
      )
    );
  };

  return (
    <div>
      <h3>Courses</h3>
      <div className="container">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h4>{course.name}</h4>
            <p>Description: {course.description}</p>
            <p>Instructor: {course.username}</p>
            {role == "student" && (
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course.id)}
              >
                Enroll
              </button>
            )}

            {role == "instructor" && (
              <button
                className="invite-button"
                onClick={() => {
                  setCourses((prevCourses) =>
                    prevCourses.map((c) =>
                      c.id === course.id ? { ...c, showInput: true } : c
                    )
                  );
                }}
              >
                Invite Students
              </button>
            )}

            {course.showInput && (
              <div>
                <input
                  type="email"
                  placeholder="Enter student email"
                  value={course.email}
                  onChange={(e) => {
                    setCourses((prevCourses) =>
                      prevCourses.map((c) =>
                        c.id === course.id ? { ...c, email: e.target.value } : c
                      )
                    );
                  }}
                />
                <button onClick={() => handleSubmit(course.id, course.email)}>
                  Send Invite
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {role == "student" && enrolledCourses.length > 0 && (
        <div className="enrolled-container">
          <h4>Enrolled Courses</h4>
          {enrolledCourses.map((course) => (
            <div key={course.id} className="enrolled-card">
              <h5>{course.name}</h5>
              <p>Instructor: {course.instructor_name}</p>
              <p>Description: {course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
