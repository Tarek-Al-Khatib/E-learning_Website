import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/Assignment.css";
import "./css/base/utilities.css";
const Assignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state.assignment;
  const userRole = location.state.userRole;

  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, content: "This is a public comment", isPrivate: false },
    { id: 2, content: "This is a private comment", isPrivate: true },
  ]);
  const [newComment, setNewComment] = useState({
    content: "",
    isPrivate: false,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmission(file);
      alert(`Assignment submitted: ${file.name}`);
    }
  };

  const handleAddComment = () => {
    if (newComment.content) {
      setComments([...comments, { ...newComment, id: comments.length + 1 }]);
      setNewComment({ content: "", isPrivate: false });
    } else {
      alert("Comment content is required.");
    }
  };

  return (
    <div>
      <button className="back-button button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h3>{assignment.title}</h3>
      <p>{assignment.description}</p>

      {userRole === "student" && (
        <div className="submission-container">
          <h4>Submit Your Assignment</h4>
          <input type="file" onChange={handleFileChange} />
          {submission && <p>Submitted File: {submission.name}</p>}
        </div>
      )}

      <div className="comments-container">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`comment ${comment.isPrivate ? "private" : "public"}`}
          >
            <p>{comment.content}</p>
            {comment.isPrivate && <span className="tag">Private</span>}
          </div>
        ))}

        {/* Add a comment (for students) */}
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
                checked={newComment.isPrivate}
                onChange={(e) =>
                  setNewComment({ ...newComment, isPrivate: e.target.checked })
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
