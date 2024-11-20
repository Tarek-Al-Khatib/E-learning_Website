import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/base/utilities.css";

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);

  const [instructors, setInstructors] = useState([]);

  async function getInstructors() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-instructors.php"
    );
    setInstructors(response.data);
  }

  async function getCourses() {
    const response = await axios.get(
      "http://localhost:8080/e-learning/backend/general/get-courses.php"
    );
    setCourses(response.data);
  }
  useEffect(() => {
    getInstructors();
    getCourses();
  }, []);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    instructor: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCreate = () => {
    const newCourse = {
      name: formState.name,
      description: formState.description,
      instructor_id: formState.instructor,
    };
    setFormState({
      id: null,
      name: "",
      description: "",
      instructor: "",
    });
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setFormState(courseToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setFormState({
      id: null,
      name: "",
      description: "",
      instructor: "",
      status: "active",
    });
    setIsEditing(false);
  };

  const handleRemove = (id) => {};

  return (
    <div>
      <h3>Manage Courses</h3>

      <div className="form-container">
        <h4>{isEditing ? "Edit Course" : "Create Course"}</h4>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={formState.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={formState.description}
          onChange={handleInputChange}
        />
        <select
          name="instructor"
          value={formState.instructor}
          onChange={handleInputChange}
        >
          <option value="">Select Instructor</option>
          {instructors
            .filter((instructor) => instructor.status !== "banned")
            .map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.username}
              </option>
            ))}
        </select>
        <button
          className="button"
          onClick={isEditing ? handleSaveEdit : handleCreate}
        >
          {isEditing ? "Save Changes" : "Create Course"}
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setFormState({
                id: null,
                name: "",
                instructor: "",
              });
            }}
            className="cancel-button button"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="container">
        {courses.map((course) => (
          <div key={course.id} className={`card ${course.status}`}>
            <h4>{course.name}</h4>
            <p>Instructor: {course.instructor}</p>
            <button
              className="edit-button button"
              onClick={() => handleEdit(course.id)}
            >
              Edit
            </button>
            <button
              className="remove-button button"
              onClick={() => handleRemove(course.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAdmin;
