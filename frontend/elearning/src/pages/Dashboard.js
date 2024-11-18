import React, { useState } from "react";
import Assignments from "./Assignments";
import Courses from "./Courses";

const Dashboard = () => {
  const userRole = "student";
  const [section, setSection] = useState("courses");

  function content() {
    if (section === "assignments") {
      return <Assignments userRole={userRole} />;
    } else if (section === "courses") {
      return <Courses userRole={userRole} />;
    } else {
      return (
        <div>
          <h3>Welcome to the Dashboard</h3>
          <p>
            Select an option from the sidebar to begin managing the platform.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>
          {userRole === "instructor" ? "Instructor" : "Student"} Dashboard
        </h2>
        <ul className="sidebar-menu">
          <li>
            <button
              className="sidebar-button"
              onClick={() => setSection("courses")}
            >
              Courses
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setSection("assignments")}
            >
              Assignments
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">{content()}</div>
    </div>
  );
};

export default Dashboard;
