import { useNavigate } from "react-router-dom";

const DANGER = "#c0392b";
const PRIMARY = "#1a5c2a";

export default function RejectedStatus() {
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
    iconWrap: {
      width: 72, height: 72, borderRadius: "50%",
      border: `3px solid ${DANGER}`, background: "#fff5f5",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 20px", fontSize: 34,
    },
    title: { fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 12 },
    subtitle: { fontSize: 13, color: "#888", marginBottom: 32, lineHeight: 1.8 },
    btn: {
      background: DANGER, color: "#fff", border: "none",
      borderRadius: 10, padding: "12px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer",
      fontWeight: 700, width: "100%",
    },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={s.card}>
        <div style={s.iconWrap}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" stroke={DANGER} strokeWidth="2.5" fill="none"/>
            <path d="M18 10 L18 20" stroke={DANGER} strokeWidth="3" strokeLinecap="round"/>
            <circle cx="18" cy="26" r="1.8" fill={DANGER}/>
          </svg>
        </div>
        <div style={s.title}>تم رفض طلبك</div>
        <div style={s.subtitle}>
          تأسف، تم رفض طلبك بسبب عدم وضوح بعض المستندات أو عدم تطابق البيانات
        </div>
        <button style={s.btn} onClick={() => navigate("/tech/register")}>
          إعادة رفع البيانات
        </button>
      </div>
    </div>
  );
}