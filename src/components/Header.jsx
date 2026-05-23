import { COLORS } from "../styles/colors";
import logo from "../../assets/logo_herfah.jpg";


function Header() {
  return (
    <div style={{
      background: COLORS.primary,
      padding: "8px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 99,
    }}>

      {/* Search */}
      <div style={{
        background: "rgba(255,255,255,0.15)",
        borderRadius: 8,
        padding: "6px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: 280,
      }}>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>🔍</span>
        <input
          placeholder="ابحث عن طلبات فنيين..."
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: 13,
            outline: "none",
            width: "100%",
            textAlign: "right",
          }}
        />
      </div>

      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, color: "white", fontSize: 14, fontWeight: 700 }}>حسن محمد</p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Super Admin</p>
        </div>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
          fontSize: 13,
        }}>
          HM
        </div>
      </div>

    </div>
  );
}

export default Header;