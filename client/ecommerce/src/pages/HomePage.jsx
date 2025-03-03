import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="d-flex flex-row min-vh-100 bg-light">
      {/* Left Sidebar */}
      <div
        className="d-flex flex-column bg-primary text-white p-4 shadow-lg position-relative"
        style={{ width: "350px" }}
      >
        <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between">
          <a
            className="btn btn-outline-light rounded-pill px-4 py-2"
            href="/login"
          >
            Log In
          </a>
          <a
            className="btn btn-light text-primary rounded-pill px-4 py-2"
            href="/register"
          >
            Join Now
          </a>
        </div>
        <div className="mt-auto text-center">
          <h2 className="fw-bold">E-commerce</h2>
          <p className="text-white-50">Your trusted shopping hub.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center px-5">
        {/* Hero Section */}
        <div className="text-start w-50">
          <h1 className="display-3 fw-bold text-primary">
            Elevate Your Shopping Experience
          </h1>
          <p className="lead text-muted">
            Handpicked selections, exclusive deals, and seamless transactions.
          </p>
          <a
            href="/login"
            className="btn btn-gradient mt-4 px-5 py-3 rounded-pill fw-semibold"
          >
            Explore Now
          </a>
        </div>

        {/* Features Section */}
        <div className="w-50 d-flex flex-column gap-4">
          {[
            {
              title: "Exclusive Offers",
              desc: "Handpicked deals tailored just for you.",
            },
            {
              title: "Effortless Navigation",
              desc: "Find what you love with ease and speed.",
            },
            {
              title: "Rapid Shipping",
              desc: "Enjoy express deliveries at your convenience.",
            },
          ].map((feature, index) => (
            <div
              className="p-4 shadow-lg rounded-3 bg-white feature-card"
              key={index}
            >
              <h4 className="fw-bold text-primary">{feature.title}</h4>
              <p className="text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-auto w-100 position-fixed bottom-0">
        <p className="mb-0">
          &copy; 2025 E-commerce. Your Trusted Shopping Hub.
        </p>
      </footer>

      {/* Custom Styles */}
      <style>
        {`
          .btn-light:hover {
            background-color: #f8f9fa;
            transition: background-color 0.3s;
          }
          .shadow-lg:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
          .btn-gradient {
            background: linear-gradient(135deg, #007bff, #6610f2);
            color: white;
            border: none;
          }
          .btn-gradient:hover {
            opacity: 0.9;
          }
          .feature-card:hover {
            background: #f8f9fa;
            transition: background 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
