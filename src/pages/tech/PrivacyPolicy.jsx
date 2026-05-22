import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const DANGER = "#c0392b";

const PRIVACY = [
  { title: "1. جمع البيانات", body: "نقوم بجمع معلومات ضرورية لتقديم خدماتنا، مثل الاسم رقم الهاتف، الموقع الجغرافي، صور الأعطال، وسجل الحجوزات." },
  { title: "2. استخدام البيانات", body: "نستخدم بياناتك لتحسين تجربتك داخل التطبيق، إرسال إشعارات مهمة، وربطك بالفنيين المناسبين." },
  { title: "3. مشاركة البيانات", body: "لا نقوم بمشاركة بياناتك مع أي جهة خارجية بدون إذنك، إلا إن كان ذلك ضرورياً لتقديم الخدمة أو امتثالاً للقانون." },
  { title: "4. حماية البيانات", body: "نستخدم بروتوكولات أمان متقدمة لحماية بياناتك من الوصول غير المصرح به أو الاستخدام السيء." },
  { title: "5. ملفات تعريف الارتباط (Cookies)", body: "قد نستخدم ملفات الكوكيز لتحسين أداء التطبيق وتجربة الاستخدام." },
  { title: "6. حقوق المستخدم", body: "يحق لك الاطلاع على بياناتك، تعديلها، أو حذفها في أي وقت من خلال إعدادات الحساب." },
  { title: "7. التعديلات", body: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم إعلامك بأي تغييرات عبر التطبيق أو الموقع." },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const s = {
    page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Cairo','Segoe UI',sans-serif", direction: "rtl" },
    navbar: {
      backgroundColor: PRIMARY, padding: "0 20px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    brand: { color: "#fff", fontSize: 22, fontWeight: 700 },
    navLinks: { display: "flex", gap: 8, alignItems: "center" },
    navBtn: {
      background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer",
    },
    navBtnActive: {
      background: "rgba(255,255,255,0.35)", border: "none", borderRadius: 8,
      color: "#fff", padding: "6px 16px", fontSize: 14,
      fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontWeight: 700,
    },
    bellBadge: {
      position: "absolute", top: -4, right: -4, background: DANGER,
      color: "#fff", fontSize: 10, borderRadius: "50%", width: 16, height: 16,
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
    },
    container: { maxWidth: 640, margin: "30px auto", padding: "0 16px" },
    card: { background: "#fff", borderRadius: 14, padding: "28px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" },
    pageTitle: { fontSize: 22, fontWeight: 700, color: "#222", textAlign: "center", marginBottom: 6 },
    intro: { fontSize: 14, color: "#555", textAlign: "center", lineHeight: 1.8, marginBottom: 24 },
    section: { marginBottom: 18 },
    sectionTitle: { fontSize: 15, fontWeight: 700, color: "#222", textAlign: "right", marginBottom: 6 },
    body: { fontSize: 13, color: "#444", textAlign: "right", lineHeight: 1.9 },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      <nav style={s.navbar}>
        <div style={s.navLinks}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22, color: "#fff" }}>🔔</span>
            <span style={s.bellBadge}>2</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20 }}>👷</span>
          </div>
        </div>
        <div style={s.navLinks}>
          <button style={s.navBtn} onClick={() => navigate("/tech/home")}>الرئيسية</button>
          <button style={s.navBtn} onClick={() => navigate("/tech/requests")}>الطلبات</button>
          <button style={s.navBtnActive}>حسابي</button>
        </div>
        <span style={s.brand}>حرفة شُغل</span>
      </nav>

      <div style={s.container}>
        <div style={s.card}>
          <div style={s.pageTitle}>سياسة الخصوصية</div>
          <p style={s.intro}>
            نحن في موقع حرفة شُغل نحرص على حماية خصوصيتك وضمان أمان بياناتك.
            من خلال استخدامك للتطبيق، فإنك توافق على الشروط التالية:
          </p>
          {PRIVACY.map((section, i) => (
            <div key={i} style={s.section}>
              <div style={s.sectionTitle}>{section.title}</div>
              <div style={s.body}>{section.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}