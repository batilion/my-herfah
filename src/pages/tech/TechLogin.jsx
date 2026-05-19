import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { COLORS } from "../../styles/colors";

function TechLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tech/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "فشل تسجيل الدخول");
      localStorage.setItem("techToken", data.token);
      navigate("/tech/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#F8FAF8", direction: "rtl"
    }}>
      <div style={{
        width: 380, background: "white", borderRadius: 16,
        border: `1px solid ${COLORS.border}`, padding: 36
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: COLORS.textPrimary }}>تسجيل دخول الفني</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 6 }}>أدخل بياناتك للمتابعة</p>
        </div>

        {error && (
          <div style={{
            background: "#FFEBEE", color: COLORS.danger,
            borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, display: "block", marginBottom: 6 }}>
              رقم الهاتف
            </label>
            <input
              name="phone" value={form.phone} onChange={handleChange}
              placeholder="01xxxxxxxxx" required
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: `1px solid ${COLORS.border}`, fontSize: 14,
                outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, display: "block", marginBottom: 6 }}>
              كلمة المرور
            </label>
            <input
              name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="••••••••" required
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: `1px solid ${COLORS.border}`, fontSize: 14,
                outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "12px", background: COLORS.primary,
              color: "white", border: "none", borderRadius: 8,
              fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, marginTop: 4
            }}
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textSecondary, marginTop: 20 }}>
          مش عندك حساب؟{" "}
          <Link to="/tech/register" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}>
            سجل دلوقتي
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TechLogin;