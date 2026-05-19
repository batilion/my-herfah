import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

function SelectAccountType() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F8FAF8", direction: "rtl"
    }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}>حرفة</h1>
        <p style={{ color: COLORS.textSecondary, fontSize: 14, marginTop: 8 }}>اختر نوع حسابك للمتابعة</p>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {/* بطاقة العميل */}
        <div
          onClick={() => navigate("/client/login")}
          style={{
            width: 200, padding: 32, background: "white",
            border: `2px solid ${COLORS.border}`, borderRadius: 16,
            textAlign: "center", cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.primary}
          onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
        >
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#E8F5EE", margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
          }}>👤</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>عميل</h3>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>أبحث عن خدمة صيانة</p>
        </div>

        {/* بطاقة الفني */}
        <div
          onClick={() => navigate("/tech/login")}
          style={{
            width: 200, padding: 32, background: "white",
            border: `2px solid ${COLORS.border}`, borderRadius: 16,
            textAlign: "center", cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.primary}
          onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
        >
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#E3F2FD", margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
          }}>🔧</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>فني</h3>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>أقدم خدمات صيانة</p>
        </div>
      </div>
    </div>
  );
}

export default SelectAccountType;