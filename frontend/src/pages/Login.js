import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      if (res.success) {
        navigate(
          res.user.role === "mentor"
            ? "/mentor/dashboard"
            : "/learner/dashboard",
        );
      } else setError(res.message || "Login failed");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.brand}>⚡ SkillConnect</div>
        <h2 style={s.title}>Welcome back</h2>
        <p style={s.sub}>Sign in to continue learning</p>

        {error && <div style={s.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={s.input}
              required
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputRow}>
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{ ...s.input, paddingRight: "3rem" }}
                required
              />
              <button
                type="button"
                style={s.eye}
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={s.switchTxt}>
          No account?{" "}
          <Link to="/register" style={s.link}>
            Create one free →
          </Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#080810",
    padding: "1rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  brand: {
    color: "#c9a84c",
    fontSize: "1.4rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "1.5rem",
    letterSpacing: "1px",
  },
  title: {
    color: "#e8e4dc",
    fontSize: "1.6rem",
    fontWeight: "600",
    textAlign: "center",
  },
  sub: {
    color: "#8a8a9a",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
  },
  errorBox: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.4)",
    color: "#fca5a5",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  field: { marginBottom: "1.2rem" },
  label: {
    display: "block",
    color: "#c9a84c",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "0.4rem",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    background: "#191928",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#e8e4dc",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  inputRow: { position: "relative" },
  eye: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  btn: {
    width: "100%",
    background: "linear-gradient(135deg,#c9a84c,#a0772e)",
    color: "#0a0a14",
    border: "none",
    borderRadius: "8px",
    padding: "0.85rem",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  switchTxt: {
    textAlign: "center",
    color: "#8a8a9a",
    marginTop: "1.2rem",
    fontSize: "0.875rem",
  },
  link: { color: "#c9a84c", textDecoration: "none", fontWeight: "600" },
};
