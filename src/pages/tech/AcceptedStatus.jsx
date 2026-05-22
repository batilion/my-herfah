import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";

export default function AcceptedStatus() {
  const navigate = useNavigate();

  const s = {
    page: {
      minHeight: "100vh", background: "#1a1a1a",
      fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    card: {
      background: "#fff", borderRadius: 16, padding: "48px 40px",
      textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      maxWidth: 380, width: "100%", margin: "0 16px",
    },
    checkWrap: { marginBottom: 24 },
    title: { fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 10 },
    subtitle: { fontSize: 13, color: "#888", marginBottom: 32, lineHeight: 1.8 },
    btn: {
      background: PRIMARY, color: "#fff", border: "none",
      borderRadius: 10, padding: "12px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer",
      fontWeight: 700, width: "100%",
    },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={s.card}>
        <div style={s.checkWrap}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="33" stroke={PRIMARY} strokeWidth="3" fill="none"/>
            <path d="M20 37 L30 47 L52 25" stroke={PRIMARY} strokeWidth="4"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <div style={s.title}>تم قبول حسابك بنجاح</div>
        <div style={s.subtitle}>
          يمكنك الآن استخدام التطبيق واستقبال طلبات العملاء
        </div>
        <button style={s.btn} onClick={() => navigate("/tech/home")}>
          عرض الملف الشخصي والإشعارات
        </button>
      </div>
    </div>
  );
}