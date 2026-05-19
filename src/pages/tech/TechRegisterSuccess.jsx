import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

function TechRegisterSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#F8FAF8", direction: "rtl"
    }}>
      <div style={{
        background: "white", borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        padding: 48, textAlign: "center", width: 360
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#1B6B3A", margin: "0 auto 24px",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ color: "white", fontSize: 36 }}>✓</span>
        </div>

        <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: COLORS.textPrimary }}>
          تم التسجيل بنجاح
        </h2>
        <p style={{ margin: "0 0 32px", fontSize: 13, color: COLORS.textSecondary }}>
          سيتم مراجعة بياناتك خلال 24 إلى 48 ساعة
        </p>

        <button
          onClick={() => navigate("/tech/home")}
          style={{
            width: "100%", padding: "12px",
            background: "#1B6B3A", color: "white",
            border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}
        >الصفحة الرئيسية</button>
      </div>
    </div>
  );
}

export default TechRegisterSuccess;