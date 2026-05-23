import { useNavigate } from "react-router-dom";

export default function ClientRegisterDone() {
  const navigate = useNavigate();
  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#2e7d32" strokeWidth="3" fill="none" />
            <path d="M18 33l10 10 18-20" stroke="#2e7d32" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={styles.title}>تم إنشاء الحساب بنجاح</h2>
        <p style={styles.subtitle}>يمكنك الآن تسجيل الدخول</p>
        <button style={styles.btn} onClick={() => navigate("/client/login")}>تسجيل الدخول</button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#fff", borderRadius: 16, padding: "48px 36px", width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.18)" },
  iconWrap: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#888", marginBottom: 28, textAlign: "center" },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "13px 48px", fontSize: 15, fontWeight: 700, cursor: "pointer" },
};