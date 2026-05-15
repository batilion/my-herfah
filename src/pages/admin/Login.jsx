import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import logo from "../../assets/logo_herfah.jpg";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("من فضلك اكتب اسم المستخدم وكلمة المرور");
      return;
    }

    // TODO: استبدل ده بالـ API الحقيقي لما يكون جاهز
    localStorage.setItem("adminToken", "mock-token");
    navigate("/admin/dashboard", { replace: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F0F4F0",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Cairo, Tajawal, sans-serif",
      direction: "rtl",
    }}>

      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: "10px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <img src={logo} alt="حرفة شغل" style={{ height: 40, objectFit: "contain" }} />
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>الرئيسية</span>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          background: "white",
          borderRadius: 16,
          padding: 40,
          width: 360,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <img src={logo} alt="حرفة شغل" style={{ width: 140, objectFit: "contain", marginBottom: 10 }} />
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: 0 }}>
              منصة تساعدك في الوصول لفني أو عميل بسهولة
            </p>
          </div>

          <p style={{ textAlign: "center", color: COLORS.textSecondary, fontSize: 13, marginBottom: 20 }}>
            تسجيل الدخول بواسطة الأدمن
          </p>

          {/* رسالة الخطأ */}
          {error && (
            <div style={{
              background: COLORS.danger + "18",
              border: `1px solid ${COLORS.danger}`,
              color: COLORS.danger,
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              textAlign: "center",
              marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              textAlign: "right",
              fontSize: 13,
              color: COLORS.textSecondary,
              marginBottom: 6,
            }}>
              اسم المستخدم
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب اسم المستخدم"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontSize: 14,
                textAlign: "right",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              textAlign: "right",
              fontSize: 13,
              color: COLORS.textSecondary,
              marginBottom: 6,
            }}>
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب كلمة المرور"
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 14px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontSize: 14,
                  textAlign: "right",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: COLORS.textSecondary,
                  fontSize: 16,
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              background: COLORS.primary,
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            تسجيل الدخول
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;