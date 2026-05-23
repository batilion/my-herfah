import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { label: "الرئيسية", icon: "🏠", path: "/client/home" },
  { label: "الطلبات",  icon: "📋", path: "/client/requests" },
  { label: "المحادثات",icon: "💬", path: "/client/chats" },
  { label: "حسابي",   icon: "👤", path: "/client/profile" },
];

export default function ComplainDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const req = location.state || {};
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleSubmit = async () => {
    setError("");
    if (!text.trim()) { setError("يرجى كتابة تفاصيل المشكلة"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", text);
      formData.append("requestId", req.id || "");
      if (media) formData.append("media", media);
      const res = await fetch("https://your-api.com/api/client/complain", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("clientToken")}` },
        body: formData,
      });
      if (res.ok) navigate("/client/complain-done");
      else { const data = await res.json(); setError(data.message || "حدث خطأ"); }
    } catch { setError("حدث خطأ، حاول مرة أخرى"); }
    finally { setLoading(false); }
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
            <h3 style={styles.cardTitle}>اكتب تفاصيل المشكلة</h3>
            <p style={styles.cardSubtitle}>من فضلك وضح المشكلة بالتفصيل</p>
            <textarea style={styles.textarea} placeholder="اكتب هنا المشكلة..." value={text} onChange={e => setText(e.target.value)} rows={5} />
            <div style={styles.uploadBox} onClick={() => fileRef.current.click()}>
              <span style={styles.uploadIcon}>📷</span>
              <span style={styles.uploadHint}>{mediaName || "يفضل إرفاق صورة أو فيديو لتوضيح تفاصيل المشكلة"}</span>
            </div>
            <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f) { setMedia(f); setMediaName(f.name); } }} />
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.btnRow}>
              <button style={styles.sendBtn} onClick={handleSubmit} disabled={loading}>{loading ? "جاري الإرسال..." : "إرسال"}</button>
              <button style={styles.cancelBtn} onClick={() => navigate(-1)}>إلغاء</button>
            </div>
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
  main: { flex: 1, padding: 24 },
  card: { background: "#fff", borderRadius: 12, padding: "24px 20px", maxWidth: 460, width: "100%", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  cardTitle: { fontWeight: 700, fontSize: 16, textAlign: "center", color: "#1a1a1a", marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: "#888", textAlign: "center", marginBottom: 16 },
  textarea: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box", textAlign: "right", direction: "rtl", marginBottom: 14 },
  uploadBox: { border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "18px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16, background: "#fafafa" },
  uploadIcon: { fontSize: 28 },
  uploadHint: { fontSize: 12, color: "#999", textAlign: "center" },
  error: { color: "#e53935", fontSize: 13, textAlign: "center", marginBottom: 8 },
  btnRow: { display: "flex", gap: 12, justifyContent: "center" },
  sendBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "10px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  cancelBtn: { background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "10px 32px", fontSize: 14, cursor: "pointer" },
};