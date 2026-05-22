
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const DANGER = "#c0392b";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPass: "", newPass: "" });
  const [show, setShow] = useState({ old: false, new: false });

  const s = {
    page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl" },
    navbar: {
      backgroundColor: PRIMARY, padding: "0 20px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    brand: { color: "#fff", fontSize: 22, fontWeight: 700 },
    navLinks: { display: "flex", gap: 8, alignItems: "center" },
    navBtn: {
      background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer",
    },
    navBtnActive: {
      background: "rgba(255,255,255,0.35)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
    bellBadge: {
      position: "absolute", top: -4, right: -4, background: DANGER,
      color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16,
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
    },
    body: { display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" },
    outerCard: { background: "#fff", borderRadius: 14, padding: 32, width: "100%", maxWidth: 580, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" },
    innerCard: {
      border: "1.5px solid #e0e0e0", borderRadius: 12, padding: 28,
      maxWidth: 380, margin: "0 auto",
    },
    title: { fontSize: 20, fontWeight: 700, color: "#222", textAlign: "center", marginBottom: 28 },
    fieldGroup: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 },
    label: { fontSize: 13, color: "#555", fontWeight: 600, textAlign: "right" },
    inputWrap: { position: "relative" },
    input: {
      border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 40px 10px 40px",
      fontSize: 14, fontFamily: "'Cairo',sans-serif", textAlign: "right",
      outline: "none", background: "#fafafa", color: "#333",
      width: "100%", boxSizing: "border-box",
    },
    eyeBtn: {
      position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
      background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#888",
    },
    actions: { display: "flex", gap: 12, marginTop: 28 },
    cancelBtn: {
      flex: 1, background: DANGER, color: "#fff", border: "none",
      borderRadius: 10, padding: "11px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
    confirmBtn: {
      flex: 1, background: PRIMARY, color: "#fff", border: "none",
      borderRadius: 10, padding: "11px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      <nav style={s.navbar}>
        <div style={s.navLinks}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22, color: "#fff" }}>🔔</span>
            <span style={s.bellBadge}>2</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20 }}>👷</span>
          </div>
        </div>
        <div style={s.navLinks}>
          <button style={s.navBtn} onClick={() => navigate("/tech/home")}>الرئيسية</button>
          <button style={s.navBtn} onClick={() => navigate("/tech/requests")}>الطلبات</button>
          <button style={s.navBtnActive}>حسابي</button>
        </div>
        <span style={s.brand}>حرفة شُغل</span>
      </nav>

      <div style={s.body}>
        <div style={s.outerCard}>
          <div style={s.innerCard}>
            <div style={s.title}>كلمة المرور</div>

            {[
              { key: "oldPass", label: "كلمة المرور القديمة", showKey: "old" },
              { key: "newPass", label: "كلمة المرور الجديدة", showKey: "new" },
            ].map(({ key, label, showKey }) => (
              <div key={key} style={s.fieldGroup}>
                <label style={s.label}>{label}</label>
                <div style={s.inputWrap}>
                  <input
                    type={show[showKey] ? "text" : "password"}
                    style={s.input}
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  />
                  <button style={s.eyeBtn} onClick={() => setShow(p => ({ ...p, [showKey]: !p[showKey] }))}>
                    {show[showKey] ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            ))}

            <div style={s.actions}>
              <button style={s.cancelBtn} onClick={() => navigate("/tech/profile")}>إلغاء</button>
              <button style={s.confirmBtn} onClick={() => navigate("/tech/password-changed")}>تغيير</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}