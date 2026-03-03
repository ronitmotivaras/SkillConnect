import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SKILL_FILTERS = [
  "All",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX",
  "Flutter",
  "DevOps",
  "Data Science",
];

export default function FindMentors() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sending, setSending] = useState({});
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const fetchMentors = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filter !== "All") params.skill = filter;
      const { data } = await axios.get("/api/mentors", { params });
      if (data.success) setMentors(data.mentors);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [search, filter]);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const sendRequest = async (mentorId) => {
    setSending((p) => ({ ...p, [mentorId]: true }));
    try {
      const { data } = await axios.post("/api/mentors/connect", {
        mentorId,
        message,
      });
      if (data.success) {
        showToast("✅ Connection request sent!");
        setModal(null);
        setMessage("");
        fetchMentors();
      } else {
        showToast("⚠️ " + data.message);
      }
    } catch (err) {
      showToast(
        "❌ " + (err.response?.data?.message || "Error sending request"),
      );
    }
    setSending((p) => ({ ...p, [mentorId]: false }));
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const getStatusBtn = (mentor) => {
    const st = mentor.connectionStatus;
    if (st === "pending")
      return { label: "⏳ Pending", disabled: true, color: "#f59e0b" };
    if (st === "accepted")
      return { label: "✅ Connected", disabled: true, color: "#34d399" };
    if (st === "rejected")
      return { label: "🔄 Re-request", disabled: false, color: "#c9a84c" };
    return { label: "🤝 Connect", disabled: false, color: "#c9a84c" };
  };

  const avatarColors = [
    "#c9a84c",
    "#60a5fa",
    "#34d399",
    "#f472b6",
    "#a78bfa",
    "#fb923c",
  ];

  return (
    <div style={s.page}>
      {/* ── Sidebar ─────────────────────────────── */}
      <aside style={s.sidebar}>
        <div style={s.brand}>⚡ SkillConnect</div>
        <nav style={s.nav}>
          {[
            { icon: "🏠", label: "Dashboard", path: "/learner/dashboard" },
            {
              icon: "🔍",
              label: "Find Mentors",
              path: "/learner/find-mentors",
              active: true,
            },
            { icon: "❓", label: "My Doubts", path: "#" },
            { icon: "📅", label: "Meetings", path: "#" },
            { icon: "👥", label: "Community", path: "#" },
            { icon: "⚙️", label: "Settings", path: "#" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ ...s.navItem, ...(item.active ? s.navActive : {}) }}
              onClick={() => item.path !== "#" && navigate(item.path)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={s.sidebarUser}>
          <div style={s.sidebarAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div style={s.sidebarName}>{user?.name}</div>
            <div style={s.sidebarRole}>🎓 Learner</div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main style={s.main}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>🔍 Find a Mentor</h1>
            <p style={s.sub}>
              Connect with expert mentors and accelerate your learning
            </p>
          </div>
          <button
            style={s.backBtn}
            onClick={() => navigate("/learner/dashboard")}
          >
            ← Back
          </button>
        </div>

        {/* Search */}
        <div style={s.searchRow}>
          <div style={s.searchBox}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button style={s.clearBtn} onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
          <div style={s.filterCount}>
            {mentors.length} mentor{mentors.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Skill Filters */}
        <div style={s.filterRow}>
          {SKILL_FILTERS.map((sk) => (
            <button
              key={sk}
              style={{
                ...s.filterChip,
                ...(filter === sk ? s.filterChipActive : {}),
              }}
              onClick={() => setFilter(sk)}
            >
              {sk}
            </button>
          ))}
        </div>

        {/* Mentor Cards */}
        {loading ? (
          <div style={s.emptyState}>
            <div style={s.spinner} />
            <p style={{ color: "#8a8a9a" }}>Loading mentors...</p>
          </div>
        ) : mentors.length === 0 ? (
          <div style={s.emptyState}>
            <div style={{ fontSize: "3rem" }}>🔍</div>
            <p style={{ color: "#8a8a9a", marginTop: "1rem" }}>
              No mentors found. Try a different search.
            </p>
          </div>
        ) : (
          <div style={s.grid}>
            {mentors.map((mentor, i) => {
              const btn = getStatusBtn(mentor);
              const color = avatarColors[i % avatarColors.length];
              return (
                <div key={mentor._id} style={s.card}>
                  {/* Card Top */}
                  <div style={s.cardTop}>
                    <div style={{ ...s.avatar, background: color }}>
                      {mentor.name?.[0]?.toUpperCase()}
                    </div>
                    <div style={s.cardInfo}>
                      <h3 style={s.mentorName}>{mentor.name}</h3>
                      <div style={s.metaRow}>
                        <span style={s.exp}>
                          💼 {mentor.experience || "N/A"}
                        </span>
                        <span style={s.rating}>⭐ {mentor.rating || "—"}</span>
                        <span style={s.sessions}>
                          📅 {mentor.totalSessions || 0} sessions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={s.bio}>
                    {mentor.bio || "Passionate mentor ready to help you grow."}
                  </p>

                  {/* Skills */}
                  <div style={s.skillsRow}>
                    {(mentor.skills || []).map((sk) => (
                      <span key={sk} style={s.skillChip}>
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* Connect Button */}
                  <button
                    style={{
                      ...s.connectBtn,
                      background: btn.disabled
                        ? "transparent"
                        : "linear-gradient(135deg,#c9a84c,#a0772e)",
                      color: btn.disabled ? btn.color : "#0a0a14",
                      border: btn.disabled ? `1px solid ${btn.color}` : "none",
                      cursor: btn.disabled ? "default" : "pointer",
                      opacity: sending[mentor._id] ? 0.7 : 1,
                    }}
                    disabled={btn.disabled || sending[mentor._id]}
                    onClick={() => {
                      if (!btn.disabled) setModal(mentor);
                    }}
                  >
                    {sending[mentor._id] ? "Sending…" : btn.label}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Connect Modal ───────────────────────── */}
      {modal && (
        <div style={s.overlay} onClick={() => setModal(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={s.modalTitle}>Send Connection Request</h3>
            <p style={s.modalSub}>
              to <span style={{ color: "#c9a84c" }}>{modal.name}</span>
            </p>
            <textarea
              style={s.textarea}
              placeholder="Write a short message (optional)... e.g. Hi! I'm learning React and would love your guidance."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              rows={4}
            />
            <div style={s.charCount}>{message.length}/200</div>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setModal(null)}>
                Cancel
              </button>
              <button
                style={{
                  ...s.sendBtn,
                  opacity: sending[modal._id] ? 0.7 : 1,
                  cursor: sending[modal._id] ? "default" : "pointer",
                }}
                disabled={sending[modal._id]}
                onClick={() => sendRequest(modal._id)}
              >
                {sending[modal._id] ? "Sending…" : "🤝 Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ───────────────────────────────── */}
      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#080810",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#e8e4dc",
  },
  sidebar: {
    width: "240px",
    background: "#0e0e1c",
    borderRight: "1px solid rgba(201,168,76,0.12)",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 0",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  brand: {
    color: "#c9a84c",
    fontSize: "1.3rem",
    fontWeight: "700",
    padding: "0 1.5rem",
    marginBottom: "2rem",
    letterSpacing: "1px",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    padding: "0 0.75rem",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.7rem 0.75rem",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#8a8a9a",
    fontSize: "0.9rem",
  },
  navActive: {
    background: "rgba(201,168,76,0.1)",
    color: "#c9a84c",
    border: "1px solid rgba(201,168,76,0.2)",
  },
  sidebarUser: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem 1.5rem",
    borderTop: "1px solid rgba(201,168,76,0.12)",
  },
  sidebarAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#c9a84c,#a0772e)",
    color: "#0a0a14",
    fontWeight: "700",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarName: { color: "#e8e4dc", fontSize: "0.85rem", fontWeight: "600" },
  sidebarRole: { color: "#8a8a9a", fontSize: "0.75rem" },

  main: { flex: 1, padding: "2rem", overflowY: "auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  title: {
    color: "#e8e4dc",
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "0.25rem",
  },
  sub: { color: "#8a8a9a", fontSize: "0.875rem" },
  backBtn: {
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.875rem",
  },

  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "10px",
    padding: "0.7rem 1rem",
  },
  searchIcon: { fontSize: "1rem", color: "#8a8a9a" },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: "#e8e4dc",
    fontSize: "0.95rem",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#8a8a9a",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  filterCount: { color: "#8a8a9a", fontSize: "0.85rem", whiteSpace: "nowrap" },

  filterRow: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  filterChip: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.15)",
    color: "#8a8a9a",
    borderRadius: "20px",
    padding: "0.35rem 0.85rem",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  filterChipActive: {
    background: "rgba(201,168,76,0.12)",
    border: "1px solid #c9a84c",
    color: "#c9a84c",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "1.25rem",
  },
  card: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: "14px",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    transition: "transform 0.2s",
  },
  cardTop: { display: "flex", gap: "0.85rem", alignItems: "flex-start" },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    color: "#0a0a14",
    fontWeight: "700",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardInfo: { flex: 1 },
  mentorName: {
    color: "#e8e4dc",
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "0.35rem",
  },
  metaRow: { display: "flex", gap: "0.75rem", flexWrap: "wrap" },
  exp: { color: "#8a8a9a", fontSize: "0.75rem" },
  rating: { color: "#c9a84c", fontSize: "0.75rem", fontWeight: "600" },
  sessions: { color: "#8a8a9a", fontSize: "0.75rem" },
  bio: {
    color: "#9a9aaa",
    fontSize: "0.82rem",
    lineHeight: "1.5",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  skillsRow: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
  skillChip: {
    background: "rgba(96,165,250,0.08)",
    border: "1px solid rgba(96,165,250,0.2)",
    color: "#60a5fa",
    borderRadius: "4px",
    padding: "0.2rem 0.55rem",
    fontSize: "0.72rem",
  },
  connectBtn: {
    width: "100%",
    borderRadius: "8px",
    padding: "0.65rem",
    fontSize: "0.875rem",
    fontWeight: "700",
    marginTop: "auto",
    transition: "opacity 0.2s",
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem",
    color: "#8a8a9a",
  },
  spinner: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "3px solid rgba(201,168,76,0.2)",
    borderTopColor: "#c9a84c",
    animation: "spin 0.8s linear infinite",
    marginBottom: "1rem",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  modal: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.25)",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  modalTitle: {
    color: "#e8e4dc",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "0.4rem",
  },
  modalSub: { color: "#8a8a9a", fontSize: "0.875rem", marginBottom: "1.25rem" },
  textarea: {
    width: "100%",
    background: "#191928",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "8px",
    padding: "0.75rem",
    color: "#e8e4dc",
    fontSize: "0.875rem",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  charCount: {
    color: "#6a6a7a",
    fontSize: "0.75rem",
    textAlign: "right",
    marginTop: "0.25rem",
  },
  modalActions: { display: "flex", gap: "0.75rem", marginTop: "1.25rem" },
  cancelBtn: {
    flex: 1,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#8a8a9a",
    borderRadius: "8px",
    padding: "0.7rem",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  sendBtn: {
    flex: 2,
    background: "linear-gradient(135deg,#c9a84c,#a0772e)",
    border: "none",
    color: "#0a0a14",
    borderRadius: "8px",
    padding: "0.7rem",
    fontSize: "0.875rem",
    fontWeight: "700",
  },

  toast: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    background: "#191928",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#e8e4dc",
    padding: "0.85rem 1.25rem",
    borderRadius: "10px",
    fontSize: "0.875rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    zIndex: 300,
  },
};
