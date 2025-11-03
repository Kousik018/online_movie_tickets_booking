// src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hide toast messages after a certain amount of time
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000); // 3 seconds for the toast message
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a login check with localStorage or any other logic
    setTimeout(() => {
      setLoading(false);

      // For this example, we're storing the "user" in localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({ email, password }));

        setToast({
          show: true,
          message: "Login successful! Redirecting...",
          type: "success",
        });

        // Reset form fields
        setEmail("");
        setPassword("");

        // After success, redirect to home or dashboard
        setTimeout(() => navigate("/"), 1500);
      } else {
        setToast({
          show: true,
          message: "Invalid credentials. Please try again.",
          type: "danger",
        });
      }
    }, 1000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-2"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0c10 0%, #1f2833 100%)",
        color: "#ffffff",
      }}
    >
      <div
        className="p-4 rounded shadow-lg"
        style={{
          background: "#ffffff",
          minWidth: 380,
          borderRadius: "10px",
          color: "#0b0c10",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ color: "#007bff", letterSpacing: "1px" }}
        >
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-primary">Email</label>
            <input
              type="email"
              className="form-control border-primary-subtle"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-primary">Password</label>
            <input
              type="password"
              className="form-control border-primary-subtle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mt-2"
            disabled={loading}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              border: "none",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Toast message for feedback */}
        {toast.show && (
          <div
            className={`toast show align-items-center text-bg-${toast.type} border-0 mt-3 w-100`}
            style={{ zIndex: 999 }}
          >
            <div className="d-flex">
              <div className="toast-body text-center fw-bold">
                {toast.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
