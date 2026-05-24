import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function ComplainDetails() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header />
      <div style={styles.body}>
        <div style={styles.main}>
          <div style={styles.card}>
            <h3 style={styles.title}>اكتب تفاصيل المشكلة</h3>
            <p style={styles.sub}>من فضلك وضح المشكلة بالتفصيل</p>
            <textarea
              style={styles.textarea}
              placeholder="اكتب هنا المشكلة..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div style={styles.uploadBox}>
              <span>📷</span>
              <p style={{ fontSize: 12, color: "#888", margin: 0 }}>يفضل إرفاق صورة أو فيديو لتوضيح تفاصيل المشكلة</p>
            </div>
            <div style={styles.btnRow}>
              <button style={styles.btnSend} onClick={() => navigate("/client/complain-done")}>إرسال</button>
              <button style={styles.btnCancel} onClick={() => navigate(-1)}>إلغاء</button>
            </div>
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
  card: { background: "#fff", borderRadius: 12, padding: "28px 24px", maxWidth: 460, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  title: { fontSize: 18, fontWeight: 700, textAlign: "right", marginBottom: 4 },
  sub: { fontSize: 13, color: "#888", textAlign: "right", marginBottom: 14 },
  textarea: { width: "100%", minHeight: 90, border: "1px solid #ddd", borderRadius: 8, padding: "10px 12px", fontSize: 13, textAlign: "right", boxSizing: "border-box", resize: "vertical", marginBottom: 12 },
  uploadBox: { border: "1px solid #ddd", borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", marginBottom: 20, background: "#fafafa" },
  btnRow: { display: "flex", gap: 12 },
  btnSend: { flex: 1, background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnCancel: { flex: 1, background: "#c62828", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};