import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const mockReports = [
  { id: 1, bookingNum: "09127346", user: "حسن محمد", userAvatar: "HM", tech: "محمد البلقاسي", date: "12 مايو 2024", rating: 4, status: "أولوية عالية" },
  { id: 2, bookingNum: "09127347", user: "إسلام محمد", userAvatar: "IM", tech: "رضا محمد", date: "11 مايو 2024", rating: 3, status: "روتين" },
  { id: 3, bookingNum: "09127348", user: "جهاد هشام", userAvatar: "JH", tech: "حمدي إبراهيم", date: "10 مايو 2024", rating: 4, status: "أولوية عالية" },
];

const mostReported = [
  { name: "الكهرباء", count: 42 },
  { name: "السباكة", count: 28 },
  { name: "الدش", count: 15 },
];

function StatusBadge({ status }) {
  const map = {
    "أولوية عالية": { bg: "#FFEBEE", color: "#E53935" },
    "روتين": { bg: "#E3F2FD", color: "#1565C0" },
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
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.primaryLight, color: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Stars({ count }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: 14 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function Reports() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("الكل");

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />
        <div style={{ padding: 28 }}>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>التقييمات والتقارير</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "4px 0 0" }}>نظرة شاملة على البلاغات وشكاوى المستخدمين</p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "بالقون تحت المراجعة", value: "5", color: COLORS.warning },
              { label: "تقارير تم معالجتها", value: "1,240", color: COLORS.success },
              { label: "بلاغات مفتوحة", value: "12", color: COLORS.danger },
              { label: "متوسط التقييم العام", value: "4.8 ★", color: "#F59E0B" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, textAlign: "right" }}>
                <p style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", color: s.color }}>{s.value}</p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>

            {/* Table */}
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["الكل", "التقييمات السلبية", "بلاغات تقنية"].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? COLORS.primary : "white", color: tab === t ? "white" : COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "4px 14px", fontSize: 12, cursor: "pointer" }}>
                    {t}
                  </button>
                ))}
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: COLORS.lightGray }}>
                    {["التاريخ", "المستخدم", "الفني", "الحالة", "التقييم", "الإجراءات"].map(h => (
                      <th key={h} style={{ padding: "10px 8px", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600, textAlign: "right" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockReports.map(r => (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "10px 8px", fontSize: 11, color: COLORS.textSecondary }}>{r.date}</td>
                      <td style={{ padding: "10px 8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Avatar initials={r.userAvatar} />
                          <span style={{ fontSize: 12 }}>{r.user}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 8px", fontSize: 12 }}>{r.tech}</td>
                      <td style={{ padding: "10px 8px" }}><StatusBadge status={r.status} /></td>
                      <td style={{ padding: "10px 8px" }}><Stars count={r.rating} /></td>
                      <td style={{ padding: "10px 8px" }}>
                        <button
                          onClick={() => navigate(`/admin/reports/${r.id}`)}
                          style={{ background: COLORS.primaryLight, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: COLORS.primary }}
                        >
                          👁 عرض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                <span style={{ fontSize: 12, color: COLORS.textSecondary }}>عرض 1-3 من أصل 128 بلاغ</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["‹", "1", "2", "3", "›"].map((p, i) => (
                    <button key={i} style={{ background: p === "1" ? COLORS.primary : "white", color: p === "1" ? "white" : COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 6, width: 28, height: 28, fontSize: 12, cursor: "pointer" }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Most Reported */}
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>أكثر فئات الخدمة بلاغاً</h3>
              {mostReported.map((s, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{s.count} بلاغ</span>
                  </div>
                  <div style={{ background: COLORS.lightGray, borderRadius: 4, height: 8 }}>
                    <div style={{ width: `${(s.count / 42) * 100}%`, background: COLORS.primary, borderRadius: 4, height: 8 }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
