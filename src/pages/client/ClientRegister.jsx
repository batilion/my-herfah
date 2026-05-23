import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientRegister() {
  const [form, setForm] = useState({ firstName: "", middleName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "", terms: false });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAvatar = e => { const file = e.target.files[0]; if (file) setAvatar(URL.createObjectURL(file)); };

  const handleRegister = async () => {
    setError("");
    if (!form.firstName || !form.email || !form.password || !form.phone) { setError("يرجى تعبئة جميع الحقول المطلوبة"); return; }
    if (form.password !== form.confirmPassword) { setError("كلمة المرور غير متطابقة"); return; }
    if (!form.terms) { setError("يجب الموافقة على الشروط والأحكام"); return; }
    setLoading(true);
    try {
      const res = await fetch("https://your-api.com/api/client/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) navigate("/client/register/done");
      else setError(data.message || "حدث خطأ في التسجيل");
    } catch { setError("حدث خطأ، حاول مرة أخرى"); }
    finally { setLoading(false); }
  };

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatarWrap}>
          <img src={avatar || "https://cdn-icons-png.flaticon.com/512/1995/1995574.png"} alt="avatar" style={styles.avatar} />
          <button style={styles.cameraBtn} onClick={() => fileRef.current.click()}>📷</button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatar} />
        </div>

        <div style={styles.nameRow}>
          {[["firstName","الاسم الأول","حسن"],["middleName","الاسم الثاني","محمد"],["lastName","الاسم الأخير","الحسيني"]].map(([k,l,p]) => (
            <div key={k} style={styles.nameField}>
              <label style={styles.label}>{l}</label>
              <input style={styles.input} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={p} />
            </div>
          ))}
        </div>

        <label style={styles.label}>اكتب البريد الإلكتروني</label>
        <input style={styles.input} placeholder="example@email.com" value={form.email} onChange={e => set("email", e.target.value)} type="email" />

        <label style={styles.label}>اكتب كلمة المرور</label>
        <div style={styles.passWrap}>
          <input style={styles.input} placeholder="••••••••••••••••" value={form.password} onChange={e => set("password", e.target.value)} type={showPass ? "text" : "password"} />
          <span style={styles.eye} onClick={() => setShowPass(v => !v)}>{showPass ? "🙈" : "👁️"}</span>
        </div>

        <label style={styles.label}>تأكيد كلمة المرور</label>
        <div style={styles.passWrap}>
          <input style={styles.input} placeholder="••••••••••••••••" value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)} type={showConfirm ? "text" : "password"} />
          <span style={styles.eye} onClick={() => setShowConfirm(v => !v)}>{showConfirm ? "🙈" : "👁️"}</span>
        </div>

        <label style={styles.label}>رقم الهاتف</label>
        <input style={styles.input} placeholder="01012345678" value={form.phone} onChange={e => set("phone", e.target.value)} type="tel" />

        <div style={styles.termsRow}>
          <input type="checkbox" checked={form.terms} onChange={e => set("terms", e.target.checked)} id="terms" />
          <label htmlFor="terms" style={styles.termsLabel}>
            أوافق على <span style={styles.link} onClick={() => navigate("/client/terms")}>الشروط والأحكام</span>
          </label>
        </div>

        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.btn} onClick={handleRegister} disabled={loading}>{loading ? "جاري التسجيل..." : "إنشاء حساب"}</button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#fff", borderRadius: 16, padding: "28px 24px", width: "100%", maxWidth: 440, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "stretch" },
  avatarWrap: { position: "relative", alignSelf: "center", marginBottom: 20 },
  avatar: { width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid #2e7d32" },
  cameraBtn: { position: "absolute", bottom: 0, left: 0, background: "#2e7d32", border: "none", borderRadius: "50%", width: 22, height: 22, fontSize: 12, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" },
  nameRow: { display: "flex", gap: 8, marginBottom: 4 },
  nameField: { flex: 1, display: "flex", flexDirection: "column" },
  label: { fontSize: 12, color: "#444", marginBottom: 4, textAlign: "right" },
  input: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "9px 10px", fontSize: 13, marginBottom: 12, outline: "none", boxSizing: "border-box", textAlign: "right", direction: "rtl" },
  passWrap: { position: "relative" },
  eye: { position: "absolute", left: 10, top: "38%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 14 },
  termsRow: { display: "flex", alignItems: "center", gap: 8, flexDirection: "row-reverse", marginBottom: 10 },
  termsLabel: { fontSize: 13, color: "#444" },
  link: { color: "#2e7d32", fontWeight: 700, cursor: "pointer" },
  error: { color: "#e53935", fontSize: 13, textAlign: "center", marginBottom: 6 },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
};