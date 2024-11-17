import React, { useState } from "react";
import "./css/base/utilities.css";

const CourseAdmin = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. John Smith",
      status: "active",
    },
    {
      id: 2,
      name: "Physics 201",
      instructor: "Prof. Alice Brown",
      status: "active",
    },
    {
      id: 3,
      name: "Chemistry 301",
      instructor: "Dr. Emily White",
      status: "active",
    },
  ]);

  const [instructors] = useState([
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Prof. Alice Brown" },
    { id: 3, name: "Dr. Emily White" },
  ]);

  const [formState, setFormState] = useState({
    id: null,
    name: "",
    instructor: "",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCreate = () => {
    const newCourse = {
      id: courses.length + 1,
      name: formState.name,
      instructor: formState.instructor,
      status: "active",
    };
    setCourses([...courses, newCourse]);
    setFormState({ id: null, name: "", instructor: "", status: "active" });
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setFormState(courseToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedCourses = courses.map((course) =>
      course.id === formState.id ? formState : course
    );
    setCourses(updatedCourses);
    setFormState({ id: null, name: "", instructor: "", status: "active" });
    setIsEditing(false);
  };

  const handleRemove = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

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
        <select
          name="instructor"
          value={formState.instructor}
          onChange={handleInputChange}
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.name}>
              {instructor.name}
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
                status: "active",
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
            <p>Status: {course.status}</p>
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
