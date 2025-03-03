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
        setError("No Products available in this store");
        console.error("Error fetching seller products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sellerId, navigate]);

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Seller Dashboard</h2>
        <LogoutButton />
      </div>

      <button
        className="btn btn-success mb-3 shadow-sm"
        onClick={handleAddProduct}
      >
        ➕ Add Product
      </button>

      <div className="card p-4 shadow-lg border-0 rounded">
        {loading ? (
          <p className="text-center fw-bold text-secondary">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-center text-danger fw-bold">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-warning fw-bold">
            No products added yet.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
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
                  <tr key={product.id} className="align-middle">
                    <td>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="rounded border"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="fw-bold">{product.name}</td>
                    <td>{product.description}</td>
                    <td className="text-success fw-bold">${product.price}</td>
                    <td className="text-uppercase text-primary fw-semibold">
                      {product.category}
                    </td>
                    <td
                      className={
                        product.stock > 0
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {product.stock > 0 ? product.stock : "Out of Stock"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
