import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(
        () => setToast({ show: false, message: "", type: "" }),
        2000
      );
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Check localStorage for user
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        setToast({
          show: true,
          message: "Login successful! Redirecting...",
          type: "success",
        });
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setToast({
          show: true,
          message: "Invalid credentials",
          type: "danger",
        });
      }
    }, 1000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
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

export default Login;
