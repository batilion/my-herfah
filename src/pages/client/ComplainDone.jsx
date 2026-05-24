import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function ComplainDone() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header />
      <div style={styles.body}>
        <div style={styles.main}>
          <div style={styles.card}>
            <div style={styles.iconWrap}>
              <span style={styles.check}>✔</span>
            </div>
            <h3 style={styles.title}>تم إرسال البلاغ بنجاح</h3>
            <p style={styles.sub}>سيتم مراجعة مشكلتك من فريق الدعم والرد عليك قريبًا</p>
            <button style={styles.btn} onClick={() => navigate("/client/requests")}>
              العودة إلى الطلبات
            </button>
          </div>
        </div>
        <Sidebar active="الطلبات" />
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", flex: 1 },
  main: { flex: 1, padding: 24 },
  card: { background: "#fff", borderRadius: 12, padding: "40px 28px", maxWidth: 400, boxShadow: "0 1px 8px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", alignItems: "center" },
  iconWrap: { width: 64, height: 64, borderRadius: "50%", border: "4px solid #2e7d32", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  check: { color: "#2e7d32", fontSize: 28, fontWeight: 700 },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 8, textAlign: "center" },
  sub: { fontSize: 13, color: "#888", textAlign: "center", marginBottom: 24 },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};