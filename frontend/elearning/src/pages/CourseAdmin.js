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
    id: "",
    name: "",
    description: "",
    instructor_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    console.log(name, value);
  };

  const handleSelectChange = (e) => {
    setFormState({ ...formState, instructor_id: e.target.value });
  };

  const handleCreate = async () => {
    const newCourse = {
      name: formState.name,
      description: formState.description,
      instructor_id: Number(formState.instructor_id),
    };
    console.log(newCourse);

    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/admin/create-course.php",
      JSON.stringify(newCourse)
    );

    console.log(response.data);
    getCourses();
    setFormState({
      name: "",
      description: "",
      instructor_id: "",
    });
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    console.log(courseToEdit);
    setFormState(courseToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    const newCourse = {
      id: formState.id,
      name: formState.name,
      description: formState.description,
      instructor_id: Number(formState.instructor_id),
    };
    console.log(newCourse);
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/admin/edit-course.php",
      JSON.stringify(newCourse)
    );

    console.log(response.data);
    getCourses();
    setFormState({
      name: "",
      description: "",
      instructor_id: "",
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
          value={formState.instructor_id}
          onChange={handleSelectChange}
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
                name: "",
                description: "",
                instructor_id: "",
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
          <div key={course.id}>
            <h4>{course.name}</h4>
            <p>Description: {course.description}</p>
            <p>Instructor: {course.username}</p>
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
