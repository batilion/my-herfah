import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

const services = ["سباكة", "كهرباء", "نقاشة", "حش"];

function TechProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "Hussein",
    secondName: "Mohamed",
    lastName: "El-Husseiny",
    email: "Hussein.rakha.2023@gmail.com",
    phone: "01113253452",
    birthDate: "2025-09-13",
    service: "سباكة",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calMonth, setCalMonth] = useState(8); // September = 8 (0-indexed)
  const [calYear, setCalYear] = useState(2025);
  const [selectedDay, setSelectedDay] = useState(13);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthsAr = ["يناير","فبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();

  const renderCalendar = () => {
    const days = getDaysInMonth(calMonth, calYear);
    const firstDay = getFirstDay(calMonth, calYear);
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return cells;
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: "1px solid #E0E0E0", fontSize: 14, boxSizing: "border-box",
    textAlign: "right"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8", direction: "rtl" }}>

      {/* Header */}
      <div style={{
        background: "#1B6B3A", padding: "14px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>حرفة شغل</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["الرئيسية", "الطلبات", "حسابي"].map(item => (
            <span
              key={item}
              onClick={() => {
                if (item === "الرئيسية") navigate("/tech/home");
                if (item === "الطلبات") navigate("/tech/requests");
              }}
              style={{
                color: item === "حسابي" ? "white" : "rgba(255,255,255,0.8)",
                fontWeight: item === "حسابي" ? 700 : 400,
                fontSize: 14, cursor: "pointer",
                borderBottom: item === "حسابي" ? "2px solid white" : "none",
                paddingBottom: 2
              }}
            >{item}</span>
          ))}
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 20, color: "white", cursor: "pointer" }}>🔔</span>
            <span style={{
              position: "absolute", top: -4, right: -4,
              background: "#E53935", color: "white",
              borderRadius: "50%", width: 16, height: 16,
              fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>2</span>
          </div>
          <img
            src="https://placehold.co/36x36/white/1B6B3A?text=أ"
            style={{ width: 36, height: 36, borderRadius: "50%", cursor: "pointer" }}
            alt="avatar"
          />
        </div>
      </div>

      <div style={{ padding: 28, maxWidth: 560, margin: "0 auto" }}>
        <div style={{
          background: "white", border: `1px solid ${COLORS.border}`,
          borderRadius: 16, padding: 28
        }}>

          {/* Name Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "الاسم الأول", key: "firstName" },
              { label: "الاسم الثاني", key: "secondName" },
              { label: "الاسم الأخير", key: "lastName" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{f.label}</label>
                <input
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>البريد الإلكتروني</label>
            <div style={{ position: "relative" }}>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ ...inputStyle, paddingLeft: 36 }}
              />
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>✏️</span>
            </div>
          </div>

          {/* Birthdate */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>تاريخ الميلاد</label>
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              style={{
                ...inputStyle, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}
            >
              <span style={{ fontSize: 13 }}>{`${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`}</span>
              <span>📅</span>
            </div>

            {showCalendar && (
              <div style={{
                border: "1px solid #E0E0E0", borderRadius: 10,
                padding: 16, marginTop: 8, background: "white"
              }}>
                {/* Month/Year Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ cursor: "pointer", fontSize: 18 }} onClick={() => setCalMonth(m => m === 0 ? 11 : m - 1)}>‹</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select value={calMonth} onChange={e => setCalMonth(Number(e.target.value))}
                      style={{ border: "1px solid #E0E0E0", borderRadius: 6, padding: "2px 6px", fontSize: 13 }}>
                      {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                    <select value={calYear} onChange={e => setCalYear(Number(e.target.value))}
                      style={{ border: "1px solid #E0E0E0", borderRadius: 6, padding: "2px 6px", fontSize: 13 }}>
                      {Array.from({ length: 50 }, (_, i) => 1980 + i).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <span style={{ cursor: "pointer", fontSize: 18 }} onClick={() => setCalMonth(m => m === 11 ? 0 : m + 1)}>›</span>
                </div>

                {/* Day Headers */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#9E9E9E", fontWeight: 600 }}>{d}</div>
                  ))}
                </div>

                {/* Days */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                  {renderCalendar().map((d, i) => (
                    <div
                      key={i}
                      onClick={() => { if (d) { setSelectedDay(d); setShowCalendar(false); } }}
                      style={{
                        textAlign: "center", padding: "6px 0", fontSize: 12,
                        borderRadius: 6, cursor: d ? "pointer" : "default",
                        background: d === selectedDay ? "#1B6B3A" : "transparent",
                        color: d === selectedDay ? "white" : d ? COLORS.textPrimary : "transparent",
                        fontWeight: d === selectedDay ? 700 : 400
                      }}
                    >{d || ""}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>رقم الهاتف</label>
            <div style={{ position: "relative" }}>
              <input
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={{ ...inputStyle, paddingLeft: 36 }}
              />
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📞</span>
            </div>
          </div>

          {/* Service Type */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>نوع الخدمة</label>
            <div style={{
              border: "1px solid #E0E0E0", borderRadius: 8, overflow: "hidden"
            }}>
              <div style={{
                padding: "10px 14px", background: "#F5F5F5",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 14
              }}>
                <span>⌄</span>
                <span>{form.service}</span>
              </div>
              <div style={{ padding: "8px 0" }}>
                {services.map(s => (
                  <div
                    key={s}
                    onClick={() => setForm({ ...form, service: s })}
                    style={{
                      padding: "8px 16px", display: "flex",
                      justifyContent: "space-between", alignItems: "center",
                      cursor: "pointer", fontSize: 14
                    }}
                  >
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: `2px solid ${form.service === s ? "#1B6B3A" : "#9E9E9E"}`,
                      background: form.service === s ? "#1B6B3A" : "white",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {form.service === s && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => navigate("/tech/home")}
              style={{
                flex: 1, padding: 12, background: "#E53935", color: "white",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}
            >إلغاء</button>
            <button
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

export default TechProfile;