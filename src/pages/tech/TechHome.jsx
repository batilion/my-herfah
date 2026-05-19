import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

const mockWorks = [
  { id: 1, title: "تشطيب شقة", desc: "إصلاح الأعطال الكهربائية والسباكة والنجارة بسرعة واحترافية.", img: "https://placehold.co/280x160/1B6B3A/white?text=عمل+1" },
  { id: 2, title: "تشطيب شقة", desc: "إصلاح الأعطال الكهربائية والسباكة والنجارة بسرعة واحترافية.", img: "https://placehold.co/280x160/1B6B3A/white?text=عمل+2" },
];

function TechHome() {
  const navigate = useNavigate();
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);

  const stats = [
    { label: "عضو منذ", value: "2 سنة", color: COLORS.primary },
    { label: "التقييم", value: "4.5", color: COLORS.primary },
    { label: "أعمال منشورة", value: "3", color: COLORS.primary },
    { label: "طلبات مكتملة", value: "20", color: COLORS.primary },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8", direction: "rtl" }}>

      {/* Header */}
      <div style={{
        background: "#1B6B3A", padding: "14px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>حرفة شغل</span>
        <div style={{ display: "flex", gap: 16 }}>
          {["الرئيسية", "الطلبات", "حسابي"].map(item => (
            <span
              key={item}
              onClick={() => {
                if (item === "الطلبات") navigate("/tech/requests");
                if (item === "حسابي") navigate("/tech/profile");
              }}
              style={{
                color: item === "الرئيسية" ? "white" : "rgba(255,255,255,0.8)",
                fontWeight: item === "الرئيسية" ? 700 : 400,
                fontSize: 14, cursor: "pointer",
                borderBottom: item === "الرئيسية" ? "2px solid white" : "none",
                paddingBottom: 2
              }}
            >{item}</span>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        background: "#1B6B3A", padding: "8px 20px",
        display: "flex", justifyContent: "flex-end"
      }}>
        <span style={{
          background: "white", color: "#1B6B3A",
          borderRadius: 20, padding: "4px 14px",
          fontSize: 12, fontWeight: 600
        }}>جاري المراجعة</span>
      </div>

      <div style={{ padding: 20 }}>

        {/* Profile Card */}
        <div style={{
          background: "white", borderRadius: 12,
          border: `1px solid ${COLORS.border}`, padding: 20,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 16
        }}>
          <button
            onClick={() => setShowAddPortfolio(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, background: "white", cursor: "pointer",
              fontSize: 13, fontWeight: 600, color: COLORS.textPrimary
            }}
          >
            <span style={{ fontSize: 18 }}>+</span> إضافة عمل
          </button>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>أحمد علي</h3>
                <p style={{ margin: "0 0 2px", fontSize: 12, color: COLORS.textSecondary }}>
                  📍 كفر الشيخ - بلا - حي الأهرام
                </p>
                <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>
                  عدد الطلبات المكتملة: 20
                </p>
              </div>
              <img
                src="https://placehold.co/60x60/1B6B3A/white?text=أ"
                alt="avatar"
                style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 12, marginBottom: 24
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "#E8F5EE", borderRadius: 10,
              padding: "14px 10px", textAlign: "center"
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* My Works */}
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, borderRight: `4px solid ${COLORS.primary}`, paddingRight: 10 }}>
            أعمالي
          </h3>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {mockWorks.map(w => (
              <div key={w.id} style={{
                minWidth: 260, borderRadius: 12, overflow: "hidden",
                border: `1px solid ${COLORS.border}`, background: "white", flexShrink: 0
              }}>
                <div style={{ position: "relative" }}>
                  <img src={w.img} alt={w.title} style={{ width: "100%", height: 150, objectFit: "cover" }} />
                  <span style={{
                    position: "absolute", top: 8, left: 8,
                    background: "#1B6B3A", color: "white",
                    fontSize: 11, padding: "3px 10px", borderRadius: 20
                  }}>تشطيب شقة</span>
                </div>
                <div style={{ padding: 12 }}>
                  <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Portfolio Modal */}
      {showAddPortfolio && (
        <AddPortfolioModal onClose={() => setShowAddPortfolio(false)} />
      )}
    </div>
  );
}

// ── Modal إضافة عمل (مدمج في نفس الصفحة) ──
function AddPortfolioModal({ onClose }) {
  const [form, setForm] = useState({ title: "", desc: "" });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, direction: "rtl"
    }}>
      <div style={{
        background: "white", borderRadius: 16,
        padding: 28, width: 480, maxHeight: "90vh", overflowY: "auto"
      }}>
        <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 700, textAlign: "center" }}>
          إضافة عمل
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>العنوان</label>
            <input
              placeholder="مثال: تشطيب شقق، سباكة، كهرباء..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: "1px solid #E0E0E0", fontSize: 14, boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>وصف العمل</label>
            <textarea
              placeholder="اكتب وصفاً تفصيلياً للعمل الذي تقدمه..."
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              rows={4}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: "1px solid #E0E0E0", fontSize: 14,
                resize: "none", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Main Image */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>إضافة صورة رئيسية</label>
            <div style={{
              border: "1.5px dashed #C8E6C9", borderRadius: 10,
              padding: 32, textAlign: "center", cursor: "pointer", background: "#F9FFF9"
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
              <p style={{ margin: 0, fontSize: 12, color: "#9E9E9E" }}>PNG,JPG حتى 5MB</p>
            </div>
          </div>

          {/* Extra Images */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>إضافة الصور</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[1, 2].map(n => (
                <div key={n} style={{
                  border: "1.5px dashed #C8E6C9", borderRadius: 10,
                  padding: 24, textAlign: "center", cursor: "pointer", background: "#F9FFF9"
                }}>
                  <div style={{ fontSize: 22 }}>📷</div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#9E9E9E" }}>صورة إضافية</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: 12, background: "#E53935", color: "white",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}
            >إلغاء</button>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: 12, background: "#1B6B3A", color: "white",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}
            >تأكيد</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechHome;