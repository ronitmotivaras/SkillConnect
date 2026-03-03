import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    id: 1,
    icon: "🔍",
    title: "Find a Mentor",
    desc: "Browse expert mentors and send connection requests",
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.08)",
    border: "rgba(201,168,76,0.25)",
    tag: "Explore",
    path: "/learner/find-mentors",
  },
  {
    id: 2,
    icon: "❓",
    title: "Post a Doubt",
    desc: "Ask questions and get answers from mentors & peers",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
    tag: "Community",
    path: "/learner/doubts",
  },
  {
    id: 3,
    icon: "📅",
    title: "Arrange a Meeting",
    desc: "Schedule a 1:1 session with your mentor",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
    tag: "Sessions",
    path: "/learner/meetings",
  },
  {
    id: 4,
    icon: "👥",
    title: "Join Community",
    desc: "Connect with learners sharing your interests",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.25)",
    tag: "Social",
    path: "/learner/community",
  },
];

const stats = [
  { label: "Mentors Connected", value: "0", icon: "🤝" },
  { label: "Doubts Posted", value: "0", icon: "❓" },
  { label: "Meetings Done", value: "0", icon: "📅" },
  { label: "Communities", value: "0", icon: "👥" },
];

const topMentors = [
  {
    name: "Aisha Patel",
    skill: "React & Node.js",
    rating: "4.9",
    sessions: "120",
    avatar: "A",
    color: "#c9a84c",
  },
  {
    name: "Rahul Sharma",
    skill: "Data Science",
    rating: "4.8",
    sessions: "98",
    avatar: "R",
    color: "#60a5fa",
  },
  {
    name: "Priya Mehta",
    skill: "UI/UX Design",
    rating: "4.7",
    sessions: "85",
    avatar: "P",
    color: "#f472b6",
  },
];

const trendingTopics = [
  { name: "React.js", count: "2.4k learners", color: "#60a5fa" },
  { name: "Python", count: "3.1k learners", color: "#34d399" },
  { name: "Machine Learning", count: "1.8k learners", color: "#f472b6" },
  { name: "Node.js", count: "1.2k learners", color: "#c9a84c" },
  { name: "UI/UX Design", count: "980 learners", color: "#a78bfa" },
];

export default function LearnerDashboard() {
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

  const navItems = [
    { icon: "🏠", label: "Dashboard", path: "/learner/dashboard" },
    { icon: "🔍", label: "Find Mentors", path: "/learner/find-mentors" },
    { icon: "❓", label: "My Doubts", path: "/learner/doubts" },
    { icon: "📅", label: "Meetings", path: "/learner/meetings" },
    { icon: "👥", label: "Community", path: "/learner/community" },
    { icon: "⚙️", label: "Settings", path: "/learner/settings" },
  ];

  return (
    <div style={s.page}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside style={s.sidebar}>
        <div style={s.sidebarBrand}>⚡ SkillConnect</div>

        <nav style={s.nav}>
          {navItems.map((item) => (
            <div
              key={item.label}
              style={{
                ...s.navItem,
                ...(activeNav === item.label ? s.navItemActive : {}),
              }}
              onClick={() => {
                setActiveNav(item.label);
                navigate(item.path);
              }}
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
            <div style={s.sidebarRole}>🎓 Learner</div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────── */}
      <main style={s.main}>
        {/* Topbar */}
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>
              {greeting()}, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p style={s.pageSub}>
              Here's what's happening in your learning journey
            </p>
          </div>
          <div style={s.topbarRight}>
            <div style={s.notifBtn}>🔔</div>
            <div style={s.avatarBtn} onClick={() => setMenuOpen(!menuOpen)}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            {menuOpen && (
              <div style={s.dropdown}>
                <div style={s.dropdownItem}>👤 Profile</div>
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
              <button
                style={{ ...s.actionBtn, background: action.color }}
                onClick={() => navigate(action.path)}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={s.bottomGrid}>
          {/* Top Mentors */}
          <div style={s.panel}>
            <div style={s.panelHeader}>
              <h2 style={s.sectionTitle}>🌟 Top Mentors</h2>
              <button
                style={s.viewAll}
                onClick={() => navigate("/learner/find-mentors")}
              >
                View All
              </button>
            </div>
            {topMentors.map((mentor) => (
              <div key={mentor.name} style={s.mentorRow}>
                <div style={{ ...s.mentorAvatar, background: mentor.color }}>
                  {mentor.avatar}
                </div>
                <div style={s.mentorInfo}>
                  <div style={s.mentorName}>{mentor.name}</div>
                  <div style={s.mentorSkill}>{mentor.skill}</div>
                </div>
                <div style={s.mentorMeta}>
                  <div style={s.mentorRating}>⭐ {mentor.rating}</div>
                  <div style={s.mentorSessions}>{mentor.sessions} sessions</div>
                </div>
                <button
                  style={s.connectBtn}
                  onClick={() => navigate("/learner/find-mentors")}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>

          {/* Trending Topics */}
          <div style={s.panel}>
            <h2 style={s.sectionTitle}>🔥 Trending Topics</h2>
            {trendingTopics.map((topic) => (
              <div key={topic.name} style={s.topicRow}>
                <div style={{ ...s.topicDot, background: topic.color }} />
                <div style={s.topicInfo}>
                  <span style={s.topicName}>{topic.name}</span>
                  <span style={s.topicCount}>{topic.count}</span>
                </div>
                <button
                  style={{
                    ...s.topicBtn,
                    color: topic.color,
                    border: `1px solid ${topic.color}`,
                  }}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────── */
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

  // Quick Actions
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

  // Bottom Grid
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
  viewAll: {
    background: "none",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    borderRadius: "6px",
    padding: "0.3rem 0.75rem",
    fontSize: "0.78rem",
    cursor: "pointer",
  },

  // Mentors List
  mentorRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  mentorAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#0a0a14",
    fontWeight: "700",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.95rem",
  },
  mentorInfo: { flex: 1 },
  mentorName: { color: "#e8e4dc", fontSize: "0.875rem", fontWeight: "600" },
  mentorSkill: { color: "#8a8a9a", fontSize: "0.75rem" },
  mentorMeta: { textAlign: "right" },
  mentorRating: { color: "#c9a84c", fontSize: "0.8rem", fontWeight: "600" },
  mentorSessions: { color: "#8a8a9a", fontSize: "0.72rem" },
  connectBtn: {
    background: "rgba(201,168,76,0.1)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    borderRadius: "6px",
    padding: "0.35rem 0.75rem",
    fontSize: "0.78rem",
    fontWeight: "600",
    cursor: "pointer",
  },

  // Trending Topics
  topicRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  topicDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  topicInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
  },
  topicName: { color: "#e8e4dc", fontSize: "0.875rem", fontWeight: "600" },
  topicCount: { color: "#8a8a9a", fontSize: "0.75rem" },
  topicBtn: {
    background: "transparent",
    borderRadius: "6px",
    padding: "0.3rem 0.65rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    cursor: "pointer",
  },
};
