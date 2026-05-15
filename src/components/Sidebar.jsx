import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../styles/colors";
import logo from "../assets/logo_herfah.jpg";

const menuItems = [
  { id: "dashboard",   label: "لوحة التحكم",          icon: "⊞", path: "/admin/dashboard" },
  { id: "technicians", label: "طلبات تسجيل الفنيين",  icon: "👷", path: "/admin/technicians" },
  { id: "services",    label: "إدارة الخدمات",         icon: "🔧", path: "/admin/services" },
  { id: "reports",     label: "التقييمات والتقارير",   icon: "📊", path: "/admin/reports" },
  { id: "createAdmin", label: "إضافة أدمن",            icon: "👤", path: "/admin/create-admin" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div style={{
      width: 220,
      background: COLORS.primary,
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      height: "100vh",
      right: 0,
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{
        padding: "16px",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        textAlign: "center",
        background: "white",
      }}>
        <img
          src={logo}
          alt="حرفة شغل"
          style={{ width: 120, height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                cursor: "pointer",
                direction: "rtl",
                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                borderRight: isActive ? `4px solid white` : "4px solid transparent",
                transition: "all 0.2s",
                marginBottom: 4,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{
                color: isActive ? "white" : "rgba(255,255,255,0.75)",
                fontSize: 14,
                fontWeight: isActive ? 700 : 400,
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            padding: "10px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          🚪 تسجيل الخروج
        </button>
      </div>

    </div>
  );
}

export default Sidebar;