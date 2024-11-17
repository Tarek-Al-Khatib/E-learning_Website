import { React } from "react";

const StudentAdmin = () => {
  //mock data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "active",
    },
  ]);
  return (
    <div>
      <h3>Manage Students</h3>
      <div className="students-container">
        {students.map((student) => (
          <div key={student.id} className={`student-card ${student.status}`}>
            <h4>{student.name}</h4>
            <p>Email: {student.email}</p>
            <p>Status: {student.status}</p>
            {student.status === "active" && (
              <button className="ban-button">Ban</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAdmin;
