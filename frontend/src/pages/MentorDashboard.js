import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    id: 1,
    icon: "👨‍🎓",
    title: "My Learners",
    desc: "View and manage learners connected to you",
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.08)",
    border: "rgba(201,168,76,0.25)",
    tag: "Manage",
  },
  {
    id: 2,
    icon: "💡",
    title: "Answer Doubts",
    desc: "Browse unanswered questions from learners",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
    tag: "Help",
  },
  {
    id: 3,
    icon: "📅",
    title: "Manage Meetings",
    desc: "Accept or reschedule your session requests",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
    tag: "Sessions",
  },
  {
    id: 4,
    icon: "👥",
    title: "My Community",
    desc: "Manage groups and communities you lead",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.25)",
    tag: "Social",
  },
];

const stats = [
  { label: "Total Learners", value: "0", icon: "👨‍🎓" },
  { label: "Doubts Answered", value: "0", icon: "💡" },
  { label: "Sessions Done", value: "0", icon: "📅" },
  { label: "Avg Rating", value: "—", icon: "⭐" },
];

const pendingRequests = [
  { name: "Ankit Verma", topic: "React Hooks", time: "2 hrs ago", avatar: "A" },
  {
    name: "Sneha Gupta",
    topic: "Node.js REST API",
    time: "5 hrs ago",
    avatar: "S",
  },
  {
    name: "Karan Singh",
    topic: "MongoDB Aggregation",
    time: "1 day ago",
    avatar: "K",
  },
];

const upcomingSessions = [
  {
    name: "Riya Patel",
    topic: "DSA Revision",
    date: "Today, 4:00 PM",
    avatar: "R",
    status: "confirmed",
  },
  {
    name: "Dev Mehta",
    topic: "System Design",
    date: "Tomorrow, 10:00 AM",
    avatar: "D",
    status: "pending",
  },
  {
    name: "Pooja Shah",
    topic: "JavaScript ES6",
    date: "Mar 6, 2:00 PM",
    avatar: "P",
    status: "confirmed",
  },
];

const recentDoubts = [
  {
    question: "How does useEffect cleanup work in React?",
    askedBy: "Ankit V.",
    time: "1 hr ago",
    tags: ["React"],
  },
  {
    question: "Difference between SQL and NoSQL databases?",
    askedBy: "Meera K.",
    time: "3 hrs ago",
    tags: ["Database"],
  },
  {
    question: "What is JWT and how does it work?",
    askedBy: "Rohit S.",
    time: "6 hrs ago",
    tags: ["Auth", "Security"],
  },
];

export default function MentorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div style={s.page}>
      {/* ── Sidebar ─────────────────────────────── */}
      <aside style={s.sidebar}>
        <div style={s.sidebarBrand}>⚡ SkillConnect</div>

        <div style={s.roleChip}>🏆 Mentor</div>

        <nav style={s.nav}>
          {[
            { icon: "🏠", label: "Dashboard" },
            { icon: "👨‍🎓", label: "My Learners" },
            { icon: "💡", label: "Answer Doubts" },
            { icon: "📅", label: "Meetings" },
            { icon: "👥", label: "Community" },
            { icon: "📊", label: "Analytics" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                ...s.navItem,
                ...(activeNav === item.label ? s.navItemActive : {}),
              }}
              onClick={() => setActiveNav(item.label)}
            >
              <span style={s.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={s.sidebarUser}>
          <div style={s.sidebarAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div style={s.sidebarName}>{user?.name}</div>
            <div style={s.sidebarRole}>🏆 Mentor</div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────── */}
      <main style={s.main}>
        {/* Topbar */}
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>
              {greeting()}, {user?.name?.split(" ")[0]}! 🏆
            </h1>
            <p style={s.pageSub}>
              Manage your learners, sessions and community
            </p>
          </div>
          <div style={s.topbarRight}>
            <div style={s.notifBtn}>
              🔔
              <span style={s.notifDot} />
            </div>
            <div style={s.avatarBtn} onClick={() => setMenuOpen(!menuOpen)}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            {menuOpen && (
              <div style={s.dropdown}>
                <div style={s.dropdownItem}>👤 My Profile</div>
                <div style={s.dropdownItem}>⚙️ Settings</div>
                <div style={s.dropdownDivider} />
                <div
                  style={{ ...s.dropdownItem, color: "#fca5a5" }}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div style={s.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} style={s.statCard}>
              <span style={s.statIcon}>{stat.icon}</span>
              <span style={s.statValue}>{stat.value}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={s.sectionTitle}>Quick Actions</h2>
        <div style={s.actionsGrid}>
          {quickActions.map((action) => (
            <div
              key={action.id}
              style={{
                ...s.actionCard,
                background: action.bg,
                border: `1px solid ${action.border}`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={s.actionTop}>
                <span style={s.actionIcon}>{action.icon}</span>
                <span
                  style={{
                    ...s.actionTag,
                    color: action.color,
                    background: action.bg,
                    border: `1px solid ${action.border}`,
                  }}
                >
                  {action.tag}
                </span>
              </div>
              <h3 style={{ ...s.actionTitle, color: action.color }}>
                {action.title}
              </h3>
              <p style={s.actionDesc}>{action.desc}</p>
              <button style={{ ...s.actionBtn, background: action.color }}>
                Open →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom 3-column grid */}
        <div style={s.bottomGrid}>
          {/* Connection Requests */}
          <div style={s.panel}>
            <div style={s.panelHeader}>
              <h2 style={s.sectionTitle}>📨 Connection Requests</h2>
              <span style={s.badge}>{pendingRequests.length}</span>
            </div>
            {pendingRequests.map((req) => (
              <div key={req.name} style={s.reqRow}>
                <div style={s.reqAvatar}>{req.avatar}</div>
                <div style={s.reqInfo}>
                  <div style={s.reqName}>{req.name}</div>
                  <div style={s.reqTopic}>{req.topic}</div>
                  <div style={s.reqTime}>{req.time}</div>
                </div>
                <div style={s.reqActions}>
                  <button style={s.acceptBtn}>✓</button>
                  <button style={s.rejectBtn}>✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Sessions */}
          <div style={s.panel}>
            <div style={s.panelHeader}>
              <h2 style={s.sectionTitle}>📅 Upcoming Sessions</h2>
              <button style={s.viewAll}>View All</button>
            </div>
            {upcomingSessions.map((session) => (
              <div key={session.name} style={s.sessionRow}>
                <div style={s.sessionAvatar}>{session.avatar}</div>
                <div style={s.sessionInfo}>
                  <div style={s.sessionName}>{session.name}</div>
                  <div style={s.sessionTopic}>{session.topic}</div>
                  <div style={s.sessionDate}>🕐 {session.date}</div>
                </div>
                <div
                  style={{
                    ...s.statusChip,
                    ...(session.status === "confirmed"
                      ? s.statusConfirmed
                      : s.statusPending),
                  }}
                >
                  {session.status === "confirmed"
                    ? "✓ Confirmed"
                    : "⏳ Pending"}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Doubts */}
          <div style={s.panel}>
            <div style={s.panelHeader}>
              <h2 style={s.sectionTitle}>💡 Recent Doubts</h2>
              <button style={s.viewAll}>Answer All</button>
            </div>
            {recentDoubts.map((doubt) => (
              <div key={doubt.question} style={s.doubtRow}>
                <p style={s.doubtQ}>{doubt.question}</p>
                <div style={s.doubtMeta}>
                  <span style={s.doubtAuthor}>by {doubt.askedBy}</span>
                  <span style={s.doubtTime}>{doubt.time}</span>
                </div>
                <div style={s.doubtTags}>
                  {doubt.tags.map((tag) => (
                    <span key={tag} style={s.doubtTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button style={s.answerBtn}>Answer →</button>
              </div>
            ))}
          </div>
        </div>
      </main>
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

  // Sidebar
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#0e0e1c",
    borderRight: "1px solid rgba(201,168,76,0.12)",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 0",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarBrand: {
    color: "#c9a84c",
    fontSize: "1.3rem",
    fontWeight: "700",
    padding: "0 1.5rem",
    marginBottom: "0.75rem",
    letterSpacing: "1px",
  },
  roleChip: {
    margin: "0 1.5rem 1.5rem",
    background: "rgba(201,168,76,0.1)",
    border: "1px solid rgba(201,168,76,0.25)",
    color: "#c9a84c",
    borderRadius: "20px",
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    display: "inline-block",
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
    transition: "all 0.2s",
  },
  navItemActive: {
    background: "rgba(201,168,76,0.1)",
    color: "#c9a84c",
    border: "1px solid rgba(201,168,76,0.2)",
  },
  navIcon: { fontSize: "1rem", width: "20px", textAlign: "center" },
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

  // Main
  main: { flex: 1, padding: "2rem", overflowY: "auto" },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2rem",
  },
  pageTitle: {
    color: "#e8e4dc",
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "0.25rem",
  },
  pageSub: { color: "#8a8a9a", fontSize: "0.875rem" },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "relative",
  },
  notifBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#191928",
    border: "1px solid rgba(201,168,76,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1rem",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#ef4444",
  },
  avatarBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#c9a84c,#a0772e)",
    color: "#0a0a14",
    fontWeight: "700",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "48px",
    right: 0,
    background: "#191928",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "10px",
    padding: "0.5rem",
    minWidth: "160px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    zIndex: 100,
  },
  dropdownItem: {
    padding: "0.6rem 0.75rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#e8e4dc",
  },
  dropdownDivider: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    margin: "0.3rem 0",
  },

  // Stats
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: "12px",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
  },
  statIcon: { fontSize: "1.5rem" },
  statValue: { color: "#c9a84c", fontSize: "1.6rem", fontWeight: "700" },
  statLabel: { color: "#8a8a9a", fontSize: "0.78rem", textAlign: "center" },

  // Actions
  sectionTitle: {
    color: "#e8e4dc",
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  actionCard: {
    borderRadius: "14px",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  actionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionIcon: { fontSize: "1.8rem" },
  actionTag: {
    fontSize: "0.7rem",
    fontWeight: "600",
    padding: "0.2rem 0.5rem",
    borderRadius: "20px",
    letterSpacing: "0.5px",
  },
  actionTitle: { fontSize: "1rem", fontWeight: "700", margin: 0 },
  actionDesc: {
    color: "#8a8a9a",
    fontSize: "0.8rem",
    lineHeight: "1.4",
    flex: 1,
  },
  actionBtn: {
    border: "none",
    color: "#0a0a14",
    borderRadius: "6px",
    padding: "0.5rem 0.75rem",
    fontSize: "0.8rem",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "0.5rem",
    alignSelf: "flex-start",
  },

  // Bottom grid
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "1.5rem",
  },
  panel: {
    background: "#11111e",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: "14px",
    padding: "1.25rem",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  badge: {
    background: "#ef4444",
    color: "#fff",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "700",
  },
  viewAll: {
    background: "none",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    borderRadius: "6px",
    padding: "0.3rem 0.75rem",
    fontSize: "0.78rem",
    cursor: "pointer",
  },

  // Requests
  reqRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  reqAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    flexShrink: 0,
    background: "linear-gradient(135deg,#60a5fa,#3b82f6)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reqInfo: { flex: 1 },
  reqName: { color: "#e8e4dc", fontSize: "0.85rem", fontWeight: "600" },
  reqTopic: { color: "#8a8a9a", fontSize: "0.75rem" },
  reqTime: { color: "#6a6a7a", fontSize: "0.7rem" },
  reqActions: { display: "flex", gap: "0.4rem" },
  acceptBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(52,211,153,0.15)",
    border: "1px solid rgba(52,211,153,0.4)",
    color: "#34d399",
    cursor: "pointer",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rejectBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#fca5a5",
    cursor: "pointer",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Sessions
  sessionRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  sessionAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    flexShrink: 0,
    background: "linear-gradient(135deg,#f472b6,#db2777)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionInfo: { flex: 1 },
  sessionName: { color: "#e8e4dc", fontSize: "0.85rem", fontWeight: "600" },
  sessionTopic: { color: "#8a8a9a", fontSize: "0.75rem" },
  sessionDate: { color: "#6a6a7a", fontSize: "0.72rem", marginTop: "0.15rem" },
  statusChip: {
    fontSize: "0.72rem",
    fontWeight: "600",
    padding: "0.25rem 0.6rem",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  statusConfirmed: {
    background: "rgba(52,211,153,0.12)",
    border: "1px solid rgba(52,211,153,0.3)",
    color: "#34d399",
  },
  statusPending: {
    background: "rgba(245,158,11,0.12)",
    border: "1px solid rgba(245,158,11,0.3)",
    color: "#f59e0b",
  },

  // Doubts
  doubtRow: {
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  doubtQ: {
    color: "#e8e4dc",
    fontSize: "0.83rem",
    lineHeight: "1.4",
    margin: 0,
  },
  doubtMeta: { display: "flex", gap: "0.75rem" },
  doubtAuthor: { color: "#c9a84c", fontSize: "0.72rem", fontWeight: "600" },
  doubtTime: { color: "#6a6a7a", fontSize: "0.72rem" },
  doubtTags: { display: "flex", gap: "0.4rem", flexWrap: "wrap" },
  doubtTag: {
    background: "rgba(96,165,250,0.1)",
    border: "1px solid rgba(96,165,250,0.25)",
    color: "#60a5fa",
    borderRadius: "4px",
    padding: "0.15rem 0.5rem",
    fontSize: "0.7rem",
  },
  answerBtn: {
    background: "rgba(96,165,250,0.1)",
    border: "1px solid rgba(96,165,250,0.25)",
    color: "#60a5fa",
    borderRadius: "6px",
    padding: "0.3rem 0.65rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};
