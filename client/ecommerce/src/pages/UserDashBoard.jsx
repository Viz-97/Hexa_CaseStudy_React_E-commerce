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
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">All Products</h2>
        <div>
          <LogoutButton />
          {showCartButton && (
            <button
              className="btn btn-warning ms-3 position-relative"
              onClick={() => navigate("/cart/:userId")}
            >
              🛒 Cart{" "}
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text bg-primary text-white">Search</span>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center">No products available.</h2>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
