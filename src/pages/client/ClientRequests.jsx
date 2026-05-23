import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { label: "الرئيسية", icon: "🏠", path: "/client/home" },
  { label: "الطلبات",  icon: "📋", path: "/client/requests" },
  { label: "المحادثات",icon: "💬", path: "/client/chats" },
  { label: "حسابي",   icon: "👤", path: "/client/profile" },
];

function RequestCard({ req, type, onAccept, onReject, onCancel, onTrack, onRate, onChat, onDetails }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.cardInfo}>
          <p style={styles.cardName}>{req.techName || "محمد أحمد"}</p>
          <p style={styles.cardService}>{req.service || "سباكة"}</p>
          <p style={styles.cardPrice}>السعر المقترح <strong>{req.price || "200"} جنيه</strong></p>
        </div>
        <img src={req.techAvatar || "https://cdn-icons-png.flaticon.com/512/1995/1995574.png"} alt="tech" style={styles.techAvatar} />
      </div>

      {type === "new" && (
        <>
          <div style={styles.cardBtns}>
            <button style={styles.rejectBtn} onClick={() => onReject?.(req)}>رفض</button>
            <button style={styles.acceptBtn} onClick={() => onAccept?.(req)}>قبول</button>
          </div>
          <div style={styles.cardBtns}>
            <button style={styles.outlineBtn} onClick={() => onChat?.(req)}>ابدأ المحادثة ‹</button>
            <button style={styles.outlineBtn} onClick={() => onDetails?.(req)}>تفاصيل الطلب ‹</button>
          </div>
        </>
      )}

      {type === "ongoing" && (
        <>
          <button style={styles.cancelBtn} onClick={() => onCancel?.(req)}>إلغاء الطلب</button>
          <div style={styles.cardBtns}>
            <button style={styles.outlineBtn} onClick={() => onChat?.(req)}>ابدأ المحادثة ‹</button>
            <button style={styles.outlineBtn} onClick={() => onTrack?.(req)}>متابعة حالة الطلب ‹</button>
          </div>
        </>
      )}

      {type === "completed" && (
        <>
          <div style={styles.completedTag}>تم الانتهاء</div>
          <p style={styles.cardPrice}>المبلغ المدفوع <strong>{req.price || "200"} جنيه</strong></p>
          <button style={styles.rateBtn} onClick={() => onRate?.(req)}>تقييم الفني</button>
          <button style={styles.outlineBtn} onClick={() => onDetails?.(req)}>تفاصيل الطلب ‹</button>
        </>
      )}
    </div>
  );
}

export default function ClientRequests() {
  const navigate = useNavigate();
  const [newReqs, setNewReqs] = useState([]);
  const [ongoingReqs, setOngoingReqs] = useState([]);
  const [completedReqs, setCompletedReqs] = useState([]);

  useEffect(() => {
    const DEMO = [{ id: 1, techName: "محمد أحمد", service: "سباكة", price: "200" }];
    fetch("https://your-api.com/api/client/requests", {
      headers: { Authorization: `Bearer ${localStorage.getItem("clientToken")}` },
    })
      .then(r => r.json())
      .then(data => {
        const all = data?.data || data || [];
        setNewReqs(all.filter(r => r.status === "pending" || r.status === "new"));
        setOngoingReqs(all.filter(r => r.status === "ongoing" || r.status === "in_progress"));
        setCompletedReqs(all.filter(r => r.status === "completed" || r.status === "done"));
      })
      .catch(() => { setNewReqs(DEMO); setOngoingReqs(DEMO); setCompletedReqs(DEMO); });
  }, []);

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
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.path}
              style={{ ...styles.navItem, background: item.path === "/client/requests" ? "#e8f5e9" : "transparent", color: item.path === "/client/requests" ? "#2e7d32" : "#333", fontWeight: item.path === "/client/requests" ? 700 : 400 }}
              onClick={() => navigate(item.path)}
            >
              <span>{item.label}</span><span style={{ fontSize: 18 }}>{item.icon}</span>
            </div>
          ))}
          <div style={styles.logoutBtn} onClick={() => { localStorage.removeItem("clientToken"); navigate("/"); }}>
            <span>تسجيل الخروج</span><span>🚪</span>
          </div>
        </aside>

        <main style={styles.main}>
          {[
            { title: "الطلبات الجديدة", data: newReqs, type: "new" },
            { title: "الطلبات الجارية", data: ongoingReqs, type: "ongoing" },
            { title: "الطلبات المكتملة", data: completedReqs, type: "completed" },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: 28 }}>
              <h3 style={styles.sectionTitle}>{section.title}</h3>
              <div style={styles.cardsRow}>
                {section.data.map((req, i) => (
                  <RequestCard key={i} req={req} type={section.type}
                    onAccept={r => navigate("/client/after-request-completed", { state: r })}
                    onReject={() => {}}
                    onCancel={() => {}}
                    onChat={r => navigate("/client/chats", { state: r })}
                    onTrack={() => {}}
                    onRate={() => {}}
                    onDetails={r => navigate("/client/request-details", { state: r })}
                  />
                ))}
              </div>
            </div>
          ))}
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
  userAvatar: { width: 34, height: 34, borderRadius: "50%", border: "2px solid #fff" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: 180, background: "#fff", borderLeft: "1px solid #e8e8e8", display: "flex", flexDirection: "column", padding: "20px 0", minHeight: "calc(100vh - 54px)", position: "sticky", top: 54 },
  navItem: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "12px 20px", cursor: "pointer", borderRadius: 8, margin: "2px 8px", fontSize: 14 },
  logoutBtn: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "12px 20px", cursor: "pointer", color: "#e53935", fontSize: 13, marginTop: "auto" },
  main: { flex: 1, padding: 20 },
  sectionTitle: { fontWeight: 700, color: "#1a1a1a", fontSize: 15, textAlign: "right", marginBottom: 12 },
  cardsRow: { display: "flex", flexWrap: "wrap", gap: 12 },
  card: { background: "#fff", border: "1.5px solid #e8e8e8", borderRadius: 12, padding: 14, minWidth: 200, maxWidth: 240, flex: "1 1 200px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 8 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  cardInfo: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
  cardName: { fontWeight: 700, fontSize: 14, color: "#1a1a1a" },
  cardService: { fontSize: 12, color: "#888" },
  cardPrice: { fontSize: 12, color: "#555" },
  techAvatar: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover" },
  cardBtns: { display: "flex", gap: 6, justifyContent: "flex-end" },
  acceptBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 },
  rejectBtn: { background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" },
  cancelBtn: { background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "7px 0", fontSize: 12, cursor: "pointer", width: "100%" },
  rateBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: 6, padding: "7px 0", fontSize: 12, cursor: "pointer", width: "100%", fontWeight: 700 },
  outlineBtn: { background: "none", color: "#555", border: "1px solid #e0e0e0", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer" },
  completedTag: { alignSelf: "flex-end", background: "#e8f5e9", color: "#2e7d32", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 },
};