import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const DANGER = "#c0392b";

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function CalendarPicker({ value, onChange }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(value ? value.getMonth() : today.getMonth());
  const [viewYear, setViewYear]   = useState(value ? value.getFullYear() : today.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) =>
    value && value.getDate() === d &&
    value.getMonth() === viewMonth &&
    value.getFullYear() === viewYear;

  return (
    <div style={{ border: "1.5px solid #ddd", borderRadius: 10, padding: 12, background: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <button onClick={nextMonth} style={navBtnStyle}>›</button>
        <div style={{ display: "flex", gap: 6 }}>
          <select value={viewMonth} onChange={e => setViewMonth(+e.target.value)}
            style={{ border: "1px solid #ddd", borderRadius: 6, padding: "2px 6px", fontFamily: "'Cairo', sans-serif", fontSize: 13 }}>
            {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={viewYear} onChange={e => setViewYear(+e.target.value)}
            style={{ border: "1px solid #ddd", borderRadius: 6, padding: "2px 6px", fontFamily: "'Cairo', sans-serif", fontSize: 13 }}>
            {Array.from({ length: 80 }, (_, i) => today.getFullYear() - i).map(y =>
              <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button onClick={prevMonth} style={navBtnStyle}>‹</button>
      </div>
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#888", fontWeight: 700 }}>{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((d, i) => (
          <div key={i} onClick={() => d && onChange(new Date(viewYear, viewMonth, d))}
            style={{
              textAlign: "center", padding: "5px 0", borderRadius: 6, fontSize: 13, cursor: d ? "pointer" : "default",
              background: isSelected(d) ? PRIMARY : "transparent",
              color: isSelected(d) ? "#fff" : d ? "#333" : "transparent",
              fontWeight: isSelected(d) ? 700 : 400,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => d && !isSelected(d) && (e.currentTarget.style.background = "#e8f5e9")}
            onMouseLeave={e => d && !isSelected(d) && (e.currentTarget.style.background = "transparent")}
          >
            {d || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

const navBtnStyle = {
  background: "none", border: "none", fontSize: 20,
  cursor: "pointer", color: "#555", padding: "0 6px",
};

const s = {
  page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl" },
  navbar: {
    backgroundColor: PRIMARY, padding: "0 20px", height: 60,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  brand: { color: "#fff", fontSize: 22, fontWeight: 700 },
  navLinks: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: {
    background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
    color: "#fff", padding: "6px 16px", fontSize: 14,
    fontFamily: "'Cairo',sans-serif", cursor: "pointer",
  },
  navBtnActive: {
    background: "rgba(255,255,255,0.35)", border: "none", borderRadius: 8,
    color: "#fff", padding: "6px 16px", fontSize: 14,
    fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
  },
  bellBadge: {
    position: "absolute", top: -4, right: -4, background: DANGER,
    color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16,
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
  },
  container: { maxWidth: 680, margin: "30px auto", padding: "0 16px" },
  card: { background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" },
  nameRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 },
  label: { fontSize: 13, color: "#555", fontWeight: 600, textAlign: "right" },
  input: {
    border: "1.5px solid #ddd", borderRadius: 8, padding: "9px 12px",
    fontSize: 14, fontFamily: "'Cairo',sans-serif", textAlign: "right",
    outline: "none", background: "#fafafa", color: "#333",
    width: "100%", boxSizing: "border-box",
  },
  inputFocus: { border: `1.5px solid ${PRIMARY}`, background: "#fff" },
  inputWithIcon: { position: "relative" },
  icon: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#888" },
  serviceDropdown: {
    border: "1.5px solid #ddd", borderRadius: 8, padding: "9px 12px",
    fontSize: 14, fontFamily: "'Cairo',sans-serif", textAlign: "right",
    background: "#fafafa", width: "100%", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  serviceOptions: {
    border: "1.5px solid #ddd", borderRadius: 8, marginTop: 4,
    background: "#fff", overflow: "hidden",
  },
  serviceOption: {
    display: "flex", alignItems: "center", justifyContent: "flex-end",
    gap: 10, padding: "10px 14px", cursor: "pointer",
    borderBottom: "1px solid #f0f0f0", fontSize: 14,
  },
  actions: { display: "flex", gap: 12, marginTop: 24 },
  cancelBtn: {
    flex: 1, background: DANGER, color: "#fff", border: "none",
    borderRadius: 10, padding: "12px 0", fontSize: 15,
    fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
  },
  confirmBtn: {
    flex: 1, background: PRIMARY, color: "#fff", border: "none",
    borderRadius: 10, padding: "12px 0", fontSize: 15,
    fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
  },
};

const SERVICES = ["سباكة", "كهرباء", "نقاشة", "جص"];

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "Hussein", secondName: "Mohamed", lastName: "El-Husseiny",
    email: "Hussein.rakha.2023@gmail.com", phone: "01113253452", service: "سباكة",
  });
  const [birthDate, setBirthDate] = useState(new Date(1993, 8, 9));
  const [showServices, setShowServices] = useState(false);

  const handleChange = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const formatDate = d =>
    d ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` : "";

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={s.navbar}>
        <div style={s.navLinks}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22, color: "#fff" }}>🔔</span>
            <span style={s.bellBadge}>2</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>👷</span>
          </div>
        </div>
        <div style={s.navLinks}>
          <button style={s.navBtn} onClick={() => navigate("/tech/home")}>الرئيسية</button>
          <button style={s.navBtn} onClick={() => navigate("/tech/requests")}>الطلبات</button>
          <button style={s.navBtnActive}>حسابي</button>
        </div>
        <span style={s.brand}>حرفة شُغل</span>
      </nav>

      <div style={s.container}>
        <div style={s.card}>
          {/* Name Row */}
          <div style={s.nameRow}>
            {[["lastName","الاسم الاخر"],["secondName","الاسم الثاني"],["firstName","الاسم الأول"]].map(([f,l]) => (
              <div key={f} style={s.fieldGroup}>
                <label style={s.label}>{l}</label>
                <input style={s.input} value={form[f]} onChange={handleChange(f)} />
              </div>
            ))}
          </div>

          {/* Email */}
          <div style={s.fieldGroup}>
            <label style={s.label}>البريد الالكتروني</label>
            <div style={s.inputWithIcon}>
              <input style={s.input} value={form.email} onChange={handleChange("email")} />
              <span style={s.icon}>✉️</span>
            </div>
          </div>

          {/* Calendar */}
          <div style={s.fieldGroup}>
            <label style={s.label}>تاريخ الميلاد</label>
            <CalendarPicker value={birthDate} onChange={setBirthDate} />
          </div>

          {/* Phone */}
          <div style={s.fieldGroup}>
            <label style={s.label}>رقم الهاتف</label>
            <div style={s.inputWithIcon}>
              <input style={s.input} value={form.phone} onChange={handleChange("phone")} />
              <span style={s.icon}>📞</span>
            </div>
          </div>

          {/* Service */}
          <div style={s.fieldGroup}>
            <label style={s.label}>نوع الخدمة</label>
            <div style={s.serviceDropdown} onClick={() => setShowServices(v => !v)}>
              <span>▾</span>
              <span>{form.service}</span>
            </div>
            {showServices && (
              <div style={s.serviceOptions}>
                {SERVICES.map(sv => (
                  <div key={sv} style={s.serviceOption}
                    onClick={() => { setForm(p => ({ ...p, service: sv })); setShowServices(false); }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f0f0"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span>{sv}</span>
                    <input type="radio" readOnly checked={form.service === sv}
                      style={{ accentColor: PRIMARY }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={s.actions}>
            <button style={s.cancelBtn} onClick={() => navigate("/tech/profile")}>إلغاء</button>
            <button style={s.confirmBtn} onClick={() => navigate("/tech/profile")}>تاكيد</button>
          </div>
        </div>
      </div>
    </div>
  );
}