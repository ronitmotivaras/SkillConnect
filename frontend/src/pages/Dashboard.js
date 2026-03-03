import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.brand}>⚡ SkillConnect</div>
        <div style={s.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
        <h2 style={s.name}>Welcome, {user?.name}!</h2>
        <div style={s.roleBadge}>
          {user?.role === "mentor" ? "🏆 Mentor" : "🎓 Learner"}
        </div>
        <p style={s.email}>{user?.email}</p>
        <button style={s.btn} onClick={handleLogout}>
          Sign Out
        </button>
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
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "16px",
    padding: "3rem 2rem",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  brand: {
    color: "#c9a84c",
    fontSize: "1.3rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#c9a84c,#a0772e)",
    color: "#0a0a14",
    fontSize: "1.8rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
  },
  name: {
    color: "#e8e4dc",
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  roleBadge: {
    display: "inline-block",
    padding: "0.3rem 0.9rem",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.3)",
    borderRadius: "20px",
    color: "#c9a84c",
    fontWeight: "600",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  email: { color: "#8a8a9a", fontSize: "0.875rem", marginBottom: "1.5rem" },
  btn: {
    background: "transparent",
    border: "1px solid rgba(239,68,68,0.4)",
    color: "#fca5a5",
    borderRadius: "8px",
    padding: "0.6rem 1.5rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};
