import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const ROLES = ["Super", "Operations", "Moderator"];

const PERMISSIONS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "createAdmin", label: "Create admin" },
  { key: "acceptTechnicians", label: "accept technicians" },
  { key: "handleReports", label: "handle reports" },
  { key: "createCategory", label: "create category" },
];

const DEFAULT_ROLE_PERMISSIONS = {
  Super:      { dashboard: true,  createAdmin: true,  acceptTechnicians: true,  handleReports: true,  createCategory: true  },
  Operations: { dashboard: true,  createAdmin: false, acceptTechnicians: true,  handleReports: false, createCategory: false },
  Moderator:  { dashboard: true,  createAdmin: true,  acceptTechnicians: false, handleReports: true,  createCategory: false },
};

function CreateAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    phone: "",
    email: "",
    password: "",
    contractDate: "",
    role: "",
  });

  const [permissions, setPermissions] = useState({
    Super:      { ...DEFAULT_ROLE_PERMISSIONS.Super },
    Operations: { ...DEFAULT_ROLE_PERMISSIONS.Operations },
    Moderator:  { ...DEFAULT_ROLE_PERMISSIONS.Moderator },
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date(2023, 3, 1)); // April 2023

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
  };

  const handlePermissionToggle = (role, key) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: { ...prev[role], [key]: !prev[role][key] },
    }));
  };

  const handleDayClick = (day) => {
    const d = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    const formatted = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
    setForm({ ...form, contractDate: formatted });
    setShowCalendar(false);
  };

  const prevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const inputStyle = {
    width: "100%",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    background: "white",
    textAlign: "right",
    fontFamily: "inherit",
  };

  const labelStyle = {
    fontSize: 13,
    color: "#333",
    fontWeight: 500,
    marginBottom: 4,
    display: "block",
    textAlign: "right",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />

        <div style={{ padding: 28 }}>
          <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 32, maxWidth: 680, margin: "0 auto" }}>

            {/* Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>الاسم الأول</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>الاسم الثاني</label>
                <input name="secondName" value={form.secondName} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>الاسم الثالث</label>
                <input name="thirdName" value={form.thirdName} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {/* Contract Date */}
              <div style={{ position: "relative" }}>
                <label style={labelStyle}>تاريخ العقد</label>
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  style={{ ...inputStyle, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ color: form.contractDate ? "#333" : "#aaa" }}>
                    {form.contractDate || "اختر التاريخ"}
                  </span>
                  <span>📅</span>
                </div>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0, zIndex: 100,
                    background: "white", border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, padding: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    minWidth: 280, marginTop: 4,
                  }}>
                    {/* Month Navigation */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>‹</button>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>
                        {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                      </span>
                      <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>›</button>
                    </div>

                    {/* Day Names */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
                      {dayNames.map(d => (
                        <div key={d} style={{ textAlign: "center", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600, padding: "4px 0" }}>{d}</div>
                      ))}
                    </div>

                    {/* Days */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                      {Array(getFirstDayOfMonth(calendarDate.getFullYear(), calendarDate.getMonth())).fill(null).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array(getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth())).fill(null).map((_, i) => {
                        const day = i + 1;
                        const isSelected = form.contractDate === `${calendarDate.getFullYear()}/${String(calendarDate.getMonth() + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
                        return (
                          <div
                            key={day}
                            onClick={() => handleDayClick(day)}
                            style={{
                              textAlign: "center", fontSize: 12, padding: "6px 0",
                              borderRadius: 6, cursor: "pointer",
                              background: isSelected ? COLORS.primary : "transparent",
                              color: isSelected ? "white" : "#333",
                            }}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>رقم الهاتف</label>
                <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>بريد العمل</label>
                <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>كلمة المرور</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Permissions Table */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ ...labelStyle, marginBottom: 10 }}>الصلاحيات</label>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8FAF8" }}>
                      <th style={{ padding: "10px 14px", fontSize: 12, color: COLORS.textSecondary, textAlign: "right", fontWeight: 600 }}></th>
                      {PERMISSIONS.map(p => (
                        <th key={p.key} style={{ padding: "10px 8px", fontSize: 11, color: COLORS.textSecondary, textAlign: "center", fontWeight: 600 }}>{p.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROLES.map((role, ri) => (
                      <tr key={role} style={{ borderTop: `1px solid ${COLORS.border}`, background: ri % 2 === 0 ? "white" : "#FAFAFA" }}>
                        <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600 }}>{role} admin</td>
                        {PERMISSIONS.map(p => (
                          <td key={p.key} style={{ padding: "10px 8px", textAlign: "center" }}>
                            <input
                              type="checkbox"
                              checked={permissions[role][p.key]}
                              onChange={() => handlePermissionToggle(role, p.key)}
                              style={{ accentColor: COLORS.primary, width: 15, height: 15, cursor: "pointer" }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Dropdown */}
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>الوظيفة</label>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
                {ROLES.map((role) => (
                  <div
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "10px 16px", cursor: "pointer",
                      background: form.role === role ? COLORS.primaryLight : "white",
                      borderBottom: `1px solid ${COLORS.border}`,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: form.role === role ? COLORS.primary : "#333", fontWeight: form.role === role ? 600 : 400 }}>{role}</span>
                    <span style={{ color: COLORS.textSecondary }}>‹</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => navigate("/admin/dashboard")}
                style={{
                  background: COLORS.primary, color: "white",
                  border: "none", borderRadius: 8,
                  padding: "11px 60px", fontSize: 15,
                  fontWeight: 600, cursor: "pointer",
                }}
              >
                تأكيد
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;