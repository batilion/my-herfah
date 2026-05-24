import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function DoneServiceRequest() {
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
            <h3 style={styles.title}>تم إرسال الطلب بنجاح</h3>
            <p style={styles.sub}>سيتم مراجعة طلبك والتواصل معك قريبًا</p>
            <button style={styles.btn} onClick={() => navigate("/client/home")}>
              الصفحة الرئيسية
            </button>
          </div>
        </div>
        <Sidebar active="الرئيسية" />
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", flex: 1 },
  main: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { background: "#fff", borderRadius: 12, padding: "48px 32px", maxWidth: 400, width: "100%", boxShadow: "0 1px 8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center" },
  iconWrap: { width: 70, height: 70, borderRadius: "50%", border: "4px solid #2e7d32", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  check: { color: "#2e7d32", fontSize: 30, fontWeight: 700 },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: "center" },
  sub: { fontSize: 13, color: "#888", marginBottom: 28, textAlign: "center" },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};
