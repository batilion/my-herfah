import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export default function ClientAccountType() {
  const [selected, setSelected] = useState("Client");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected === "client") navigate("/client/login");
    else navigate("/client/login");
  };

  return (
    <div dir="rtl" style={styles.page}>
      <nav style={styles.navbar}>
        <span style={styles.navRight}>الرئيسية</span>
        <span style={styles.navLeft}>تسجيل الدخول</span>
      </nav>

      <div style={styles.card}>
        <img src={logo} alt="حرفة شغل" style={styles.logo} />
        <p style={styles.subtitle}>منصة تساعدك في الوصول لفني أو عميل بسهولة</p>
        <p style={styles.label}>اختر نوع الحساب</p>

        <div
          style={{ ...styles.option, border: selected === "client" ? "2px solid #2e7d32" : "2px solid #e0e0e0", background: selected === "client" ? "#f1f8f1" : "#fff" }}
          onClick={() => setSelected("client")}
        >
          <div style={styles.optionText}>
            <span style={styles.optionTitle}>عميل</span>
            <span style={styles.optionDesc}>إبحث عن خدمات وفنيين محترمين</span>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="عميل" style={styles.optionIcon} />
          <div style={styles.radio}>{selected === "client" && <div style={styles.radioDot} />}</div>
        </div>

        <div
          style={{ ...styles.option, border: selected === "provider" ? "2px solid #2e7d32" : "2px solid #e0e0e0", background: selected === "provider" ? "#f1f8f1" : "#fff" }}
          onClick={() => setSelected("provider")}
        >
          <div style={styles.optionText}>
            <span style={styles.optionTitle}>مزود خدمة</span>
            <span style={styles.optionDesc}>ابث عن خدمتك واحصل على عملاء</span>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="مزود خدمة" style={styles.optionIcon} />
          <div style={styles.radio}>{selected === "provider" && <div style={styles.radioDot} />}</div>
        </div>

        <button style={styles.btn} onClick={handleContinue}>متابعة</button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center" },
  navbar: { width: "100%", background: "#2e7d32", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", boxSizing: "border-box" },
  navRight: { fontSize: 15, cursor: "pointer" },
  navLeft: { fontSize: 15, cursor: "pointer" },
  card: { background: "#fff", borderRadius: 16, padding: "36px 28px", marginTop: 60, width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" },
  logo: { width: 130, marginBottom: 12 },
  subtitle: { color: "#444", fontSize: 14, marginBottom: 18, textAlign: "center" },
  label: { color: "#333", fontWeight: 600, fontSize: 15, marginBottom: 14, alignSelf: "flex-start" },
  option: { width: "100%", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 14, boxSizing: "border-box", transition: "all 0.2s" },
  optionText: { flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" },
  optionTitle: { fontWeight: 700, fontSize: 15, color: "#1a1a1a" },
  optionDesc: { fontSize: 12, color: "#777", marginTop: 2 },
  optionIcon: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover" },
  radio: { width: 20, height: 20, borderRadius: "50%", border: "2px solid #2e7d32", display: "flex", alignItems: "center", justifyContent: "center" },
  radioDot: { width: 10, height: 10, borderRadius: "50%", background: "#2e7d32" },
  btn: { marginTop: 8, width: "100%", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontSize: 16, fontWeight: 700, cursor: "pointer" },
};