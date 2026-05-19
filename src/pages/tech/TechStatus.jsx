import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

function TechStatus() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [rating] = useState(4.8);
  const [completedJobs] = useState(127);

  useEffect(() => {
    const token = localStorage.getItem("techToken");
    if (!token) navigate("/tech/login");
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8", direction: "rtl" }}>
      {/* Header */}
      <div style={{
        background: "white", borderBottom: `1px solid ${COLORS.border}`,
        padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>حالتي</h2>
        <button
          onClick={() => navigate("/tech/dashboard")}
          style={{
            padding: "8px 16px", background: "#F5F5F5", color: COLORS.textPrimary,
            border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
          }}
        >← الرجوع</button>
      </div>

      <div style={{ padding: 28, maxWidth: 480, margin: "0 auto" }}>
        {/* Status Card */}
        <div style={{
          background: "white", border: `1px solid ${COLORS.border}`,
          borderRadius: 16, padding: 28, marginBottom: 20, textAlign: "center"
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: isOnline ? "#E8F5EE" : "#F5F5F5",
            margin: "0 auto 16px", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 36
          }}>🔧</div>
          <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>محمد الفني</h3>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: COLORS.textSecondary }}>فني سباكة</p>

          {/* Toggle */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 8
          }}>
            <span style={{ fontSize: 14, color: COLORS.textSecondary }}>غير متاح</span>
            <div
              onClick={() => setIsOnline(!isOnline)}
              style={{
                width: 52, height: 28, borderRadius: 14,
                background: isOnline ? COLORS.primary : "#E0E0E0",
                cursor: "pointer", position: "relative", transition: "background 0.3s"
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "white",
                position: "absolute", top: 3,
                right: isOnline ? 3 : "auto",
                left: isOnline ? "auto" : 3,
                transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
              }} />
            </div>
            <span style={{ fontSize: 14, color: isOnline ? COLORS.primary : COLORS.textSecondary, fontWeight: isOnline ? 600 : 400 }}>
              متاح
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>
            {isOnline ? "✅ أنت متاح لاستقبال الطلبات" : "⏸ أنت غير متاح حالياً"}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{
            background: "white", border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: 20, textAlign: "center"
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: COLORS.textSecondary }}>التقييم</p>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#F59E0B" }}>⭐ {rating}</p>
          </div>
          <div style={{
            background: "white", border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: 20, textAlign: "center"
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: COLORS.textSecondary }}>مهام مكتملة</p>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: COLORS.primary }}>{completedJobs}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          {[
            { icon: "📋", label: "طلباتي", action: () => navigate("/tech/dashboard") },
            { icon: "👤", label: "الملف الشخصي", action: () => {} },
            { icon: "🔔", label: "الإشعارات", action: () => {} },
            { icon: "🚪", label: "تسجيل الخروج", action: () => { localStorage.removeItem("techToken"); navigate("/tech/login"); }, danger: true },
          ].map((item, i) => (
            <div
              key={i} onClick={item.action}
              style={{
                padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
                cursor: "pointer", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none",
                color: item.danger ? COLORS.danger : COLORS.textPrimary
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
              <span style={{ marginRight: "auto", color: COLORS.textSecondary }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStatus;