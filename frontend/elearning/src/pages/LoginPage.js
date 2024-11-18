import { React } from "react";

const Regiser = () => {
  const [signup, setSignup] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formState.name ||
      !formState.email ||
      !formState.password ||
      !formState.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formState.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    alert(`Student registered: ${formState.name}`);
    setFormState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="form-container">
      <h3>{signup ? "Student Registration" : "Student Login"}</h3>
      {signup ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formState.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formState.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleInputChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span className="toggle-link" onClick={() => setSignup(false)}>
              Login here
            </span>
          </p>
        </form>
      ) : (
        <form>
          <input type="email" name="email" placeholder="Email Address" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="toggle-link" onClick={() => setSignup(true)}>
              Register here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};
