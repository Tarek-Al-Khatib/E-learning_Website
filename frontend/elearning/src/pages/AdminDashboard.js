import React from "react";
import "./css/AdminDashboard.css";
const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <button className="sidebar-button">Students</button>
          </li>
          <li>
            <button className="sidebar-button">Instructors</button>
          </li>
          <li>
            <button className="sidebar-button">Courses</button>
          </li>
          <li>
            <button className="sidebar-button">Instructor</button>
          </li>
          <li>
            <button className="sidebar-button">Course</button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Welcome to the Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
