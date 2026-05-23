import { useNavigate, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { label: "الرئيسية", icon: "🏠", path: "/client/home" },
  { label: "الطلبات",  icon: "📋", path: "/client/requests" },
  { label: "المحادثات",icon: "💬", path: "/client/chats" },
  { label: "حسابي",   icon: "👤", path: "/client/profile" },
];

export default function AfterRequestCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  const req = location.state || {};

  const handleConfirm = async () => {
    try {
      await fetch(`https://your-api.com/api/client/requests/${req.id}/confirm`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("clientToken")}`, "Content-Type": "application/json" },
      });
    } catch {}
    navigate("/client/requests");
  };

  return (
    <div dir="rtl" style={styles.page}>
      <header style={styles.navbar}>
        <span style={styles.menuBtn}>☰</span>
        <span style={styles.navTitle}>حرفة شغل</span>
        <div style={styles.navLeft}>
          <div style={styles.bellWrap}><span>🔔</span><span style={styles.badge}>2</span></div>
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="user" style={styles.userAvatar} />
        </div>
      </header>
      <div style={styles.body}>
        <aside style={styles.sidebar}>
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.path}
              style={{ ...styles.navItem, background: item.path === "/client/requests" ? "#e8f5e9" : "transparent", color: item.path === "/client/requests" ? "#2e7d32" : "#333", fontWeight: item.path === "/client/requests" ? 700 : 400 }}
              onClick={() => navigate(item.path)}
            >
              <span>{item.label}</span><span style={{ fontSize: 18 }}>{item.icon}</span>
            </div>
          ))}
          <div style={styles.logoutBtn} onClick={() => { localStorage.removeItem("clientToken"); navigate("/"); }}>
            <span>تسجيل الخروج</span><span>🚪</span>
          </div>
        </aside>
        <main style={styles.main}>
          <div style={styles.card}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#2e7d32" strokeWidth="3" fill="none" />
              <path d="M18 33l10 10 18-20" stroke="#2e7d32" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 style={styles.title}>هل تم تنفيذ الخدمة بنجاح؟</h2>
            <p style={styles.subtitle}>يرجى تأكيد تنفيذ الخدمة من الفني بعد الانتهاء</p>
            <div style={styles.infoBox}>
              <p style={styles.infoRow}><span style={styles.infoLabel}>الخدمة:</span><span style={styles.infoVal}>{req.service || "سباكة"}</span></p>
              <p style={styles.infoRow}><span style={styles.infoLabel}>الفني:</span><span style={styles.infoVal}>{req.techName || "أحمد محمد"}</span></p>
            </div>
            <button style={styles.confirmBtn} onClick={handleConfirm}>نعم، تم استلام الخدمة</button>
            <button style={styles.problemBtn} onClick={() => navigate("/client/complain-details", { state: req })}>يوجد مشكلة</button>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  navbar: { background: "#2e7d32", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", position: "sticky", top: 0, zIndex: 100 },
  menuBtn: { fontSize: 22, cursor: "pointer" },
  navTitle: { fontSize: 18, fontWeight: 700 },
  navLeft: { display: "flex", alignItems: "center", gap: 10 },
  bellWrap: { position: "relative", fontSize: 20 },
  badge: { position: "absolute", top: -4, right: -4, background: "#e53935", color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" },
  userAvatar: { width: 34, height: 34, borderRadius: "50%", border: "2px solid #fff" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: 180, background: "#fff", borderLeft: "1px solid #e8e8e8", display: "flex", flexDirection: "column", padding: "20px 0", minHeight: "calc(100vh - 54px)", position: "sticky", top: 54 },
  navItem: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "12px 20px", cursor: "pointer", borderRadius: 8, margin: "2px 8px", fontSize: 14 },
  logoutBtn: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "12px 20px", cursor: "pointer", color: "#e53935", fontSize: 13, marginTop: "auto" },
  main: { flex: 1, padding: 24, display: "flex", alignItems: "flex-start" },
  card: { background: "#fff", borderRadius: 12, padding: "36px 28px", maxWidth: 400, width: "100%", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 },
  title: { fontSize: 18, fontWeight: 700, color: "#1a1a1a", textAlign: "center" },
  subtitle: { fontSize: 13, color: "#888", textAlign: "center", lineHeight: 1.6 },
  infoBox: { background: "#f9f9f9", border: "1px solid #e8e8e8", borderRadius: 8, padding: "12px 16px", width: "100%", boxSizing: "border-box" },
  infoRow: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 },
  infoLabel: { color: "#888" },
  infoVal: { fontWeight: 700, color: "#1a1a1a" },
  confirmBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" },
  problemBtn: { background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" },
};