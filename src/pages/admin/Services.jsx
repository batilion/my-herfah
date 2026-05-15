import { useState } from "react";
import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const mockServices = [
  { id: 1, name: "الكهرباء", avgPrice: "150 جنيه", requests: 428, status: "نشط" },
  { id: 2, name: "السباكة", avgPrice: "300 جنيه", requests: 215, status: "نشط" },
  { id: 3, name: "النقاشة", avgPrice: "500 جنيه", requests: 89, status: "موقوف مؤقتاً" },
  { id: 4, name: "الدش", avgPrice: "250 جنيه", requests: 562, status: "نشط" },
];

const serviceCards = [
  { name: "الكهرباء", desc: "توصيلات وتركيب أجهزة كهربائية", count: 60, icon: "⚡" },
  { name: "السباكة", desc: "تنظيف مجاري وتركيب معدات", count: 67, icon: "🔧" },
  { name: "التنظيف", desc: "تنظيف شامل ومكافحة حشرات", count: 42, icon: "🧹" },
  { name: "التكييف", desc: "تركيب وصيانة المكيفات", count: 45, icon: "❄" },
];

function StatusBadge({ status }) {
  const map = {
    "نشط": { bg: "#E8F5EE", color: "#1B6B3A" },
    "موقوف مؤقتاً": { bg: "#FFF8E1", color: "#F59E0B" },
  };
  const style = map[status] || { bg: "#F5F5F5", color: "#6B7280" };
  return (
    <span style={{ background: style.bg, color: style.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function Services() {
  const [showModal, setShowModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />
        <div style={{ padding: 28 }}>

          {/* Title */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>إدارة الخدمات</h2>
              <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "4px 0 0" }}>نظرة عامة على هيكل الخدمات</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{ background: COLORS.primary, color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              + إضافة فئة جديدة
            </button>
          </div>

          {/* Service Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {serviceCards.map(s => (
              <div key={s.name} style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{s.name}</h3>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: COLORS.textSecondary }}>{s.desc}</p>
                <div style={{ background: COLORS.lightGray, borderRadius: 6, padding: "6px 12px" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>{s.count} فني نشط</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>قائمة الخدمات التفصيلية</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.lightGray }}>
                  {["اسم الخدمة", "متوسط السعر", "الحالة", "الطلبات", "الإجراءات"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, textAlign: "right" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockServices.map(s => (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px", fontSize: 13, fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: "12px", fontSize: 13 }}>{s.avgPrice}</td>
                    <td style={{ padding: "12px" }}><StatusBadge status={s.status} /></td>
                    <td style={{ padding: "12px", fontSize: 13 }}>{s.requests}</td>
                    <td style={{ padding: "12px" }}>
                      <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: COLORS.primary }}>
                        ✏ تعديل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 32, width: 440, direction: "rtl" }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 700, textAlign: "center" }}>إضافة فئة خدمات جديدة</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: COLORS.textSecondary, fontSize: 13, marginBottom: 6 }}>اسم الفئة</label>
              <input value={catName} onChange={e => setCatName(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: COLORS.textSecondary, fontSize: 13, marginBottom: 6 }}>تفاصيل الفئة</label>
              <textarea value={catDesc} onChange={e => setCatDesc(e.target.value)} rows={3} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", resize: "none" }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", color: COLORS.textSecondary, fontSize: 13, marginBottom: 6 }}>إضافة صورة غلاف</label>
              <div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: 8, padding: 32, textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                <p style={{ margin: 0, fontSize: 13, color: COLORS.textSecondary }}>اضغط لرفع الصورة</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ background: COLORS.danger, color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>إلغاء</button>
              <button onClick={() => setShowModal(false)} style={{ background: COLORS.primary, color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>تأكيد</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Services;