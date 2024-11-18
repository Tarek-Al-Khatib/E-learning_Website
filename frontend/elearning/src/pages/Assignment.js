import React, { useState } from "react";
import "./css/base/utilities.css";

const Assignment = ({ route }) => {
  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([]);
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
    <div className="card">
      <h4>{assignment.title}</h4>
      <p>{assignment.description}</p>
      {userRole === "student" && (
        <div className="submission-container">
          <h5>Submit Assignment</h5>
          <input type="file" onChange={handleFileChange} />
          {submission && <p>Submitted File: {submission.name}</p>}
        </div>
      )}

      <div className="comments-container">
        <h5>Comments</h5>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`comment ${comment.isPrivate ? "private" : "public"}`}
          >
            <p>{comment.content}</p>
            {comment.isPrivate && <span className="tag">Private</span>}
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
                checked={newComment.isPrivate}
                onChange={(e) =>
                  setNewComment({ ...newComment, isPrivate: e.target.checked })
                }
              />
              Private Comment
            </label>
            <button onClick={handleAddComment}>Post Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
