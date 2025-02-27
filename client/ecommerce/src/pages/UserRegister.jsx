import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    contact_number: "",
    address: "",
    store_name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const endpoint = role === "user" ? "/users/register" : "/sellers/register";
    const payload =
      role === "user"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            contact_number: formData.contact_number,
            address: formData.address,
          }
        : {
            name: formData.name,
            email: formData.email,
            store_name: formData.store_name,
            password: formData.password,
          };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000${endpoint}`,
        payload
      );
      console.log("Registration successful:", response.data);
      setSuccess("Registration successful! You can now log in.");
      setAuth(role, response.data.id);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3 text-center">
          <label className="form-label fw-bold">Select Role</label>
          <div className="btn-group w-100">
            <button
              className={`btn ${
                role === "user" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              className={`btn ${
                role === "seller" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setRole("seller")}
            >
              Seller
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {role === "user" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {role === "seller" && (
            <div className="mb-3">
              <label className="form-label fw-bold">Store Name</label>
              <input
                type="text"
                className="form-control"
                name="store_name"
                value={formData.store_name}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold">
            Register as {role === "user" ? "User" : "Seller"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
