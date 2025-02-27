// AddProduct.jsx
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "", // Consistent snake_case as per backend
    stock: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  // Fallback to localStorage if authData is not available
  const sellerId = authData?.sellerId || localStorage.getItem("sellerId");

  useEffect(() => {
    console.log("AuthContext Data:", authData);
    console.log("Retrieved sellerId:", sellerId);

    if (!sellerId) {
      setError("Seller ID is undefined. Please log in again.");
      console.error("Seller ID is undefined. Check authData and localStorage.");
    }
  }, [authData, sellerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!sellerId) {
      setError("Seller ID is not available. Cannot add product.");
      setLoading(false);
      return;
    }

    if (formData.price < 0 || formData.stock < 0) {
      setError("Price and stock must be non-negative values.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/products/${sellerId}`,
        formData,
        console.log(response.data),
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Product added successfully!");
      navigate("/sellerdashboard");
    } catch (error) {
      const backendError =
        error.response?.data?.detail || "Failed to add product.";
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Product</h2>
      <div className="card p-4 shadow">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
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
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image_url" // Consistent with backend
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading || !sellerId}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
