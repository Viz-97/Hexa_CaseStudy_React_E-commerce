import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showCartButton, setShowCartButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/cart/${userId}`)
        .then((response) => {
          setCartCount(response.data.length);
          setShowCartButton(response.data.length > 0);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  const handleAddToCart = async (productId, quantity = 1) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/cart/${userId}`, {
        product_id: productId,
        quantity,
      });

      setCartCount((prev) => prev + 1);
      setShowCartButton(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container-fluid bg-gradient min-vh-100 py-4"
      style={{ background: "linear-gradient(to right, #1e3c72, #2a5298)" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 px-3 text-white">
        <h1
          className="fw-bold text-black"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
        >
          User Dashboard
        </h1>
        <div>
          <LogoutButton />
          {showCartButton && (
            <button
              className="btn btn-warning ms-3 position-relative shadow-lg rounded-pill px-4 py-2"
              onClick={() => navigate("/cart/:userId")}
            >
              🛒 Cart{" "}
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="input-group mb-4 w-50 mx-auto shadow-sm rounded-pill overflow-hidden">
        <input
          type="text"
          className="form-control border-0 px-4"
          placeholder="🔍 Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text bg-primary text-white border-0 px-4">
          Search
        </span>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <img
                  src={product.image_url}
                  className="card-img-top rounded-top-4"
                  alt={product.name}
                  style={{ height: "250px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column bg-white">
                  <h5 className="card-title text-primary fw-bold">
                    {product.name}
                  </h5>
                  <p className="card-text text-secondary">
                    {product.description}
                  </p>
                  <p className="fw-bold text-dark">
                    💰 Price: ₹{product.price}
                  </p>
                  <button
                    className="btn btn-success mt-auto shadow-sm rounded-pill px-4 py-2"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    ➕ Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-muted">No products available.</h2>
        )}
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5 w-100">
        <p className="mb-0">&copy; 2024 E-commerce | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
