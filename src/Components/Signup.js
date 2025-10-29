import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Hide toast after 2 seconds
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
      if (email && password.length >= 6) {
        setToast({
          show: true,
          message: "Signup successful! Redirecting...",
          type: "success",
        });
        setFname("");
        setLname("");
        setEmail("");
        setPassword("");

        // Redirect to homepage after short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        setToast({
          show: true,
          message: "Password must be at least 6 characters.",
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
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-primary">
              First Name
            </label>
            <input
              type="text"
              className="form-control border-primary-subtle"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-primary">
              Last Name
            </label>
            <input
              type="text"
              className="form-control border-primary-subtle"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label fw-semibold text-primary">
              Password
            </label>
            <input
              type="password"
              className="form-control border-primary-subtle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="At least 6 characters"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Toast Message */}
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

export default Signup;
