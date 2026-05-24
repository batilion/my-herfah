import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.card}>
          <h3 style={styles.title}>كلمة المرور</h3>
          <div style={styles.field}>
            <label style={styles.label}>كلمة المرور القديمة</label>
            <div style={styles.passWrap}>
              <input style={styles.input} type={showOld ? "text" : "password"} value={oldPass} onChange={e => setOldPass(e.target.value)} />
              <span style={styles.eye} onClick={() => setShowOld(!showOld)}>{showOld ? "🙈" : "👁️"}</span>
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>كلمة المرور الجديدة</label>
            <div style={styles.passWrap}>
              <input style={styles.input} type={showNew ? "text" : "password"} value={newPass} onChange={e => setNewPass(e.target.value)} />
              <span style={styles.eye} onClick={() => setShowNew(!showNew)}>{showNew ? "🙈" : "👁️"}</span>
            </div>
          </div>
          <button style={styles.changeBtn}>تغيير</button>
          <div style={styles.btnRow}>
            <button style={styles.btnConfirm} onClick={() => navigate("/client/account")}>تاكيد</button>
            <button style={styles.btnCancel} onClick={() => navigate(-1)}>إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", justifyContent: "center", padding: 24 },
  card: { background: "#fff", borderRadius: 12, padding: "28px 24px", width: "100%", maxWidth: 420, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  title: { textAlign: "right", fontSize: 17, fontWeight: 700, marginBottom: 20 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, color: "#555", marginBottom: 4, textAlign: "right" },
  input: { width: "100%", border: "1px solid #ddd", borderRadius: 7, padding: "9px 12px", fontSize: 13, boxSizing: "border-box", textAlign: "right" },
  passWrap: { position: "relative" },
  eye: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer" },
  changeBtn: { width: "100%", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 16 },
  btnRow: { display: "flex", gap: 12 },
  btnConfirm: { flex: 1, background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnCancel: { flex: 1, background: "#c62828", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};