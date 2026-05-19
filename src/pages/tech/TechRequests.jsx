import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";

const mockRequests = {
  new: [
    { id: 1, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "جديدة" },
    { id: 2, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "جديدة" },
  ],
  negotiating: [
    { id: 3, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "في الانتظار" },
    { id: 4, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "في الانتظار" },
  ],
  active: [
    { id: 5, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "جاري العمل" },
    { id: 6, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "جاري العمل" },
  ],
  done: [
    { id: 7, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "منتهية", rated: true },
    { id: 8, title: "تصليح سخان", client: "العميل: أحمد محمد", location: "القاهرة", status: "منتهية", rated: false },
  ],
};

const statusColor = {
  "جديدة":       { bg: "#E3F2FD", color: "#1565C0" },
  "في الانتظار": { bg: "#FFF8E1", color: "#F59E0B" },
  "جاري العمل":  { bg: "#E8F5EE", color: "#1B6B3A" },
  "منتهية":      { bg: "#F5F5F5", color: "#6B7280" },
};

function RequestCard({ req, actionLabel, actionColor = "#1B6B3A", onAction }) {
  return (
    <div style={{
      border: `1px solid ${COLORS.border}`, borderRadius: 10,
      padding: 14, background: "white",
      display: "flex", justifyContent: "space-between", alignItems: "center"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="https://placehold.co/44x44/1B6B3A/white?text=ف"
          style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
          alt="tech"
        />
        <div>
          <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700 }}>{req.title}</p>
          <p style={{ margin: "0 0 2px", fontSize: 12, color: COLORS.textSecondary }}>{req.client}</p>
          <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>📍 {req.location}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <span style={{
          background: statusColor[req.status]?.bg,
          color: statusColor[req.status]?.color,
          fontSize: 11, fontWeight: 600,
          borderRadius: 20, padding: "3px 10px"
        }}>{req.status}</span>
        {actionLabel && (
          <button
            onClick={() => onAction && onAction(req)}
            style={{
              padding: "5px 14px", background: actionColor,
              color: "white", border: "none", borderRadius: 7,
              fontSize: 12, fontWeight: 600, cursor: "pointer"
            }}
          >{actionLabel}</button>
        )}
        {req.rated && (
          <span style={{
            background: "#E8F5EE", color: "#1B6B3A",
            fontSize: 11, fontWeight: 600,
            borderRadius: 20, padding: "3px 10px"
          }}>200 جيد ⭐</span>
        )}
      </div>
    </div>
  );
}

function Section({ title, count, dotColor, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: dotColor, display: "inline-block" }} />
        <span style={{ fontSize: 14, fontWeight: 700 }}>{title}</span>
        <span style={{
          background: dotColor, color: "white",
          borderRadius: "50%", width: 20, height: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700
        }}>{count}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function TechRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("الطلبات");

  const tabs = ["الرئيسية", "الطلبات", "المطالبات", "أعمالي"];

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8", direction: "rtl", display: "flex" }}>

      {/* Sidebar */}
      <div style={{
        width: 180, background: "white",
        borderLeft: `1px solid ${COLORS.border}`,
        display: "flex", flexDirection: "column",
        padding: "20px 0"
      }}>
        {tabs.map(tab => (
          <div
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "الرئيسية") navigate("/tech/home");
              if (tab === "أعمالي") navigate("/tech/home");
            }}
            style={{
              padding: "12px 20px", fontSize: 14, cursor: "pointer",
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#1B6B3A" : COLORS.textSecondary,
              borderRight: activeTab === tab ? `3px solid #1B6B3A` : "3px solid transparent",
              display: "flex", alignItems: "center", gap: 8
            }}
          >
            <span>{tab === "الرئيسية" ? "🏠" : tab === "الطلبات" ? "📋" : tab === "المطالبات" ? "💬" : "👤"}</span>
            {tab}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "12px 20px" }}>
          <div
            onClick={() => { localStorage.removeItem("techToken"); navigate("/tech/login"); }}
            style={{ fontSize: 13, color: "#E53935", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <span>🚪</span> تسجيل الخروج
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>

        {/* Top Header */}
        <div style={{
          background: "#1B6B3A", borderRadius: 10,
          padding: "12px 16px", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="https://placehold.co/36x36/white/1B6B3A?text=أ"
              style={{ width: 36, height: 36, borderRadius: "50%" }} alt="user"
            />
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "white" }}>أحمد علي</p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.8)" }}>فني سباكة</p>
            </div>
          </div>
          <span style={{ color: "white", fontSize: 20, cursor: "pointer" }}>☰</span>
        </div>

        {/* Mini Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "منتهية", value: 3, color: "#E53935", badge: "منتهية" },
            { label: "طلبات حالية", value: 5, color: "#1B6B3A", badge: "جاري" },
            { label: "قيد التفاوض", value: 3, color: "#F59E0B", badge: "في الانتظار" },
            { label: "أعمال الجديدة", value: 12, color: "#1565C0", badge: "جديدة" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "white", border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: 12, textAlign: "center"
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</p>
              <span style={{
                background: statusColor[s.badge]?.bg, color: statusColor[s.badge]?.color,
                fontSize: 10, fontWeight: 600, borderRadius: 20, padding: "2px 8px"
              }}>{s.badge}</span>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: COLORS.textSecondary }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <Section title="الطلبات الجديدة" count={4} dotColor="#1565C0">
          {mockRequests.new.map(r => (
            <RequestCard key={r.id} req={r} actionLabel="تفاوض" />
          ))}
        </Section>

        <Section title="الطلبات قيد التفاوض" count={3} dotColor="#F59E0B">
          {mockRequests.negotiating.map(r => (
            <RequestCard key={r.id} req={r} actionLabel="تعديل" actionColor="#F59E0B" />
          ))}
        </Section>

        <Section title="الطلبات الحالية" count={5} dotColor="#1B6B3A">
          {mockRequests.active.map(r => (
            <RequestCard key={r.id} req={r} actionLabel="إنهاء" actionColor="#1B6B3A" />
          ))}
        </Section>

        <Section title="الطلبات المنتهية" count={10} dotColor="#E53935">
          {mockRequests.done.map(r => (
            <RequestCard key={r.id} req={r} actionLabel={r.rated ? undefined : "تقييم العميل"} actionColor="#1B6B3A" />
          ))}
        </Section>

      </div>
    </div>
  );
}

export default TechRequests;