import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const statuses = [
  { label: "✔ تم إرسال بيانات الطلب إلى الفني", color: "#e8f5e9", done: true },
  { label: "تم وصول الفني", color: "#e3f2fd", done: false },
  { label: "جاري العمل", color: "#fffde7", done: false },
  { label: "تم التنفيذ", color: "#e8f5e9", done: false },
  { label: "تعذر حل المشكلة", color: "#ffebee", done: false },
];

export default function RequestStatus() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header />
      <div style={styles.body}>
        <div style={styles.main}>
          <div style={styles.card}>
            <h3 style={styles.title}>متابعة حالة الطلب</h3>
            <p style={styles.sub}>حالة الطلب</p>
            {statuses.map((s, i) => (
              <div key={i} style={{ ...styles.statusItem, background: s.color }}>
                <span style={{ fontSize: 13 }}>{s.label}</span>
              </div>
            ))}
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
  card: { background: "#fff", borderRadius: 12, padding: "24px", maxWidth: 420, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  title: { fontSize: 18, fontWeight: 700, textAlign: "right", marginBottom: 6 },
  sub: { textAlign: "right", color: "#555", fontSize: 14, marginBottom: 14 },
  statusItem: { borderRadius: 8, padding: "12px 16px", marginBottom: 10, textAlign: "right" },
};