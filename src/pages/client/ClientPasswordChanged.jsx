import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function ClientPasswordChanged() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.card}>
          <h3 style={styles.title}>تم تغيير كلمة المرور!</h3>
          <div style={styles.iconWrap}>
            <span style={styles.check}>✔</span>
          </div>
          <button style={styles.btn} onClick={() => navigate("/client/account")}>
            الرجوع الى الاعدادات
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", justifyContent: "center", alignItems: "center", flex: 1 },
  card: { background: "#fff", borderRadius: 12, padding: "40px 32px", width: "100%", maxWidth: 380, boxShadow: "0 1px 8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center" },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 20, textAlign: "center" },
  iconWrap: { width: 64, height: 64, borderRadius: "50%", border: "4px solid #2e7d32", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  check: { color: "#2e7d32", fontSize: 28, fontWeight: 700 },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};