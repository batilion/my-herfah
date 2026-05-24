import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const initMessages = [
  { id: 1, text: "مرحبًا، مع حضرتك الفني المسؤول عن طلبك", sender: "tech" },
  { id: 2, text: "أهلًا بحضرتك شكرًا على تواصلك", sender: "client" },
  { id: 3, text: "المشكلة عندي في السباكة", sender: "client" },
  { id: 4, text: "وهي محتاجة تدخل سريع لو سمحت", sender: "client" },
  { id: 5, text: "تم استلام الموعد والتفاصيل 🕐", sender: "tech" },
  { id: 6, text: "سيتم الحضور في الموعد المحدد إن شاء الله", sender: "tech" },
  { id: 7, text: "وفي حال حدوث أي تأخير سيتم التواصل معك فورًا", sender: "tech" },
  { id: 8, text: "وشكرًا لاختيارك خدمتنا", sender: "tech" },
];

export default function Conversations() {
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now(), text: input, sender: "client" }]);
    setInput("");
  };

  return (
    <div style={styles.page} dir="rtl">
      <Header title="المحادثة مع Ahmed Ali" />
      <div style={styles.body}>
        <div style={styles.main}>
          <div style={styles.chatBox}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "client" ? "flex-end" : "flex-start", marginBottom: 10, alignItems: "flex-end", gap: 8 }}>
                {m.sender === "tech" && <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="tech" style={styles.avatar} />}
                <div style={{ ...styles.bubble, background: m.sender === "client" ? "#e8f5e9" : "#fff", alignSelf: m.sender === "client" ? "flex-end" : "flex-start" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={styles.inputRow}>
            <button style={styles.sendBtn} onClick={send}>➤</button>
            <input
              style={styles.inputField}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب رسالة..."
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <span style={{ fontSize: 18, cursor: "pointer" }}>Aa</span>
          </div>
        </div>
        <Sidebar active="المحادثات" />
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" },
  body: { display: "flex", flex: 1 },
  main: { flex: 1, display: "flex", flexDirection: "column", padding: "16px 24px" },
  chatBox: { flex: 1, overflowY: "auto", marginBottom: 12, maxHeight: "calc(100vh - 200px)" },
  bubble: { borderRadius: 12, padding: "10px 14px", fontSize: 13, maxWidth: 280, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" },
  avatar: { width: 36, height: 36, borderRadius: "50%" },
  inputRow: { display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 24, padding: "8px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" },
  inputField: { flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", textAlign: "right" },
  sendBtn: { background: "#2e7d32", color: "#fff", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 16 },
};