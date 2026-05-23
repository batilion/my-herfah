import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "الرئيسية", icon: "🏠", path: "/client/home" },
  { label: "الطلبات",  icon: "📋", path: "/client/requests" },
  { label: "المحادثات",icon: "💬", path: "/client/chats" },
  { label: "حسابي",   icon: "👤", path: "/client/profile" },
];

const DEMO_SERVICES = [
  { name: "كهرباني", image: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?w=200" },
  { name: "سباك",    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200" },
  { name: "فاي دش",  image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=200" },
  { name: "نقاش",    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200" },
];

export default function ClientHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://your-api.com/api/services", {
      headers: { Authorization: `Bearer ${localStorage.getItem("clientToken")}` },
    })
      .then(r => r.json())
      .then(data => setServices(data?.data || data || []))
      .catch(() => {});
  }, []);

  const filtered = services.filter(s => s.name?.includes(search) || s.title?.includes(search));
  const displayList = filtered.length > 0 ? filtered : DEMO_SERVICES;

  return (
    <div dir="rtl" style={styles.page}>
      <header style={styles.navbar}>
        <span style={styles.menuBtn}>☰</span>
        <span style={styles.navTitle}>حرفة شغل</span>
        <div style={styles.navLeft}>
          <div style={styles.bellWrap}><span>🔔</span><span style={styles.badge}>2</span></div>
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="user" style={styles.userAvatar} />
        </div>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          {NAV_ITEMS.map(item => (
            <div key={item.path}
              style={{ ...styles.navItem, background: location.pathname === item.path ? "#e8f5e9" : "transparent", color: location.pathname === item.path ? "#2e7d32" : "#333", fontWeight: location.pathname === item.path ? 700 : 400 }}
              onClick={() => navigate(item.path)}
            >
              <span>{item.label}</span>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
            </div>
          ))}
          <div style={styles.logoutBtn} onClick={() => { localStorage.removeItem("clientToken"); navigate("/"); }}>
            <span>تسجيل الخروج</span><span>🚪</span>
          </div>
        </aside>

        <main style={styles.main}>
          <div style={styles.contentCard}>
            <div style={styles.searchWrap}>
              <input style={styles.searchInput} placeholder="ابحث عن خدمة" value={search} onChange={e => setSearch(e.target.value)} />
              <span style={styles.searchIcon}>🔍</span>
            </div>
            <h3 style={styles.sectionTitle}>اختر الخدمة</h3>
            <div style={styles.grid}>
              {displayList.map((service, i) => (
                <div key={i} style={styles.serviceCard} onClick={() => navigate("/client/service-request", { state: { service } })}>
                  <img src={service.image} alt={service.name || service.title} style={styles.serviceImg} />
                  <p style={styles.serviceName}>{service.name || service.title}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  navbar: { background: "#2e7d32", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", position: "sticky", top: 0, zIndex: 100 },
  menuBtn: { fontSize: 22, cursor: "pointer" },
  navTitle: { fontSize: 18, fontWeight: 700 },
  navLeft: { display: "flex", alignItems: "center", gap: 10 },
  bellWrap: { position: "relative", fontSize: 20 },
  badge: { position: "absolute", top: -4, right: -4, background: "#e53935", color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" },
  userAvatar: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: 180, background: "#fff", borderLeft: "1px solid #e8e8e8", display: "flex", flexDirection: "column", padding: "20px 0", minHeight: "calc(100vh - 54px)", position: "sticky", top: 54 },
  navItem: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "12px 20px", cursor: "pointer", borderRadius: 8, margin: "2px 8px", transition: "background 0.15s", fontSize: 14 },
  logoutBtn: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "12px 20px", cursor: "pointer", color: "#e53935", fontSize: 13, marginTop: "auto" },
  main: { flex: 1, padding: 20 },
  contentCard: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" },
  searchWrap: { position: "relative", marginBottom: 18 },
  searchInput: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "10px 36px 10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", textAlign: "right", direction: "rtl" },
  searchIcon: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16 },
  sectionTitle: { color: "#2e7d32", fontWeight: 700, fontSize: 16, marginBottom: 16, textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  serviceCard: { border: "1.5px solid #e8e8e8", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: "#fafafa", textAlign: "center" },
  serviceImg: { width: "100%", height: 100, objectFit: "cover" },
  serviceName: { padding: "8px 0", fontSize: 14, fontWeight: 600, color: "#333" },
};