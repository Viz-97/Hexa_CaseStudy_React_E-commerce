// SellerDashboard.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { AuthContext } from "../context/AuthContext";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  // Fallback to localStorage if authData is not available
  const sellerId = authData?.sellerId || localStorage.getItem("sellerId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (sellerId) {
          const response = await axios.get(
            `http://127.0.0.1:8000/products/seller/${sellerId}`
          );
          setProducts(response.data);
          console.log("Fetched products for seller:", sellerId);
        } else {
          setError("Seller ID not found. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        setError("No Products availabe in this store");
        console.error("Error fetching seller products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sellerId]);

  const handleAddProduct = () => {
    if (sellerId) {
      navigate(`/add-product/${sellerId}`);
    } else {
      alert("Seller ID not found. Please log in again.");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Seller Dashboard</h2>
        <LogoutButton />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleAddProduct}>
        Add Product
      </button>

      <div className="card p-4 shadow">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products added yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
