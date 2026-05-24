import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>مرحبًا بك</h2>

        <div style={styles.field}>
          <label style={styles.label}>البريد الإلكتروني</label>
          <input
            style={styles.input}
            placeholder="اكتب البريد الإلكتروني"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>كلمة المرور</label>
          <div style={styles.passWrap}>
            <input
              style={{ ...styles.input, paddingLeft: 36 }}
              placeholder="اكتب كلمة المرور"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span style={styles.eye} onClick={() => setShowPass(!showPass)}>
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <p style={styles.orText}>أو سجل الدخول باستخدام</p>
        <div style={styles.googleBtn}>
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="google" width={28} />
        </div>

        <button style={styles.btn} onClick={() => navigate("/client/home")}>
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#fff", borderRadius: 16, padding: "40px 32px", width: "100%", maxWidth: 420, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "stretch", direction: "rtl" },
  title: { textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 28, color: "#1a1a1a" },
  field: { marginBottom: 18 },
  label: { display: "block", fontSize: 14, color: "#333", marginBottom: 6, textAlign: "right" },
  input: { width: "100%", border: "1px solid #ddd", borderRadius: 8, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", outline: "none", textAlign: "right" },
  passWrap: { position: "relative" },
  eye: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 16 },
  orText: { textAlign: "center", color: "#888", fontSize: 13, margin: "16px 0 8px" },
  googleBtn: { display: "flex", justifyContent: "center", marginBottom: 20, cursor: "pointer" },
  btn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%" },
};