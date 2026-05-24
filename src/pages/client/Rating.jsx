import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Rating() {
  const [stars, setStars] = useState(4);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header />
      <div style={styles.body}>
        <div style={styles.main}>
          <div style={styles.card}>
            <h3 style={styles.title}>تم تنفيذ الخدمة بنجاح</h3>
            <p style={styles.sub}>قيّم تجربتك<br />نحن نقدر رأيك ونسعى لتحسين جودة الخدمة باستمرار<br />يتم مراجعة جميع التقييمات والتعليقات لضمان أفضل تجربة للمستخدمين</p>

            <label style={styles.label}>تقييم الفني</label>
            <div style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} onClick={() => setStars(s)} style={{ fontSize: 28, cursor: "pointer", color: s <= stars ? "#f9a825" : "#ddd" }}>★</span>
              ))}
            </div>

            <label style={styles.label}>اكتب تعليق</label>
            <textarea
              style={styles.textarea}
              placeholder="اكتب رأيك هنا..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <label style={styles.label}>توثيق الخدمة بعد التنفيذ</label>
            <div style={styles.uploadBox}>
              <span>📷</span>
              <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>اضغط لرفع صورة للنتيجة</p>
            </div>
            <p style={{ fontSize: 11, color: "#aaa", textAlign: "right" }}>مساعدتنا توثيق الخدمة للتأكد من جودة التنفيذ وزيادة مصداقية التقييم</p>

            <button style={styles.btn} onClick={() => navigate("/client/requests")}>
              إرسال التقييم
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
  card: { background: "#fff", borderRadius: 12, padding: "28px 24px", maxWidth: 460, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  title: { fontSize: 18, fontWeight: 700, textAlign: "right", marginBottom: 6 },
  sub: { fontSize: 12, color: "#888", textAlign: "right", marginBottom: 16, lineHeight: 1.6 },
  label: { display: "block", fontSize: 13, fontWeight: 600, textAlign: "right", marginBottom: 6 },
  starsRow: { display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end", marginBottom: 14, gap: 4 },
  textarea: { width: "100%", minHeight: 80, border: "1px solid #ddd", borderRadius: 8, padding: "10px 12px", fontSize: 13, textAlign: "right", boxSizing: "border-box", resize: "vertical", marginBottom: 14 },
  uploadBox: { border: "1px solid #ddd", borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", marginBottom: 6, background: "#fafafa" },
  btn: { width: "100%", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 12 },
};