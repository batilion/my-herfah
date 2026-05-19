import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { COLORS } from "../../styles/colors";

const services = ["كهرباء", "سباكة", "نجارة", "نظافة", "تكييف", "دهانات", "أجهزة", "حدادة"];

function TechRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", password: "", confirmPassword: "", specialty: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("كلمتا المرور غير متطابقتين");
    if (!form.specialty) return setError("اختر تخصصك");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tech/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, password: form.password, specialty: form.specialty }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "فشل التسجيل");
      localStorage.setItem("techToken", data.token);
      navigate("/tech/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: `1px solid ${COLORS.border}`, fontSize: 14,
    outline: "none", boxSizing: "border-box"
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#F8FAF8", direction: "rtl", padding: 20
    }}>
      <div style={{
        width: 420, background: "white", borderRadius: 16,
        border: `1px solid ${COLORS.border}`, padding: 36
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: COLORS.textPrimary }}>تسجيل فني جديد</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 6 }}>انضم لمنصة حرفة وابدأ شغلك</p>
        </div>

        {error && (
          <div style={{
            background: "#FFEBEE", color: COLORS.danger,
            borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "الاسم كامل", name: "name", type: "text", placeholder: "محمد أحمد" },
            { label: "رقم الهاتف", name: "phone", type: "tel", placeholder: "01xxxxxxxxx" },
            { label: "كلمة المرور", name: "password", type: "password", placeholder: "••••••••" },
            { label: "تأكيد كلمة المرور", name: "confirmPassword", type: "password", placeholder: "••••••••" },
          ].map(f => (
            <div key={f.name}>
              <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, display: "block", marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                name={f.name} type={f.type} value={form[f.name]}
                onChange={handleChange} placeholder={f.placeholder} required
                style={inputStyle}
              />
            </div>
          ))}

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, display: "block", marginBottom: 8 }}>
              التخصص
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {services.map(s => (
                <button
                  key={s} type="button"
                  onClick={() => setForm({ ...form, specialty: s })}
                  style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                    border: `1.5px solid ${form.specialty === s ? COLORS.primary : COLORS.border}`,
                    background: form.specialty === s ? "#E8F5EE" : "white",
                    color: form.specialty === s ? COLORS.primary : COLORS.textSecondary,
                    fontWeight: form.specialty === s ? 600 : 400
                  }}
                >{s}</button>
              ))}
            </div>
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
            {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textSecondary, marginTop: 20 }}>
          عندك حساب؟{" "}
          <Link to="/tech/login" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}>
            سجل دخول
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TechRegister;