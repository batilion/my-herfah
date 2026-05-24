import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "Hussein", middleName: "Mohamed", lastName: "El-Husseiny", email: "Hussein.rakha.2023@gmail.com", phone: "01113253452", birthdate: "1993-03-03" });
  const handle = (f, v) => setForm(p => ({ ...p, [f]: v }));

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.row3}>
            <SmallField label="الاسم الأول" value={form.firstName} onChange={v => handle("firstName", v)} />
            <SmallField label="الاسم الثاني" value={form.middleName} onChange={v => handle("middleName", v)} />
            <SmallField label="الاسم الأخير" value={form.lastName} onChange={v => handle("lastName", v)} />
          </div>
          <Field label="البريد الإلكتروني" value={form.email} onChange={v => handle("email", v)} icon="✉️" />
          <div style={{ marginBottom: 14 }}>
            <label style={styles.label}>تاريخ الميلاد</label>
            <input type="date" style={styles.input} value={form.birthdate} onChange={e => handle("birthdate", e.target.value)} />
          </div>
          <Field label="رقم الهاتف" value={form.phone} onChange={v => handle("phone", v)} icon="📞" />
          <div style={styles.btnRow}>
            <button style={styles.btnConfirm} onClick={() => navigate("/client/account")}>تاكيد</button>
            <button style={styles.btnCancel} onClick={() => navigate(-1)}>إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value, onChange, icon }) => (
  <div style={{ marginBottom: 14, textAlign: "right" }}>
    <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 3 }}>{label}</label>
    <div style={{ border: "1px solid #ddd", borderRadius: 7, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{icon}</span>
      <input style={{ border: "none", outline: "none", fontSize: 13, textAlign: "right", flex: 1 }} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  </div>
);

const SmallField = ({ label, value, onChange }) => (
  <div style={{ flex: 1 }}>
    <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 2, textAlign: "right" }}>{label}</label>
    <input style={{ width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: "7px 8px", fontSize: 12, boxSizing: "border-box", textAlign: "right" }} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", justifyContent: "center", padding: 24 },
  card: { background: "#fff", borderRadius: 12, padding: "24px 20px", width: "100%", maxWidth: 460, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  row3: { display: "flex", gap: 8, marginBottom: 14 },
  label: { fontSize: 12, color: "#888", display: "block", marginBottom: 3 },
  input: { width: "100%", border: "1px solid #ddd", borderRadius: 7, padding: "8px 10px", fontSize: 13, boxSizing: "border-box", textAlign: "right" },
  btnRow: { display: "flex", gap: 12, marginTop: 8 },
  btnConfirm: { flex: 1, background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnCancel: { flex: 1, background: "#c62828", color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" },
};