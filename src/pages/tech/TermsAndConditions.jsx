import { useNavigate } from "react-router-dom";

const PRIMARY = "#1a5c2a";
const DANGER = "#c0392b";

const TERMS = [
  { title: "1. التعريفات", items: [
    '- "المستخدم" هو الشخص الذي يستخدم الموقع لطلب الخدمات.',
    '- "مزود الخدمة" هو الفني أو الجهة التي تقدم الخدمة المطلوبة.',
    '- "الموقع" هو منصة حرفة شُغل المتاحة عبر الويب أو الهاتف.',
  ]},
  { title: "2. استخدام الموقع", items: [
    "- يلتزم المستخدم بتقديم معلومات صحيحة وحديثة عند التسجيل.",
    "- يحق للإدارة إلغاء أو تعليق أي حساب في حال تم اكتشاف استخدام غير مشروع أو معلومات مزيفة.",
  ]},
  { title: "3. حجز الخدمات", items: [
    "- يحق للمستخدم حجز خدمة عن طريق اختيار القسم من الصفحة الرئيسية والتواصل مع مزود الخدمة عن طريق الهاتف أو الرسائل.",
    "- يتم حجز الخدمة عن طريق مزود الخدمة بعد الاتفاق على موعد تقديم الخدمة ثم يصل إشعار للمستخدم بأنه تم تأكيد الحجز.",
  ]},
  { title: "4. الأسعار والدفع", items: [
    "- يقدم مزودو الخدمة عروض أسعار تنافسية.",
    "- يتم الدفع بأي وسيلة دفع عن طريق الاتفاق بين مزود الخدمة والعميل.",
  ]},
  { title: "5. الضمان والجودة", items: [
    '- "حرفة شُغل" ليس جهة تنفيذية بل منصة وسيطة، لكن نحرص على توثيق جودة الخدمة وتقييماتهم.',
    "- يحق للمستخدم تقييم الخدمة بعد التنفيذ، وليستخدم التقييمات لتحسين جودة الفنيين.",
  ]},
  { title: "6. المسؤولية", items: [
    "- موقع حرفة شُغل غير مسؤول عن أي أضرار ناتجة عن تنفيذ الخدمة، لكننا نتدخل في حال وجود شكاوى موثقة.",
    "- يتحمل مزود الخدمة كامل المسؤولية عن جودة العمل ومطابقته للطلب.",
  ]},
  { title: "7. التعديلات", items: [
    "- يحق لموقع حرفة شُغل تعديل الشروط في أي وقت، وسيتم إخطار المستخدم بالتحديثات.",
  ]},
];

export default function TermsAndConditions() {
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
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 15, fontWeight: 700, color: "#222", textAlign: "right", marginBottom: 8 },
    item: { fontSize: 13, color: "#444", textAlign: "right", lineHeight: 1.9, marginBottom: 4 },
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
          <div style={s.pageTitle}>الشروط والأحكام</div>
          <p style={s.intro}>
            مرحبا بك في موقع حرفة شُغل، باستخدامك للموقع، فإنك توافق على الشروط التالية:
          </p>
          {TERMS.map((section, i) => (
            <div key={i} style={s.section}>
              <div style={s.sectionTitle}>{section.title}</div>
              {section.items.map((item, j) => (
                <div key={j} style={s.item}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}