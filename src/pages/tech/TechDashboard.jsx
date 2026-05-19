import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

function StatusBadge({ status }) {
  const map = {
    "مكتمل":       { bg: "#E8F5EE", color: "#1B6B3A" },
    "قيد التنفيذ": { bg: "#FFF8E1", color: "#F59E0B" },
    "جديد":        { bg: "#E3F2FD", color: "#1565C0" },
    "ملغي":        { bg: "#F5F5F5", color: "#6B7280" },
  };
  const style = map[status] || { bg: "#F5F5F5", color: "#6B7280" };
  return (
    <span style={{ background: style.bg, color: style.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

const mockOrders = [
  { id: "#TR-8842", client: "حسن محمد", service: "سباكة", date: "22 مايو 2024", status: "جديد", price: "250 جنيه", address: "المعادي، القاهرة" },
  { id: "#TR-8830", client: "إسلام محمد", service: "سباكة", date: "20 مايو 2024", status: "مكتمل", price: "480 جنيه", address: "مدينة نصر، القاهرة" },
  { id: "#TR-8820", client: "سارة أحمد", service: "سباكة", date: "18 مايو 2024", status: "ملغي", price: "120 جنيه", address: "الزمالك، القاهرة" },
];

function TechDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [techName] = useState("محمد الفني");

  useEffect(() => {
    const token = localStorage.getItem("techToken");
    if (!token) navigate("/tech/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("techToken");
    navigate("/tech/login");
  };

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === "مكتمل").length,
    pending: orders.filter(o => o.status === "جديد" || o.status === "قيد التنفيذ").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8", direction: "rtl" }}>
      {/* Header */}
      <div style={{
        background: "white", borderBottom: `1px solid ${COLORS.border}`,
        padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>حرفة</h2>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>بوابة الفنيين</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, color: COLORS.textPrimary, fontWeight: 600 }}>أهلاً، {techName}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px", background: "#FFEBEE", color: COLORS.danger,
              border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}
          >خروج</button>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: COLORS.textPrimary }}>لوحة التحكم</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "4px 0 0" }}>مرحباً! إليك طلباتك الحالية</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { label: "إجمالي الطلبات", value: stats.total, bg: "#E3F2FD", color: "#1565C0" },
            { label: "طلبات مكتملة", value: stats.completed, bg: "#E8F5EE", color: "#1B6B3A" },
            { label: "طلبات جديدة", value: stats.pending, bg: "#FFF8E1", color: "#F59E0B" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "white", border: `1px solid ${COLORS.border}`,
              borderRadius: 12, padding: 20
            }}>
              <p style={{ color: COLORS.textSecondary, fontSize: 12, margin: "0 0 4px" }}>{s.label}</p>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>طلباتي</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.map((o, i) => (
              <div key={i} style={{
                border: `1px solid ${COLORS.border}`, borderRadius: 10,
                padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: COLORS.primary }}>{o.id}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600 }}>{o.client}</p>
                  <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>📍 {o.address} • {o.date}</p>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>{o.price}</p>
                  {o.status === "جديد" && (
                    <button
                      onClick={() => setOrders(orders.map((ord, idx) => idx === i ? { ...ord, status: "قيد التنفيذ" } : ord))}
                      style={{
                        padding: "6px 14px", background: COLORS.primary, color: "white",
                        border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer"
                      }}
                    >قبول الطلب</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechDashboard;