import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
