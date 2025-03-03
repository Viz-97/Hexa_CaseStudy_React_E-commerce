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
    image_url: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  const sellerId = authData?.sellerId || localStorage.getItem("sellerId");

  useEffect(() => {
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
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data);
      alert("Product added successfully!");
      navigate("/sellerdashboard");
    } catch (error) {
      const backendError =
        error.response?.data?.detail ||
        "Failed to add product. Please try again.";
      setError(backendError);
      console.error("Error:", backendError);
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
              name="image_url"
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
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
