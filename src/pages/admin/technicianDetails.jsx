import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../../styles/colors";

const mockTechnician = {
  id: 1,
  name: "محمد أحمد السيد",
  phone: "0501234567",
  email: "mohammed@example.com",
  nationalId: "1098765432",
  city: "الرياض",
  category: "سباكة",
  experience: "5 سنوات",
  status: "pending",
  joinDate: "2024-03-15",
  bio: "فني سباكة محترف خبرة أكثر من 5 سنوات في أعمال السباكة والصيانة المنزلية.",
  documents: [
    { name: "صورة الهوية الوطنية", type: "هوية", status: "uploaded" },
    { name: "شهادة الخبرة", type: "شهادة", status: "uploaded" },
    { name: "صورة شخصية", type: "صورة", status: "uploaded" },
  ],
};

const statusConfig = {
  pending:  { label: "قيد المراجعة", bg: COLORS.warning + "22", color: COLORS.warning, border: COLORS.warning },
  approved: { label: "مقبول",        bg: COLORS.success + "22", color: COLORS.success, border: COLORS.success },
  rejected: { label: "مرفوض",        bg: COLORS.danger  + "22", color: COLORS.danger,  border: COLORS.danger  },
};

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>{label}</span>
      <span style={{ color: COLORS.textPrimary, fontWeight: 500, fontSize: 14 }}>{value}</span>
    </div>
  );
}

function DocCard({ doc }) {
  return (
    <div style={{
      background: COLORS.lightGray,
      borderRadius: 10,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      border: `1px solid ${COLORS.border}`,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: COLORS.accent + "22",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>📄</div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: COLORS.textPrimary }}>{doc.name}</p>
        <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>{doc.type}</p>
      </div>
      <button style={{
        background: COLORS.accent,
        color: COLORS.white,
        border: "none",
        borderRadius: 6,
        padding: "6px 14px",
        fontSize: 12,
        cursor: "pointer",
      }}>عرض</button>
    </div>
  );
}

export default function TechnicianDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // ← التغيير هنا: بياخد البيانات من Technicians.jsx أو يستخدم الـ mock
  const technician = location.state?.technician || mockTechnician;

  // تحويل الـ status من عربي للـ key
  const statusMap = {
    "مقبول":        "approved",
    "قيد المراجعة": "pending",
    "مرفوض":        "rejected",
  };
  const statusKey = statusMap[technician.status] || technician.status;
  const status = statusConfig[statusKey] || statusConfig.pending;

  function handleApprove() {
    // TODO: استدعاء الـ API لقبول الطلب
    alert("تم قبول الطلب ✅");
  }

  function handleReject() {
    // TODO: استدعاء الـ API لرفض الطلب
    alert("تم رفض الطلب ❌");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.background,
      padding: "30px",
      fontFamily: "Cairo, Tajawal, sans-serif",
      direction: "rtl",
    }}>

      {/* زر الرجوع */}
      <button
        onClick={() => navigate("/admin/technicians")}
        style={{
          background: "transparent",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: "8px 18px",
          cursor: "pointer",
          color: COLORS.textSecondary,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        ← رجوع
      </button>

      {/* هيدر البطاقة */}
      <div style={{
        background: COLORS.cardBackground,
        borderRadius: 16,
        padding: "28px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
      }}>
        {/* أفاتار */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: COLORS.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, color: COLORS.white, fontWeight: 700, flexShrink: 0,
        }}>
          {technician.name.charAt(0)}
        </div>

        <div style={{ flex: 1, minWidth: 180 }}>
          <h2 style={{ margin: "0 0 6px", color: COLORS.textPrimary, fontSize: 22 }}>
            {technician.name}
          </h2>
          <p style={{ margin: "0 0 10px", color: COLORS.textSecondary, fontSize: 14 }}>
            {technician.specialty || technician.category} — {technician.city || "غير محدد"}
          </p>
          <span style={{
            display: "inline-block",
            background: status.bg,
            color: status.color,
            border: `1px solid ${status.border}`,
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 13,
            fontWeight: 600,
          }}>
            {status.label}
          </span>
        </div>

        {/* أزرار القرار - بتظهر بس لو قيد المراجعة */}
        {statusKey === "pending" && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={handleApprove}
              style={{
                background: COLORS.success,
                color: COLORS.white,
                border: "none",
                borderRadius: 10,
                padding: "10px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✅ قبول
            </button>
            <button
              onClick={handleReject}
              style={{
                background: COLORS.danger,
                color: COLORS.white,
                border: "none",
                borderRadius: 10,
                padding: "10px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ❌ رفض
            </button>
          </div>
        )}
      </div>

      {/* جسم الصفحة */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* بيانات شخصية */}
        <div style={{
          background: COLORS.cardBackground,
          borderRadius: 16,
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <h3 style={{ margin: "0 0 16px", color: COLORS.primary, fontSize: 16, fontWeight: 700 }}>
            📋 البيانات الشخصية
          </h3>
          <InfoRow label="الاسم الكامل"        value={technician.name} />
          <InfoRow label="رقم الجوال"           value={technician.phone     || "غير متوفر"} />
          <InfoRow label="البريد الإلكتروني"    value={technician.email     || "غير متوفر"} />
          <InfoRow label="رقم الهوية"           value={technician.nationalId || "غير متوفر"} />
          <InfoRow label="المدينة"              value={technician.city      || "غير متوفر"} />
          <InfoRow label="تاريخ التسجيل"        value={technician.date || technician.joinDate || "غير متوفر"} />
        </div>

        {/* بيانات مهنية */}
        <div style={{
          background: COLORS.cardBackground,
          borderRadius: 16,
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <h3 style={{ margin: "0 0 16px", color: COLORS.primary, fontSize: 16, fontWeight: 700 }}>
            🔧 البيانات المهنية
          </h3>
          <InfoRow label="التخصص"       value={technician.specialty || technician.category || "غير متوفر"} />
          <InfoRow label="سنوات الخبرة" value={technician.experience || "غير متوفر"} />
          <div style={{ padding: "12px 0" }}>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, margin: "0 0 6px" }}>نبذة شخصية</p>
            <p style={{ color: COLORS.textPrimary, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {technician.bio || "لا توجد نبذة شخصية"}
            </p>
          </div>
        </div>

        {/* الوثائق */}
        <div style={{
          background: COLORS.cardBackground,
          borderRadius: 16,
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          gridColumn: "1 / -1",
        }}>
          <h3 style={{ margin: "0 0 16px", color: COLORS.primary, fontSize: 16, fontWeight: 700 }}>
            📁 الوثائق المرفقة
          </h3>
          {technician.documents && technician.documents.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {technician.documents.map((doc, i) => (
                <DocCard key={i} doc={doc} />
              ))}
            </div>
          ) : (
            <p style={{ color: COLORS.textSecondary, fontSize: 14 }}>لا توجد وثائق مرفقة</p>
          )}
        </div>

      </div>
    </div>
  );
}