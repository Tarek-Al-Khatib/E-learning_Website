import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/Assignment.css";
import "./css/base/utilities.css";
import axios from "axios";
const Assignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state.assignment;
  const userRole = location.state.userRole;

  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);
  async function getComments() {
    const response = await axios.get(
      `http://localhost:8080/e-learning/backend/student/get-comments.php?assignment_id=${assignment.id}`
    );
    setComments(response.data);
  }

  async function checkIfSubmitted() {
    const response = axios.get(
      `http://localhost:8080/e-learning/backend/student/check-submitted?assignment_id=${
        assignment.id
      }&student_id=${3}`
    );
  }
  const [newComment, setNewComment] = useState({
    assignment_id: assignment.id,
    content: "",
    is_private: false,
    user_id: 3,
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmission(file);
      const submission = {
        file_path: file.name,
        assignment_id: assignment.id,
        student_id: 3,
      };

      const response = await axios.post(
        "http://localhost:8080/e-learning/backend/student/submit-assignment.php",
        JSON.stringify(submission)
      );

      console.log(response);
    }
  };

  const handleAddComment = async () => {
    console.log(newComment);
    const response = await axios.post(
      "http://localhost:8080/e-learning/backend/student/add-comment.php",
      JSON.stringify(newComment)
    );
    console.log(response.data);
    getComments();
    setNewComment({ ...newComment, content: "" });
  };

  return (
    <div className="assignment-container">
      <button className="back-button button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h3>{assignment.title}</h3>
      <p>{assignment.description}</p>
      <h5>Due Date: {assignment.due_date}</h5>
      <p>
        <strong>Course: {assignment.course_name}</strong>
      </p>

      {userRole === "student" && (
        <div className="submission-container">
          <h4>Submit Your Assignment</h4>
          <input type="file" onChange={handleFileChange} />
          {submission && <p>Submitted File: {submission.name}</p>}
        </div>
      )}

      <div className="comments-container">
        <h4>Comments</h4>
        {comments
          .filter((c) =>
            userRole === "student" ? !c.is_private || c.user_id == 3 : true
          )
          .map((comment) => (
            <div
              key={comment.id}
              className={`comment ${comment.is_private ? "private" : "public"}`}
            >
              <h4>{comment.username}: </h4>
              <p>{comment.content}</p>
            </div>
          ))}

        {userRole === "student" && (
          <div className="add-comment">
            <textarea
              placeholder="Add a comment"
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
            ></textarea>
            <label>
              <input
                type="checkbox"
                checked={newComment.is_private}
                onChange={(e) =>
                  setNewComment({ ...newComment, is_private: e.target.checked })
                }
              />
              Private Comment
            </label>
            <br />
            <button onClick={handleAddComment}>Post Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
