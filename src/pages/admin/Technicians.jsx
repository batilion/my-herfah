import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const mockTechnicians = [
  { id: 1, name: "محمد البلقاسي", email: "ahmed.m@example.com", specialty: "نظافة", date: "12 أكتوبر 2023", status: "مقبول", avatar: "MB" },
  { id: 2, name: "إبراهيم رضا", email: "sara.h@example.com", specialty: "كهرباء", date: "14 أكتوبر 2023", status: "قيد المراجعة", avatar: "IR" },
  { id: 3, name: "حمدي محمد", email: "khaled.q@example.com", specialty: "سباكة", date: "15 أكتوبر 2023", status: "مرفوض", avatar: "HM" },
  { id: 4, name: "سيد إبراهيم", email: "yasser.q@example.com", specialty: "دش", date: "16 أكتوبر 2023", status: "مقبول", avatar: "SI" },
];

function StatusBadge({ status }) {
  const map = {
    "مقبول":        { bg: "#E8F5EE", color: "#1B6B3A" },
    "قيد المراجعة": { bg: "#FFF8E1", color: "#F59E0B" },
    "مرفوض":        { bg: "#FFEBEE", color: "#E53935" },
  };
  const style = map[status] || { bg: "#F5F5F5", color: "#6B7280" };
  return (
    <span style={{ background: style.bg, color: style.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function Avatar({ initials }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      background: COLORS.accent,
      color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: 13, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function Technicians() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar active="technicians" />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />
        <div style={{ padding: 28 }}>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: COLORS.textPrimary }}>طلبات تسجيل الفنيين</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "4px 0 0" }}>مراجعة وإدارة طلبات تسجيل الفنيين الجدد</p>
          </div>

          {/* Table */}
          <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.lightGray }}>
                  {["الفني", "البريد الإلكتروني", "التخصص", "تاريخ التسجيل", "الحالة", "إجراء"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, textAlign: "right" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockTechnicians.map((tech) => (
                  <tr key={tech.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>

                    {/* الفني */}
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar initials={tech.avatar} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{tech.name}</span>
                      </div>
                    </td>

                    {/* البريد */}
                    <td style={{ padding: "12px", fontSize: 13, color: COLORS.textSecondary }}>{tech.email}</td>

                    {/* التخصص */}
                    <td style={{ padding: "12px", fontSize: 13 }}>{tech.specialty}</td>

                    {/* التاريخ */}
                    <td style={{ padding: "12px", fontSize: 13, color: COLORS.textSecondary }}>{tech.date}</td>

                    {/* الحالة */}
                    <td style={{ padding: "12px" }}>
                      <StatusBadge status={tech.status} />
                    </td>

                    {/* إجراء */}
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => navigate(`/admin/technicians/${tech.id}`, { state: { technician: tech } })}
                        style={{
                          background: COLORS.primary,
                          color: "white",
                          border: "none",
                          borderRadius: 8,
                          padding: "6px 16px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        عرض التفاصيل
                      </button>
                    </td>

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

export default Technicians;