import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientRegister() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ firstName: "", middleName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "", terms: false });
  const navigate = useNavigate();

  const handle = (field, val) => setForm(p => ({ ...p, [field]: val }));

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatarWrap}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" style={styles.avatar} />
          <div style={styles.camIcon}>📷</div>
        </div>

        <div style={styles.row}>
          <div style={styles.fieldThird}>
            <label style={styles.label}>الاسم الأول</label>
            <input style={styles.input} value={form.firstName} onChange={e => handle("firstName", e.target.value)} />
          </div>
          <div style={styles.fieldThird}>
            <label style={styles.label}>الاسم الثاني</label>
            <input style={styles.input} value={form.middleName} onChange={e => handle("middleName", e.target.value)} />
          </div>
          <div style={styles.fieldThird}>
            <label style={styles.label}>الاسم الأخير</label>
            <input style={styles.input} value={form.lastName} onChange={e => handle("lastName", e.target.value)} />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>اكتب البريد الإلكتروني</label>
          <input style={styles.input} value={form.email} onChange={e => handle("email", e.target.value)} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>اكتب كلمة المرور</label>
          <div style={styles.passWrap}>
            <input style={styles.input} type={showPass ? "text" : "password"} value={form.password} onChange={e => handle("password", e.target.value)} />
            <span style={styles.eye} onClick={() => setShowPass(!showPass)}>{showPass ? "🙈" : "👁️"}</span>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>تأكيد كلمة المرور</label>
          <div style={styles.passWrap}>
            <input style={styles.input} type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => handle("confirmPassword", e.target.value)} />
            <span style={styles.eye} onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? "🙈" : "👁️"}</span>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>رقم الهاتف</label>
          <input style={styles.input} value={form.phone} onChange={e => handle("phone", e.target.value)} />
        </div>

        <div style={styles.termsRow}>
          <input type="checkbox" checked={form.terms} onChange={e => handle("terms", e.target.checked)} />
          <span style={styles.termsText}>أوافق على الشروط والأحكام</span>
        </div>

        <button style={styles.btn} onClick={() => navigate("/client/register-done")}>
          إنشاء حساب
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#fff", borderRadius: 16, padding: "32px 24px", width: "100%", maxWidth: 440, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", direction: "rtl" },
  avatarWrap: { position: "relative", width: 72, height: 72, margin: "0 auto 20px" },
  avatar: { width: 72, height: 72, borderRadius: "50%", objectFit: "cover" },
  camIcon: { position: "absolute", bottom: 0, right: 0, background: "#2e7d32", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
  row: { display: "flex", gap: 8, marginBottom: 14 },
  fieldThird: { flex: 1 },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 13, color: "#333", marginBottom: 4, textAlign: "right" },
  input: { width: "100%", border: "1px solid #ddd", borderRadius: 8, padding: "9px 10px", fontSize: 13, boxSizing: "border-box", textAlign: "right" },
  passWrap: { position: "relative" },
  eye: { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", cursor: "pointer" },
  termsRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16, justifyContent: "flex-end" },
  termsText: { fontSize: 13, color: "#555" },
  btn: { width: "100%", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" },
};