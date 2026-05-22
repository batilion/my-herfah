import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const PRIMARY_LIGHT = "#e8f5e9";
const DANGER = "#c0392b";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Cairo', 'Segoe UI', sans-serif",
    direction: "rtl",
  },
  navbar: {
    backgroundColor: PRIMARY,
    padding: "0 20px",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 1,
  },
  navLinks: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  navBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    padding: "6px 16px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
  },
  navBtnActive: {
    background: "rgba(255,255,255,0.35)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    padding: "6px 16px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 700,
  },
  bellWrap: {
    position: "relative",
    cursor: "pointer",
  },
  bellBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    background: DANGER,
    color: "#fff",
    fontSize: 10,
    borderRadius: "50%",
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: "0 16px",
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#222",
  },
  editBtn: {
    background: PRIMARY_LIGHT,
    color: PRIMARY,
    border: `1.5px solid ${PRIMARY}`,
    borderRadius: 8,
    padding: "5px 18px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 600,
  },
  saveBtn: {
    background: PRIMARY,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "5px 18px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 600,
  },
  nameRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
    marginBottom: 16,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 13,
    color: "#555",
    fontWeight: 600,
    textAlign: "right",
  },
  input: {
    border: "1.5px solid #ddd",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    textAlign: "right",
    outline: "none",
    background: "#fafafa",
    color: "#333",
  },
  inputWithIcon: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    color: "#888",
    fontSize: 15,
    pointerEvents: "none",
  },
  divider: {
    height: 1,
    background: "#eee",
    margin: "16px 0",
  },
  passwordBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: PRIMARY,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 20px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 600,
    marginTop: 8,
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  avatarCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    overflow: "hidden",
    border: `3px solid ${PRIMARY}`,
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  changePhotoBtn: {
    background: PRIMARY,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "8px 24px",
    fontSize: 14,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
  },
  linksCard: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
    color: "#333",
  },
  linkRowInner: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 600,
  },
  linkIcon: {
    fontSize: 16,
    color: PRIMARY,
  },
  linkArrow: {
    fontSize: 14,
    color: "#aaa",
  },
  logoutRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    cursor: "pointer",
    color: DANGER,
  },
  logoutInner: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 700,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    width: 340,
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    fontFamily: "'Cairo', sans-serif",
    direction: "rtl",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
    color: "#222",
    textAlign: "center",
  },
  modalActions: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    background: DANGER,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0",
    fontSize: 15,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 700,
  },
  confirmBtn: {
    flex: 1,
    background: PRIMARY,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0",
    fontSize: 15,
    fontFamily: "'Cairo', sans-serif",
    cursor: "pointer",
    fontWeight: 700,
  },
};

export default function TechProfile() {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [editing, setEditing] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [form, setForm] = useState({
    firstName: "Hussein",
    secondName: "Mohamed",
    lastName: "El-Husseiny",
    email: "Hussein.rakha.2023@gmail.com",
    phone: "01113253452",
    serviceType: "سباكة",
    birthDate: "3/3/1993",
  });

  const [passForm, setPassForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => setEditing(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.removeItem("techToken");
    navigate("/tech/login");
  };

  const inputStyle = (active) => ({
    ...styles.input,
    border: active ? `1.5px solid ${PRIMARY}` : "1.5px solid #eee",
    background: active ? "#fff" : "#f9f9f9",
    color: active ? "#333" : "#666",
    cursor: active ? "text" : "not-allowed",
    width: "100%",
    boxSizing: "border-box",
  });

  return (
    <div style={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <div style={styles.bellWrap}>
            <span style={{ fontSize: 22, color: "#fff" }}>🔔</span>
            <span style={styles.bellBadge}>2</span>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #fff",
              background: "#ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatar ? (
              <img src={avatar} alt="avatar" style={styles.avatarImg} />
            ) : (
              <span style={{ fontSize: 20 }}>👷</span>
            )}
          </div>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate("/tech/home")}>
            الرئيسية
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/tech/requests")}>
            الطلبات
          </button>
          <button style={styles.navBtnActive}>حسابي</button>
        </div>
        <span style={styles.brand}>حرفة شُغل</span>
      </nav>

      {/* Main Grid */}
      <div style={styles.container}>

        {/* Personal Info Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>المعلومات الشخصية</div>
            {editing ? (
              <button style={styles.saveBtn} onClick={handleSave}>حفظ</button>
            ) : (
              <button style={styles.editBtn} onClick={() => setEditing(true)}>تعديل</button>
            )}
          </div>

          {/* Name Row */}
          <div style={styles.nameRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>الاسم الاخر</label>
              <input
                style={inputStyle(editing)}
                value={form.lastName}
                onChange={handleChange("lastName")}
                disabled={!editing}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>الاسم الثاني</label>
              <input
                style={inputStyle(editing)}
                value={form.secondName}
                onChange={handleChange("secondName")}
                disabled={!editing}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>الاسم الأول</label>
              <input
                style={inputStyle(editing)}
                value={form.firstName}
                onChange={handleChange("firstName")}
                disabled={!editing}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ ...styles.fieldGroup, marginBottom: 14 }}>
            <label style={styles.label}>البريد الالكتروني</label>
            <div style={styles.inputWithIcon}>
              <input
                style={inputStyle(editing)}
                value={form.email}
                onChange={handleChange("email")}
                disabled={!editing}
              />
              <span style={styles.inputIcon}>✉️</span>
            </div>
          </div>

          {/* Birth Date */}
          <div style={{ ...styles.fieldGroup, marginBottom: 14 }}>
            <label style={styles.label}>تاريخ الميلاد</label>
            <div style={styles.inputWithIcon}>
              <input
                style={inputStyle(editing)}
                value={form.birthDate}
                onChange={handleChange("birthDate")}
                disabled={!editing}
                type={editing ? "date" : "text"}
              />
              <span style={styles.inputIcon}>📅</span>
            </div>
          </div>

          {/* Phone */}
          <div style={{ ...styles.fieldGroup, marginBottom: 14 }}>
            <label style={styles.label}>رقم الهاتف</label>
            <div style={styles.inputWithIcon}>
              <input
                style={inputStyle(editing)}
                value={form.phone}
                onChange={handleChange("phone")}
                disabled={!editing}
              />
              <span style={styles.inputIcon}>📞</span>
            </div>
          </div>

          {/* Service Type */}
          <div style={{ ...styles.fieldGroup, marginBottom: 14 }}>
            <label style={styles.label}>نوع الخدمة</label>
            {editing ? (
              <select
                style={inputStyle(true)}
                value={form.serviceType}
                onChange={handleChange("serviceType")}
              >
                <option>سباكة</option>
                <option>كهرباء</option>
                <option>نقاشة</option>
                <option>جص</option>
              </select>
            ) : (
              <input style={inputStyle(false)} value={form.serviceType} disabled />
            )}
          </div>

          <div style={styles.divider} />

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>كلمة المرور</label>
            <button style={styles.passwordBtn} onClick={() => setShowPassModal(true)}>
              <span>🔒</span>
              تغيير كلمة المرور
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightCol}>

          {/* Avatar Card */}
          <div style={styles.avatarCard}>
            <div style={styles.avatarWrap}>
              {avatar ? (
                <img src={avatar} alt="profile" style={styles.avatarImg} />
              ) : (
                <span style={{ fontSize: 40, color: "#bbb" }}>👷</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <button style={styles.changePhotoBtn} onClick={() => fileRef.current.click()}>
              تغيير الصورة
            </button>
          </div>

          {/* Links Card */}
          <div style={styles.linksCard}>
            {[
              { icon: "⏱", label: "الشروط والاحكام" },
              { icon: "🛡", label: "سياسة الخصوصية" },
              { icon: "⏱", label: "إنضم | لينا كمزود خدمة" },
            ].map((item, i) => (
              <div
                key={i}
                style={styles.linkRow}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={styles.linkArrow}>‹</span>
                <div style={styles.linkRowInner}>
                  <span>{item.label}</span>
                  <span style={styles.linkIcon}>{item.icon}</span>
                </div>
              </div>
            ))}

            {/* Logout */}
            <div
              style={styles.logoutRow}
              onClick={handleLogout}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 18 }}>↩</span>
              <div style={styles.logoutInner}>
                <span>تسجيل الخروج</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPassModal && (
        <div style={styles.overlay} onClick={() => setShowPassModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>تغيير كلمة المرور</div>

            {[
              { label: "كلمة المرور الحالية", field: "current" },
              { label: "كلمة المرور الجديدة", field: "newPass" },
              { label: "تأكيد كلمة المرور", field: "confirm" },
            ].map(({ label, field }) => (
              <div key={field} style={{ ...styles.fieldGroup, marginBottom: 12 }}>
                <label style={styles.label}>{label}</label>
                <input
                  type="password"
                  style={{
                    ...styles.input,
                    border: `1.5px solid ${PRIMARY}`,
                    background: "#fff",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  placeholder="••••••••"
                  value={passForm[field]}
                  onChange={(e) =>
                    setPassForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                />
              </div>
            ))}

            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowPassModal(false)}>
                إلغاء
              </button>
              <button style={styles.confirmBtn} onClick={() => setShowPassModal(false)}>
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}