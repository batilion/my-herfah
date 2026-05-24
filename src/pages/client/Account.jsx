import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function Account() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.left}>
          <div style={styles.infoCard}>
            <div style={styles.infoHeader}>
              <span style={styles.editBtn} onClick={() => navigate("/client/edit-profile")}>تعديل</span>
              <h3 style={styles.infoTitle}>المعلومات الشخصية</h3>
            </div>
            <div style={styles.row3}>
              <Field label="الاسم الأول" value="Hussein" />
              <Field label="الاسم الثاني" value="Mohamed" />
              <Field label="الاسم الأخير" value="El-Husseiny" />
            </div>
            <Field label="البريد الإلكتروني" value="Hussein.rakha.2023@gmail.com" icon="✉️" />
            <Field label="تاريخ الميلاد" value="3/3/1993" icon="📅" />
            <Field label="رقم الهاتف" value="01113253452" icon="📞" />
            <div style={styles.passRow}>
              <button style={styles.passBtn} onClick={() => navigate("/client/change-password")}>
                🔒 تغيير كلمة المرور
              </button>
              <label style={styles.label}>كلمة المرور</label>
            </div>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.photoCard}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" style={styles.avatar} />
            <button style={styles.changePhotoBtn}>تغيير الصورة</button>
          </div>
          <div style={styles.linksCard}>
            <LinkItem label="الشروط والأحكام" icon="ℹ️" />
            <LinkItem label="سياسة الخصوصية" icon="🔒" />
            <LinkItem label="إنضم | لبنا كمزود خدمة" icon="👤" onClick={() => navigate("/client/account-type")} />
          </div>
          <button style={styles.logoutBtn} onClick={() => navigate("/client/account-type")}>
            تسجيل الخروج ➜
          </button>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value, icon }) => (
  <div style={{ marginBottom: 12, textAlign: "right" }}>
    <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 3 }}>{label}</label>
    <div style={{ border: "1px solid #ddd", borderRadius: 7, padding: "8px 10px", fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{icon}</span><span>{value}</span>
    </div>
  </div>
);

const LinkItem = ({ label, icon, onClick }) => (
  <div onClick={onClick} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>
    <span>❯</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 13 }}>{label}</span>
      <span>{icon}</span>
    </div>
  </div>
);

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", gap: 24, padding: 24, justifyContent: "center", flexWrap: "wrap" },
  left: { flex: 1, maxWidth: 460 },
  right: { width: 220 },
  infoCard: { background: "#fff", borderRadius: 12, padding: "20px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  infoHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: 700 },
  editBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 6, padding: "5px 14px", fontSize: 13, cursor: "pointer" },
  row3: { display: "flex", gap: 8, marginBottom: 12 },
  passRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  label: { fontSize: 13, fontWeight: 600 },
  passBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 7, padding: "8px 14px", fontSize: 13, cursor: "pointer" },
  photoCard: { background: "#fff", borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  avatar: { width: 90, height: 90, borderRadius: "50%", objectFit: "cover", marginBottom: 10 },
  changePhotoBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", fontSize: 13, cursor: "pointer" },
  linksCard: { background: "#fff", borderRadius: 12, padding: "8px 16px", marginBottom: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  logoutBtn: { width: "100%", background: "none", border: "1px solid #c62828", color: "#c62828", borderRadius: 8, padding: "10px 0", fontSize: 14, cursor: "pointer" },
};