import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("يرجى تعبئة جميع الحقول"); return; }
    setLoading(true);
    try {
      const res = await fetch("https://your-api.com/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("clientToken", data.token);
        navigate("/client/home");
      } else {
        setError(data.message || "بيانات غير صحيحة");
      }
    } catch {
      setError("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>مرحبًا بك</h2>

        <label style={styles.label}>البريد الإلكتروني</label>
        <input style={styles.input} placeholder="اكتب البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} type="email" />

        <label style={styles.label}>كلمة المرور</label>
        <div style={styles.passWrap}>
          <input style={{ ...styles.input, paddingLeft: 38 }} placeholder="اكتب كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"} />
          <span style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>{showPass ? "🙈" : "👁️"}</span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.orText}>أو سجل الدخول باستخدام</p>
        <button style={styles.googleBtn}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 26, height: 26 }} />
        </button>

        <button style={styles.loginBtn} onClick={handleLogin} disabled={loading}>
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>

        <p style={styles.registerLink}>
          ليس لديك حساب؟{" "}
          <span style={styles.link} onClick={() => navigate("/client/register")}>إنشاء حساب</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#fff", borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "stretch", boxShadow: "0 4px 24px rgba(0,0,0,0.18)" },
  title: { textAlign: "center", color: "#1a1a1a", fontSize: 24, fontWeight: 700, marginBottom: 24 },
  label: { fontSize: 13, color: "#444", marginBottom: 4, textAlign: "right" },
  input: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box", textAlign: "right", direction: "rtl" },
  passWrap: { position: "relative", width: "100%" },
  eyeBtn: { position: "absolute", left: 10, top: "50%", transform: "translateY(-60%)", cursor: "pointer", fontSize: 16 },
  error: { color: "#e53935", fontSize: 13, textAlign: "center", marginBottom: 8 },
  orText: { textAlign: "center", color: "#888", fontSize: 13, margin: "8px 0" },
  googleBtn: { alignSelf: "center", background: "none", border: "none", cursor: "pointer", marginBottom: 12 },
  loginBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  registerLink: { textAlign: "center", fontSize: 13, color: "#555", marginTop: 14 },
  link: { color: "#2e7d32", fontWeight: 700, cursor: "pointer" },
};