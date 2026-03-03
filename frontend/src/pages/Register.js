import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.length < 2) e.name = "Minimum 2 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.role) e.role = "Please select a role";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErr("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await register(form);
      if (res.success) {
        navigate(
          res.user.role === "mentor"
            ? "/mentor/dashboard"
            : "/learner/dashboard",
        );
      } else setApiErr(res.message || "Registration failed");
    } catch (err) {
      setApiErr(
        err.response?.data?.errors?.[0]?.msg ||
          err.response?.data?.message ||
          "Something went wrong",
      );
    }
    setLoading(false);
  };

  const strength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "#ef4444", pct: "25%" };
    if (p.length < 10) return { label: "Fair", color: "#f59e0b", pct: "55%" };
    if (p.length < 14) return { label: "Good", color: "#10b981", pct: "80%" };
    return { label: "Strong", color: "#6ee7b7", pct: "100%" };
  };
  const pw = strength();

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.brand}>⚡ SkillConnect</div>
        <h2 style={s.title}>Create your account</h2>
        <p style={s.sub}>Join thousands of learners and mentors</p>

        {apiErr && <div style={s.errorBox}>{apiErr}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={s.field}>
            <label style={s.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }}
            />
            {errors.name && <span style={s.err}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{ ...s.input, ...(errors.email ? s.inputErr : {}) }}
            />
            {errors.email && <span style={s.err}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputRow}>
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                style={{
                  ...s.input,
                  paddingRight: "3rem",
                  ...(errors.password ? s.inputErr : {}),
                }}
              />
              <button
                type="button"
                style={s.eye}
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
            {pw && (
              <div style={s.strengthWrap}>
                <div
                  style={{
                    ...s.strengthBar,
                    width: pw.pct,
                    background: pw.color,
                  }}
                />
                <span style={{ ...s.strengthLabel, color: pw.color }}>
                  {pw.label}
                </span>
              </div>
            )}
            {errors.password && <span style={s.err}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <div style={s.inputRow}>
              <input
                type={showConf ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                style={{
                  ...s.input,
                  paddingRight: "3rem",
                  ...(errors.confirmPassword ? s.inputErr : {}),
                }}
              />
              <button
                type="button"
                style={s.eye}
                onClick={() => setShowConf(!showConf)}
              >
                {showConf ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span style={s.err}>{errors.confirmPassword}</span>
            )}
          </div>

          {/* Role */}
          <div style={s.field}>
            <label style={s.label}>I am joining as a…</label>
            <div style={s.roleRow}>
              {["learner", "mentor"].map((r) => (
                <label
                  key={r}
                  style={{
                    ...s.roleCard,
                    ...(form.role === r ? s.roleCardActive : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={form.role === r}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <span style={s.roleIcon}>
                    {r === "learner" ? "🎓" : "🏆"}
                  </span>
                  <span style={s.roleTitle}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </span>
                  <span style={s.roleDesc}>
                    {r === "learner" ? "Learn new skills" : "Share expertise"}
                  </span>
                </label>
              ))}
            </div>
            {errors.role && <span style={s.err}>{errors.role}</span>}
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p style={s.switchTxt}>
          Already have an account?{" "}
          <Link to="/login" style={s.link}>
            Sign in →
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
    maxWidth: "460px",
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
  inputErr: { border: "1px solid rgba(239,68,68,0.6)" },
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
  err: {
    color: "#fca5a5",
    fontSize: "0.78rem",
    marginTop: "0.3rem",
    display: "block",
  },
  strengthWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.4rem",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "4px",
    height: "6px",
    overflow: "hidden",
    position: "relative",
  },
  strengthBar: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  strengthLabel: {
    fontSize: "0.72rem",
    fontWeight: "600",
    position: "absolute",
    right: "-3rem",
    top: "-1px",
  },
  roleRow: { display: "flex", gap: "0.75rem" },
  roleCard: {
    flex: 1,
    background: "#191928",
    border: "2px solid rgba(201,168,76,0.15)",
    borderRadius: "10px",
    padding: "1rem 0.75rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    transition: "all 0.2s",
  },
  roleCardActive: {
    border: "2px solid #c9a84c",
    background: "rgba(201,168,76,0.08)",
    boxShadow: "0 0 12px rgba(201,168,76,0.2)",
  },
  roleIcon: { fontSize: "1.5rem" },
  roleTitle: { color: "#e8e4dc", fontWeight: "600", fontSize: "0.9rem" },
  roleDesc: { color: "#8a8a9a", fontSize: "0.75rem", textAlign: "center" },
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
