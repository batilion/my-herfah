import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AfterRequestCompleted() {
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
            <h3 style={styles.title}>هل تم تنفيذ الخدمة بنجاح؟</h3>
            <p style={styles.sub}>يرجى تأكيد تنفيذ الخدمة من الفني بعد الانتهاء</p>
            <p style={styles.info}>الخدمة: <strong>سباكة</strong></p>
            <p style={styles.info}>الفني: <strong>أحمد محمد</strong></p>
            <button style={styles.btnYes} onClick={() => navigate("/client/rating")}>
              نعم، تم استلام الخدمة
            </button>
            <button style={styles.btnProblem} onClick={() => navigate("/client/complain-details")}>
              يوجد مشكلة
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
  card: { background: "#fff", borderRadius: 12, padding: "36px 28px", maxWidth: 400, boxShadow: "0 1px 8px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", alignItems: "center" },
  iconWrap: { width: 64, height: 64, borderRadius: "50%", border: "4px solid #2e7d32", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  check: { color: "#2e7d32", fontSize: 28, fontWeight: 700 },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 8, textAlign: "center" },
  sub: { fontSize: 13, color: "#888", marginBottom: 12, textAlign: "center" },
  info: { fontSize: 14, color: "#444", marginBottom: 4 },
  btnYes: { width: "100%", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 16, marginBottom: 8 },
  btnProblem: { width: "100%", background: "#c62828", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};