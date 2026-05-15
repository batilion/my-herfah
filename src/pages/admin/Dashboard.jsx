import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const weeklyData = [140, 180, 120, 220, 190, 160, 100];
const weekDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const recentOrders = [
  { id: "#TR-8842", client: "حسن محمد", tech: "نظافة", date: "22 مايو 2024", status: "مكتمل", price: "250 جنيه" },
  { id: "#TR-8841", client: "إسلام محمد", tech: "سباكة", date: "22 مايو 2024", status: "قيد التنفيذ", price: "480 جنيه" },
  { id: "#TR-8840", client: "جهاد هشام", tech: "كهرباء", date: "21 مايو 2024", status: "ملغي", price: "120 جنيه" },
];

const recentActivity = [
  { user: "سامي محمد", action: "أكمل طلب سباكة", time: "منذ 4 دقائق", avatar: "SM", type: "success" },
  { user: "علي أحمد", action: "سجل كفني كهرباء", time: "منذ 34 دقيقة", avatar: "AA", type: "info" },
  { user: "جهاد هشام", action: "بلاغ جديد من الفنيين", time: "أمبارح 11:28 ص", avatar: "JH", type: "danger" },
];

function StatusBadge({ status }) {
  const map = {
    "مكتمل":       { bg: "#E8F5EE", color: "#1B6B3A" },
    "قيد التنفيذ": { bg: "#FFF8E1", color: "#F59E0B" },
    "ملغي":        { bg: "#F5F5F5", color: "#6B7280" },
  };
  const style = map[status] || { bg: "#F5F5F5", color: "#6B7280" };
  return (
    <span style={{ background: style.bg, color: style.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function Avatar({ initials, size = 36, bg = "#E3F2FD", color = COLORS.primary }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function BarChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160, padding: "0 8px" }}>
      {data.map((val, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: Math.round((val / max) * 130), background: i === 3 ? COLORS.primary : "#C8E6C9", borderRadius: "4px 4px 0 0" }} />
          <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar active="dashboard" />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />
        <div style={{ padding: 28 }}>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: COLORS.textPrimary }}>لوحة التحكم</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "4px 0 0" }}>مرحباً بك! إليك نظرة سريعة على أداء المنصة</p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <p style={{ color: COLORS.textSecondary, fontSize: 12, margin: "0 0 4px" }}>طلبات مكتملة</p>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>28</p>
            </div>
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <p style={{ color: COLORS.textSecondary, fontSize: 12, margin: "0 0 4px" }}>الإيرادات الشهرية</p>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>45,280 جنيه</p>
            </div>
          </div>

          {/* Chart + Activity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>حجم الطلبات الأسبوعي</h3>
              <BarChart data={weeklyData} labels={weekDays} />
            </div>
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>النشاط الأخير</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar
                      initials={a.avatar}
                      size={34}
                      bg={a.type === "success" ? "#E8F5EE" : a.type === "danger" ? "#FFEBEE" : "#E3F2FD"}
                      color={a.type === "success" ? COLORS.success : a.type === "danger" ? COLORS.danger : "#1565C0"}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{a.user}</p>
                      <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>{a.action}</p>
                    </div>
                    <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>أخر طلبات الخدمات</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.lightGray }}>
                  {["رقم الطلب", "العميل", "الفئة", "التاريخ", "الحالة", "القيمة"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, textAlign: "right" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px", fontSize: 13, fontWeight: 600, color: COLORS.primary }}>{o.id}</td>
                    <td style={{ padding: "12px", fontSize: 13 }}>{o.client}</td>
                    <td style={{ padding: "12px", fontSize: 13 }}>{o.tech}</td>
                    <td style={{ padding: "12px", fontSize: 13, color: COLORS.textSecondary }}>{o.date}</td>
                    <td style={{ padding: "12px" }}><StatusBadge status={o.status} /></td>
                    <td style={{ padding: "12px", fontSize: 13, fontWeight: 600 }}>{o.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;