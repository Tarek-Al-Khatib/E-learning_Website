import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";

const StudentDashboard = () => {
  const [section, setSection] = useState("courses");

  function content() {
    if (section == "students") {
      return <StudentAdmin />;
    } else if (section == "instructors") {
      return <InstructorAdmin />;
    } else if (section == "courses") {
      return <CourseAdmin />;
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

export default StudentDashboard;
