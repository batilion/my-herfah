import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function RequestDetails() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header />
      <div style={styles.body}>
        <div style={styles.main}>
          <h3 style={styles.pageTitle}>تفاصيل الطلب</h3>
          <div style={styles.card}>
            <Row label="السعر المقترح" value="200" isInput />
            <Row label="العنوان" value="مدينة نصر" isInput />
            <Row label="رقم الهاتف" value="01038203991" isInput />
            <Row label="تاريخ الوصول" value="7/4/2026" isInput type="date" />
            <Row label="موعد الوصول" value="10:00 AM" isInput type="time" />
            <Row label="وصف المشكلة" value="" isInput />
          </div>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>العودة</button>
        </div>
        <Sidebar active="الطلبات" />
      </div>
    </div>
  );
}

const Row = ({ label, value, isInput, type = "text" }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
    <input
      style={{ border: "1px solid #ddd", borderRadius: 6, padding: "7px 10px", fontSize: 13, width: 160, textAlign: "right" }}
      defaultValue={value}
      type={type}
      readOnly
    />
    <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
  </div>
);

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", flex: 1 },
  main: { flex: 1, padding: 24 },
  pageTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16, textAlign: "right" },
  card: { background: "#fff", borderRadius: 12, padding: "20px 24px", maxWidth: 440, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  backBtn: { marginTop: 20, background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "11px 40px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};