import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchCartItems();
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      setError("Failed to fetch cart items");
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }

    if (newQuantity > item.product.stock) {
      alert(`Only ${item.product.stock} items available in stock.`);
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/cart/${userId}/${itemId}?quantity=${newQuantity}`
      );
      fetchCartItems();
    } catch (error) {
      setError("Failed to update item quantity");
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/${userId}/${itemId}`);
      fetchCartItems();
    } catch (error) {
      setError("Failed to remove item from cart");
      console.error("Error removing cart item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleCheckout = async () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address.");
      return;
    }

    // Stock validation before placing order
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        alert(
          `Not enough stock for ${item.product_name}. Available: ${item.product.stock}`
        );
        return;
      }
    }

    const orderData = {
      user_id: userId,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.product?.price || 0,
      })),
      total_amount: calculateTotal(),
    };

    try {
      await axios.post(`http://127.0.0.1:8000/orders/${userId}`, orderData);
      alert("Order placed successfully!");
      setOrderPlaced(true);
      setTimeout(() => navigate("/userdashboard"), 1000);
    } catch (error) {
      setError("Failed to complete checkout.");
      console.error("Error during checkout:", error);
    }
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Shopping Cart</h2>
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/userdashboard")}
      >
        ← Back to Dashboard
      </button>
      {cartItems.length === 0 ? (
        <p className="alert alert-warning">Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={item.product.stock}
                        className="form-control w-50 mx-auto"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>{item.product.stock}</td>
                    <td className="text-success">
                      ₹{item.product?.price ?? 0}
                    </td>
                    <td className="text-success">
                      ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className="text-end text-info">Total: ₹{calculateTotal()}</h4>
          <div className="border p-3 rounded shadow-sm bg-light">
            <h5>Shipping Details</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            <h5>Payment Method</h5>
            <select
              className="form-control mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <button className="btn btn-primary w-100" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            {orderPlaced && (
              <div className="alert alert-success mt-3">
                Your order has been placed successfully!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
