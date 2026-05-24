import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function ClientTerms() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.card}>
          <h2 style={styles.mainTitle}>الشروط والأحكام</h2>

          <p style={styles.intro}>مرحبًا بك في موقع حرفة شغل. باستخدامك للموقع، فإنك توافق على الشروط التالية:</p>

          <Section title="1. التعريفات">
            <Item text='- "المستخدم" هو الشخص الذي يستخدم الموقع لطلب الخدمات.' />
            <Item text='- "مزود الخدمة" هو الفني أو الجهة التي تقدم الخدمة المطلوبة.' />
            <Item text='- "الموقع" هو منصة حرفة شغل المتاحة عبر الويب أو الهاتف.' />
          </Section>

          <Section title="2. استخدام الموقع">
            <Item text="- يلتزم المستخدم بتقديم معلومات صحيحة وحديثة عند التسجيل." />
            <Item text="- حق للإدارة إلغاء أي حساب في حال تم اكتشاف استخدام غير مشروع أو معلومات مزيفة." />
          </Section>

          <Section title="3. حجز الخدمات">
            <Item text="- حق للمستخدم حجز خدمة عن طريق اختيار القسم من الصفحة الرئيسية والتواصل مع مزود الخدمة عن طريق الهاتف أو الرسائل." />
            <Item text="- يتم حجز الخدمة عن طريق مزود الخدمة بعد الاتفاق على موعد تقديم الخدمة تم يصل إشعار للمستخدم بأنه قد تم الحجز." />
          </Section>

          <Section title="4. الأسعار والدفع">
            <Item text="- يقدم مزودو الخدمة عروض أسعار تنافسية." />
            <Item text="- يتم الدفع بأي وسيلة دفع عن طريق الاتفاق بين مزود الخدمة والعميل." />
          </Section>

          <Section title="5. الضمان والجودة">
            <Item text='- "حرفة شغل" ليس جهة تنفيذية بل منصة وسيطة، لكننا نحرص على توثيق مزودي الخدمة وتقييماتهم.' />
            <Item text="- حق للمستخدم تقييم الخدمة بعد التنفيذ، ويُستخدم التقييم لتحسين جودة الفنيين." />
          </Section>

          <Section title="6. المسؤولية">
            <Item text="- موقع حرفة شغل غير مسؤول عن أي أضرار ناتجة عن تنفيذ الخدمة، لكننا لكننا نتدخل في حال وجود شكاوى موثقة." />
            <Item text="- يتحمل مزود الخدمة كامل المسؤولية عن جودة العمل ومطابقته للطلب." />
          </Section>

          <Section title="7. التعديلات">
            <Item text="- يحق لموقع حرفة شغل تعديل الشروط في أي وقت، وسيتم إخطار المستخدم بالتحديثات." />
          </Section>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 18 }}>
    <h4 style={{ textAlign: "right", fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#1a1a1a" }}>{title}</h4>
    {children}
  </div>
);

const Item = ({ text }) => (
  <p style={{ textAlign: "right", fontSize: 13, color: "#444", lineHeight: 1.8, margin: "2px 0" }}>{text}</p>
);

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", justifyContent: "center", padding: "24px 16px" },
  card: { background: "#fff", borderRadius: 12, padding: "28px 28px", width: "100%", maxWidth: 580, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" },
  mainTitle: { textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 16, color: "#1a1a1a" },
  intro: { textAlign: "right", fontSize: 13, color: "#555", marginBottom: 18, lineHeight: 1.7 },
};
