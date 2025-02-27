import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-gradient">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-dark" href="#">
            E-Commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="btn btn-outline-primary me-2 btn-custom"
                  href="/login"
                >
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary btn-custom" href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-5 text-center bg-hero shadow-sm">
        <div className="container">
          <h1 className="display-5 fw-bold text-dark">
            Welcome to Our E-Commerce Store
          </h1>
          <p className="lead text-muted mb-4">
            Shop the best products at the best prices
          </p>
          <a
            href="/login"
            className="btn btn-primary btn-lg shadow-sm btn-custom"
          >
            Start Shopping
          </a>
        </div>
      </header>

      {/* Features Section */}
      <main className="container py-5 flex-grow-1">
        <h2 className="text-center mb-5 fw-bold text-dark">
          Why Shop With Us?
        </h2>
        <div className="row g-4">
          {[
            {
              title: "Wide Variety",
              desc: "Explore a huge range of categories and brands.",
            },
            {
              title: "Best Prices",
              desc: "Get amazing discounts and deals on all products.",
            },
            {
              title: "Fast Delivery",
              desc: "Quick and reliable shipping on all orders.",
            },
          ].map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0 h-100 text-center bg-feature shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-dark fw-semibold">
                    {feature.title}
                  </h3>
                  <p className="card-text text-muted">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-footer text-black py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-0">
            &copy; 2025 E-Commerce Store. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>
        {`
          /* Background Gradients with Pale Colors */
          .bg-gradient {
            background: linear-gradient(135deg, #f7e9e3, #e3f2fd);
          }
          .bg-hero {
            background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
          }
          .bg-feature {
            background: linear-gradient(135deg, #fce4ec, #e8f5e9);
          }
          .bg-footer {
            background: linear-gradient(135deg, #d1c4e9, #bbdefb);
          }

          body {
            background-color: #f8f9fa;
          }

          h1, h2 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          /* Button Customization */
          .btn-custom {
            border-radius: 8px;
            padding: 10px 20px;
            font-weight: bold;
          }

          .btn-primary:hover, .btn-outline-primary:hover {
            background-color: #0056b3;
            border-color: #004085;
            transition: background-color 0.3s, border-color 0.3s;
          }

          /* Card Hover Effect */
          .card:hover {
            transform: translateY(-5px);
            transition: transform 0.2s ease;
          }

          /* Navbar shadow */
          .navbar {
            transition: box-shadow 0.2s;
          }

          .navbar-light.bg-white {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
