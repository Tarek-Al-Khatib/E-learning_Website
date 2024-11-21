import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/AdminDashboard.css";
import StudentAdmin from "./StudentAdmin";
import InstructorAdmin from "./InstructorAdmin";
import CourseAdmin from "./CourseAdmin";
import { useLocation, useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);
  const [section, setSection] = useState("students");
  const user = location.state.user;
  function content() {
    if (section == "students") {
      return <StudentAdmin token={user.access_token} />;
    } else if (section == "instructors") {
      return <InstructorAdmin token={user.access_token} />;
    } else if (section == "courses") {
      return <CourseAdmin token={user.access_token} />;
    } else {
      <div>
        <h3>Welcome to the Admin Dashboard</h3>
        <p>Select an option from the sidebar to begin managing the platform.</p>
      </div>;
    }
  }
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <button
              className="sidebar-button"
              onClick={() => setSection("students")}
            >
              Students
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setSection("instructors")}
            >
              Instructors
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setSection("courses")}
            >
              Courses
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">{content()}</div>
    </div>
  );
};

export default AdminDashboard;
