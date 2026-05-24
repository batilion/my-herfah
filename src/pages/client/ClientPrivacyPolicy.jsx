import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function ClientPrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} dir="rtl">
      <Header showNav />
      <div style={styles.body}>
        <div style={styles.card}>
          <h2 style={styles.mainTitle}>سياسة الخصوصية</h2>

          <p style={styles.intro}>نحن في موقع حرفة شغل نحرص على حماية خصوصيتك وضمان أمان بياناتك. من خلال استخدامك للتطبيق، فإنك توافق على الشروط التالية:</p>

          <Section title="1. جمع البيانات">
            <Item text="نقوم بجمع معلومات ضرورية لتقديم خدماتنا، مثل: الاسم، رقم الهاتف، الموقع الجغرافي، صور الأعطال، وسجل الحجوزات." />
          </Section>

          <Section title="2. استخدام البيانات">
            <Item text="نستخدم بياناتك لتحسين تجربتك داخل التطبيق: إرسال إشعارات مهمة، وربطك بالفنيين المناسبين." />
          </Section>

          <Section title="3. مشاركة البيانات">
            <Item text="لا نقوم بمشاركة بياناتك مع أي جهة خارجية بدون إذنك، إلا في حال كان ذلك ضروريًا لتقديم الخدمة أو امتثالاً للقانون." />
          </Section>

          <Section title="4. حماية البيانات">
            <Item text="نستخدم بروتوكولات أمان متقدمة لحماية بياناتك من الوصول غير المصرح به أو الاستخدام السيء." />
          </Section>

          <Section title="5. ملفات تعريف الارتباط (Cookies)">
            <Item text="قد نستخدم ملفات الكوكيز لتحسين أداء التطبيق وتجربة الاستخدام." />
          </Section>

          <Section title="6. حقوق المستخدم">
            <Item text="يحق لك الاطلاع على بياناتك، تعديلها، أو حذفها في أي وقت من خلال إعدادات الحساب." />
          </Section>

          <Section title="7. التعديلات">
            <Item text="قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. وسيتم إعلامك بأي تغييرات عبر الموقع أو التطبيق." />
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
