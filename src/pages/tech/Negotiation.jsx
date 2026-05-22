import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const PRIMARY_LIGHT = "#e8f5e9";
const DANGER = "#c0392b";

export default function Negotiation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ description: "", price: "" });

  const s = {
    page: { minHeight: "100vh", background: "#f0f4f0", fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl", display: "flex" },
    sidebar: {
      width: 180, background: "#fff", borderLeft: "1px solid #eee",
      display: "flex", flexDirection: "column", padding: "20px 0",
      boxShadow: "-2px 0 8px rgba(0,0,0,0.05)",
    },
    sideTitle: { fontSize: 13, color: "#888", padding: "0 16px 16px", fontWeight: 600, borderBottom: "1px solid #f0f0f0", marginBottom: 8 },
    sideItem: {
      display: "flex", alignItems: "center", justifyContent: "flex-end",
      gap: 10, padding: "12px 16px", cursor: "pointer", fontSize: 14, color: "#555",
      transition: "background 0.15s",
    },
    sideItemActive: {
      display: "flex", alignItems: "center", justifyContent: "flex-end",
      gap: 10, padding: "12px 16px", cursor: "pointer", fontSize: 14,
      color: PRIMARY, background: PRIMARY_LIGHT, fontWeight: 700,
    },
    sideLogout: {
      display: "flex", alignItems: "center", justifyContent: "flex-end",
      gap: 10, padding: "12px 16px", cursor: "pointer", fontSize: 14,
      color: DANGER, marginTop: "auto",
    },
    main: { flex: 1, display: "flex", flexDirection: "column" },
    navbar: {
      backgroundColor: PRIMARY, padding: "0 20px", height: 52,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    navTitle: { color: "#fff", fontSize: 17, fontWeight: 700 },
    menuBtn: {
      background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
    },
    navLeft: { display: "flex", alignItems: "center", gap: 10 },
    userInfo: { textAlign: "right" },
    userName: { color: "#fff", fontSize: 13, fontWeight: 700 },
    userSub: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
    bellBadge: {
      position: "absolute", top: -4, right: -4, background: DANGER,
      color: "#fff", fontSize: 9, borderRadius: "50%", width: 15, height: 15,
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
    },
    content: { flex: 1, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    card: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    cardTitle: { fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 16, textAlign: "right" },
    summaryRow: {
      display: "flex", justifyContent: "space-between",
      padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: 14,
    },
    summaryKey: { color: "#888" },
    summaryVal: { color: "#333", fontWeight: 600 },
    statusBadge: { color: "#e67e22", fontWeight: 700 },
    tipsCard: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginTop: 0 },
    tipItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12, fontSize: 13, color: "#444", textAlign: "right" },
    tipDot: { width: 8, height: 8, borderRadius: "50%", background: PRIMARY, marginTop: 5, flexShrink: 0 },
    detailsCard: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    detailsHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
    fieldGroup: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 },
    label: { fontSize: 13, color: "#c0392b", fontWeight: 700, textAlign: "right" },
    textarea: {
      border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px",
      fontSize: 14, fontFamily: "'Cairo',sans-serif", textAlign: "right",
      outline: "none", resize: "vertical", minHeight: 100,
      width: "100%", boxSizing: "border-box",
    },
    priceRow: { display: "flex", alignItems: "center", gap: 8 },
    priceInput: {
      flex: 1, border: "1.5px solid #ddd", borderRadius: 8, padding: "9px 12px",
      fontSize: 14, fontFamily: "'Cairo',sans-serif", textAlign: "right",
      outline: "none", background: "#fafafa",
    },
    currencyBadge: {
      background: PRIMARY, color: "#fff", borderRadius: 8,
      padding: "9px 14px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
    },
    hint: { fontSize: 12, color: "#aaa", textAlign: "right", marginTop: 4 },
    actions: { display: "flex", gap: 10, marginTop: 20 },
    cancelBtn: {
      flex: 1, background: DANGER, color: "#fff", border: "none",
      borderRadius: 10, padding: "10px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
    confirmBtn: {
      flex: 1, background: PRIMARY, color: "#fff", border: "none",
      borderRadius: 10, padding: "10px 0", fontSize: 15,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
  };

  const sideItems = [
    { icon: "🏠", label: "الرئيسية", path: "/tech/home" },
    { icon: "📋", label: "الطلبات", path: "/tech/requests", active: true },
    { icon: "💬", label: "الرسائل", path: "#" },
    { icon: "👤", label: "حسابي", path: "/tech/profile" },
  ];

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.sideTitle}>منصة ادارة الطلبات</div>
        {sideItems.map((item) => (
          <div key={item.label}
            style={item.active ? s.sideItemActive : s.sideItem}
            onClick={() => navigate(item.path)}
            onMouseEnter={e => !item.active && (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={e => !item.active && (e.currentTarget.style.background = "transparent")}
          >
            <span>{item.label}</span>
            <span>{item.icon}</span>
          </div>
        ))}
        <div style={s.sideLogout} onClick={() => { localStorage.removeItem("techToken"); navigate("/tech/login"); }}>
          <span>تسجيل الخروج</span>
          <span>↩</span>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        {/* Navbar */}
        <nav style={s.navbar}>
          <button style={s.menuBtn}>☰</button>
          <span style={s.navTitle}>طلب التفاوض</span>
          <div style={s.navLeft}>
            <div style={s.userInfo}>
              <div style={s.userName}>احمد علي</div>
              <div style={s.userSub}>فني معتمد</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 18 }}>👷</span>
              </div>
              <span style={s.bellBadge}>2</span>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div style={s.content}>
          {/* Left col */}
          <div>
            {/* Summary */}
            <div style={s.card}>
              <div style={s.cardTitle}>ملخص الطلب</div>
              {[
                ["نوع الخدمة", "سباكة"],
                ["العميل", "حسن محمد"],
                ["الموقع", "طنطا - الحي الثالث"],
                ["الحالة", <span style={s.statusBadge}>في انتظار القبول</span>],
              ].map(([k, v], i) => (
                <div key={i} style={s.summaryRow}>
                  <span style={s.summaryVal}>{v}</span>
                  <span style={s.summaryKey}>{k}</span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ ...s.tipsCard, marginTop: 16 }}>
              <div style={s.cardTitle}>نصائح للتفاوض</div>
              {[
                "كن واضحاً في وصف المشكلة للحصول على سعر دقيق",
                "حدد سعراً معقولاً يتناسب مع السوق",
                "يمكنك تعديل الطلب قبل تأكيده نهائياً",
              ].map((tip, i) => (
                <div key={i} style={s.tipItem}>
                  <span>{tip}</span>
                  <div style={s.tipDot} />
                </div>
              ))}
            </div>
          </div>

          {/* Right col - Details */}
          <div style={s.detailsCard}>
            <div style={s.detailsHeader}>
              <span style={{ fontSize: 20 }}>📋</span>
              <div style={s.cardTitle}>تفاصيل التفاوض</div>
            </div>

            <div style={s.fieldGroup}>
              <label style={s.label}>* الوصف</label>
              <textarea
                style={s.textarea}
                placeholder="اكتب بيانات التفاوض، اذكر تفاصيل الخدمة المطلوبة وأي ملاحظات"
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div style={s.fieldGroup}>
              <label style={s.label}>* السعر المطلوب</label>
              <div style={s.priceRow}>
                <input
                  style={s.priceInput}
                  placeholder=""
                  value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  type="number"
                />
                <span style={s.currencyBadge}>جنيه مصري</span>
              </div>
            </div>

            <div style={s.actions}>
              <button style={s.cancelBtn} onClick={() => navigate("/tech/requests")}>الغاء</button>
              <button style={s.confirmBtn} onClick={() => navigate("/tech/requests")}>تأكيد</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}