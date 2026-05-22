import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const DANGER = "#c0392b";

export default function PasswordChanged() {
  const navigate = useNavigate();

  const s = {
    page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl" },
    navbar: {
      backgroundColor: PRIMARY, padding: "0 20px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    brand: { color: "#fff", fontSize: 22, fontWeight: 700 },
    navLinks: { display: "flex", gap: 8, alignItems: "center" },
    navBtn: {
      background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer",
    },
    navBtnActive: {
      background: "rgba(255,255,255,0.35)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
    bellBadge: {
      position: "absolute", top: -4, right: -4, background: DANGER,
      color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16,
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
    },
    body: { display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", minHeight: "calc(100vh - 60px)" },
    outerCard: { background: "#fff", borderRadius: 14, padding: 32, width: "100%", maxWidth: 580, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" },
    innerCard: {
      border: "1.5px solid #e0e0e0", borderRadius: 12, padding: "48px 32px",
      maxWidth: 320, margin: "0 auto", textAlign: "center",
    },
    title: { fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24 },
    checkWrap: { marginBottom: 24 },
    checkSvg: { width: 64, height: 64 },
    backBtn: {
      background: PRIMARY, color: "#fff", border: "none",
      borderRadius: 10, padding: "11px 32px", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      <nav style={s.navbar}>
        <div style={s.navLinks}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22, color: "#fff" }}>🔔</span>
            <span style={s.bellBadge}>2</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20 }}>👷</span>
          </div>
        </div>
        <div style={s.navLinks}>
          <button style={s.navBtn} onClick={() => navigate("/tech/home")}>الرئيسية</button>
          <button style={s.navBtn} onClick={() => navigate("/tech/requests")}>الطلبات</button>
          <button style={s.navBtnActive}>حسابي</button>
        </div>
        <span style={s.brand}>حرفة شُغل</span>
      </nav>

      <div style={s.body}>
        <div style={s.outerCard}>
          <div style={s.innerCard}>
            <div style={s.title}>تم تغيير كلمة المرور!</div>
            <div style={s.checkWrap}>
              <svg style={s.checkSvg} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke={PRIMARY} strokeWidth="3" fill="none" />
                <path d="M18 33 L27 42 L46 23" stroke={PRIMARY} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <button style={s.backBtn} onClick={() => navigate("/tech/profile")}>
              الرجوع الى الاعدادات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}