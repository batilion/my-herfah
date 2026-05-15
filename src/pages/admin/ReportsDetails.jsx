import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const mockReportDetails = {
  bookingNum: "09127346",
  finalPrice: "200 جنيه",
  address: "مدينة نصر",
  clientPhone: "01038203991",
  techPhone: "01038203991",
  problemNum: "29343323",
  arrivalDate: "7/4/2026",
  arrivalTime: "10:00AM",
  problemDesc: "",
  clientName: "حسن محمد",
  techName: "محمد البلقاسي",
};

function ReportsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showBanModal, setShowBanModal] = useState(false);
  const [banTarget, setBanTarget] = useState(""); // "client" | "tech"
  const [banType, setBanType] = useState("permanent"); // "temporary" | "permanent"
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const report = mockReportDetails;

  const handleBanClick = (target) => {
    setBanTarget(target);
    setBanType("permanent");
    setShowBanModal(true);
  };

  const handleConfirmBan = () => {
    setShowBanModal(false);
    setShowSuccessModal(true);
  };

  const handleBackToReports = () => {
    setShowSuccessModal(false);
    navigate("/admin/reports");
  };

  const fieldStyle = {
    background: "#F5F5F5",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    color: "#333",
    textAlign: "right",
  };

  const labelStyle = {
    fontSize: 13,
    color: "#333",
    fontWeight: 600,
    textAlign: "right",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", background: "#F8FAF8" }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: 220 }}>
        <Header />

        <div style={{ padding: 28 }}>
          <div
            style={{
              background: "white",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: 32,
              maxWidth: 600,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Title */}
            <h3
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 28,
                marginTop: 0,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "8px 20px",
                display: "inline-block",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              تفاصيل الطلب
            </h3>

            {/* Fields Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <p style={labelStyle}>رقم الحجز</p>
                <div style={fieldStyle}>{report.bookingNum}</div>
              </div>

              <div>
                <p style={labelStyle}>السعر النهائي</p>
                <div style={fieldStyle}>{report.finalPrice}</div>
              </div>

              <div>
                <p style={labelStyle}>العنوان</p>
                <div style={fieldStyle}>{report.address}</div>
              </div>

              <div>
                <p style={labelStyle}>رقم هاتف العميل</p>
                <div style={fieldStyle}>{report.clientPhone}</div>
              </div>

              <div>
                <p style={labelStyle}>رقم هاتف الفني</p>
                <div style={fieldStyle}>{report.techPhone}</div>
              </div>

              <div>
                <p style={labelStyle}>رقم المشكلة</p>
                <div style={fieldStyle}>{report.problemNum}</div>
              </div>

              <div>
                <p style={labelStyle}>موعد الوصول</p>
                <div style={fieldStyle}>⏰ {report.arrivalTime}</div>
              </div>

              <div>
                <p style={labelStyle}>تاريخ الوصول</p>
                <div style={fieldStyle}>📅 {report.arrivalDate}</div>
              </div>
            </div>

            {/* Problem Description */}
            <div style={{ marginBottom: 28 }}>
              <p style={labelStyle}>وصف المشكلة</p>
              <textarea
                style={{
                  ...fieldStyle,
                  width: "100%",
                  minHeight: 90,
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  background: "#FAFAFA",
                }}
                readOnly
                value={report.problemDesc}
                placeholder="لا يوجد وصف"
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <button
                onClick={() => handleBanClick("client")}
                style={{
                  background: COLORS.primary,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                حظر العميل
              </button>
              <button
                onClick={() => handleBanClick("tech")}
                style={{
                  background: COLORS.primary,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                حظر الفني
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ban Modal */}
      {showBanModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "36px 40px",
              minWidth: 300,
              textAlign: "center",
              direction: "rtl",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer", fontSize: 14 }}>
                <input
                  type="radio"
                  name="banType"
                  value="temporary"
                  checked={banType === "temporary"}
                  onChange={() => setBanType("temporary")}
                  style={{ accentColor: COLORS.primary, width: 18, height: 18 }}
                />
                حظر مؤقت
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
                <input
                  type="radio"
                  name="banType"
                  value="permanent"
                  checked={banType === "permanent"}
                  onChange={() => setBanType("permanent")}
                  style={{ accentColor: COLORS.primary, width: 18, height: 18 }}
                />
                حظر نهائي
              </label>
            </div>

            <button
              onClick={handleConfirmBan}
              style={{
                background: COLORS.primary,
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "10px 32px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              تأكيد الحظر
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "40px 48px",
              minWidth: 320,
              textAlign: "center",
              direction: "rtl",
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: `4px solid ${COLORS.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7 18L15 26L29 10" stroke={COLORS.primary} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: "#222" }}>تم الحظر بنجاح</p>

            <button
              onClick={handleBackToReports}
              style={{
                background: COLORS.primary,
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              العودة إلى التقييمات والتقارير
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsDetails;