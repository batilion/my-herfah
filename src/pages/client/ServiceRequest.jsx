import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

function CalendarPicker({ selected, onSelect }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const weeks = [];
  let day = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++, day++) week.push(day);
    weeks.push(week);
    if (day > daysInMonth) break;
  }
  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0); } else setViewMonth(m => m+1); };

  return (
    <div style={{ direction: "ltr" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <button style={cBtn} onClick={prevMonth}>‹</button>
        <span style={{ fontWeight:700, fontSize:13 }}>{MONTHS[viewMonth]} {viewYear}</span>
        <button style={cBtn} onClick={nextMonth}>›</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", textAlign:"center", marginBottom:4 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <span key={d} style={{ fontSize:10, color:"#999" }}>{d}</span>)}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
          {week.map((d, di) => {
            const valid = d >= 1 && d <= daysInMonth;
            const dateStr = valid ? `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` : null;
            const isSelected = dateStr && selected === dateStr;
            const isPast = valid && new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return (
              <button key={di} style={{ border:"none", background: isSelected ? "#2e7d32" : "transparent", color: isSelected ? "#fff" : isPast ? "#ccc" : valid ? "#333" : "transparent", borderRadius:"50%", fontSize:12, padding:"5px 2px", cursor: valid && !isPast ? "pointer" : "default", fontWeight: isSelected ? 700 : 400 }}
                onClick={() => valid && !isPast && onSelect(dateStr)} disabled={!valid || isPast}>
                {valid ? d : ""}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const cBtn = { background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#2e7d32", fontWeight:700 };

function TimePicker({ hour, minute, period, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, padding:"8px 0" }}>
      {[["hour", hour, v => String((parseInt(v) % 12)+1).padStart(2,"0"), v => String(((parseInt(v)-2+12)%12)+1).padStart(2,"0")],
        ["minute", minute, v => String((parseInt(v)+1)%60).padStart(2,"0"), v => String((parseInt(v)-1+60)%60).padStart(2,"0")]
      ].map(([field, val, up, down], idx) => (
        <div key={field} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          <button style={cBtn} onClick={() => onChange(field, up(val))}>∧</button>
          <span style={{ fontSize:18, fontWeight:700, minWidth:28, textAlign:"center" }}>{val}</span>
          <button style={cBtn} onClick={() => onChange(field, down(val))}>∨</button>
          {idx < 1 && <span style={{ fontSize:18, fontWeight:700, position:"absolute", marginTop:24 }}>:</span>}
        </div>
      ))}
      <span style={{ fontSize:16, fontWeight:700, margin:"0 4px" }}>:</span>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
        <button style={cBtn} onClick={() => onChange("period", period === "AM" ? "PM" : "AM")}>∧</button>
        <span style={{ fontSize:18, fontWeight:700 }}>{period}</span>
        <button style={cBtn} onClick={() => onChange("period", period === "AM" ? "PM" : "AM")}>∨</button>
      </div>
    </div>
  );
}

const SIDEBAR_ITEMS = [
  { label: "الرئيسية", icon: "🏠", path: "/client/home" },
  { label: "الطلبات",  icon: "📋", path: "/client/requests" },
  { label: "المحادثات",icon: "💬", path: "/client/chats" },
  { label: "حسابي",   icon: "👤", path: "/client/profile" },
];

export default function ServiceRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const preService = location.state?.service || null;
  const [form, setForm] = useState({ serviceType: preService?.name || preService?.title || "", address: "", phone: "", description: "", suggestedPrice: "" });
  const [media, setMedia] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState({ hour: "06", minute: "27", period: "PM" });
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const fileRef = useRef();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    if (!form.serviceType || !form.address || !form.phone || !form.description) { setError("يرجى تعبئة جميع الحقول المطلوبة"); return; }
    if (!selectedDate) { setError("يرجى اختيار الموعد المناسب"); return; }
    if (!terms) { setError("يجب الموافقة على الشروط والأحكام"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("date", selectedDate);
      formData.append("time", `${time.hour}:${time.minute} ${time.period}`);
      if (media) formData.append("media", media);
      const res = await fetch("https://your-api.com/api/client/requests", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("clientToken")}` },
        body: formData,
      });
      if (res.ok) navigate("/client/requests");
      else { const data = await res.json(); setError(data.message || "حدث خطأ"); }
    } catch { setError("حدث خطأ، حاول مرة أخرى"); }
    finally { setLoading(false); }
  };

  return (
    <div dir="rtl" style={S.page}>
      <header style={S.navbar}>
        <span style={S.menuBtn}>☰</span>
        <span style={S.navTitle}>حرفة شغل</span>
        <div style={S.navLeft}>
          <div style={S.bellWrap}><span>🔔</span><span style={S.badge}>2</span></div>
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="user" style={S.userAvatar} />
        </div>
      </header>
      <div style={S.body}>
        <aside style={S.sidebar}>
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.path}
              style={{ ...S.navItem, background: item.path === "/client/home" ? "#e8f5e9" : "transparent", color: item.path === "/client/home" ? "#2e7d32" : "#333", fontWeight: item.path === "/client/home" ? 700 : 400 }}
              onClick={() => navigate(item.path)}
            ><span>{item.label}</span><span style={{ fontSize:18 }}>{item.icon}</span></div>
          ))}
          <div style={S.logoutBtn} onClick={() => { localStorage.removeItem("clientToken"); navigate("/"); }}>
            <span>تسجيل الخروج</span><span>🚪</span>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.formCard}>
            <h2 style={S.formTitle}>طلب خدمة</h2>

            <label style={S.label}>نوع الخدمة</label>
            <input style={S.input} value={form.serviceType} onChange={e => set("serviceType", e.target.value)} placeholder="سباكة" readOnly={!!preService} />

            <label style={S.label}>العنوان</label>
            <input style={S.input} value={form.address} onChange={e => set("address", e.target.value)} placeholder="اكتب عنوانك" />

            <label style={S.label}>رقم الهاتف</label>
            <input style={S.input} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="01XXXXXXXXX" type="tel" />

            <label style={S.label}>وصف الطلب</label>
            <textarea style={S.textarea} rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="اكتب تفاصيل المشكلة" />

            <label style={S.label}>إرفاق صورة أو فيديو للمشكلة</label>
            <div style={S.uploadBox} onClick={() => fileRef.current.click()}>
              <span style={{ fontSize:28 }}>📷</span>
              <span style={{ fontSize:12, color:"#999" }}>{mediaName || "اضغط لرفع صورة أو فيديو"}</span>
            </div>
            <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display:"none" }} onChange={e => { const f = e.target.files[0]; if(f){ setMedia(f); setMediaName(f.name); } }} />

            <div style={S.warningBox}>
              <span style={{ fontSize:18 }}>⚠️</span>
              <span style={{ fontSize:12, color:"#795548", lineHeight:1.5, textAlign:"right" }}>السعر تقديري بناءً على الصور والفيديو وقد يختلف عند المعاينة الفعلية.</span>
            </div>

            <div style={S.tipsBox}>
              <p style={{ fontWeight:700, fontSize:13, textAlign:"right", marginBottom:6 }}>إرشادات التصوير *</p>
              <ul style={{ margin:0, paddingRight:20, fontSize:12, color:"#555", lineHeight:2 }}>
                <li>صور واضحة للمشكلة</li><li>إضاءة جيدة</li><li>من أكثر من زاوية</li><li>لقطة قريبة من المكان</li>
              </ul>
            </div>

            <label style={S.label}>السعر المقترح</label>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span style={{ fontSize:20 }}>💰</span>
              <input style={{ ...S.input, flex:1, marginBottom:0 }} value={form.suggestedPrice} onChange={e => set("suggestedPrice", e.target.value)} placeholder="500 EGP" type="number" />
            </div>

            <label style={S.label}>الموعد المناسب للتنفيذ</label>
            <p style={{ fontSize:12, color:"#888", textAlign:"right", marginBottom:10, lineHeight:1.6 }}>يرجى تحديد الموعد المناسب، وسيقوم الفني بالتواصل معك خلال فترة محددة لتأكيد وقت الزيارة.</p>

            <div style={{ display:"flex", gap:12, marginBottom:14 }}>
              <div style={{ flex:1, position:"relative" }}>
                <div style={S.pickerToggle} onClick={() => { setShowDatePicker(v => !v); setShowTimePicker(false); }}>
                  <span>{selectedDate || "Select Date"}</span><span>{showDatePicker ? "∧" : "∨"}</span>
                </div>
                {showDatePicker && (
                  <div style={S.dropdownBox}>
                    <CalendarPicker selected={selectedDate} onSelect={d => { setSelectedDate(d); setShowDatePicker(false); }} />
                  </div>
                )}
              </div>
              <div style={{ flex:1, position:"relative" }}>
                <div style={S.pickerToggle} onClick={() => { setShowTimePicker(v => !v); setShowDatePicker(false); }}>
                  <span>{`${time.hour}:${time.minute} ${time.period}`}</span><span>{showTimePicker ? "∧" : "∨"}</span>
                </div>
                {showTimePicker && (
                  <div style={S.dropdownBox}>
                    <TimePicker {...time} onChange={(field, val) => setTime(t => ({ ...t, [field]: val }))} />
                  </div>
                )}
              </div>
            </div>

            <div style={S.tipsBox}>
              <p style={{ fontWeight:700, fontSize:13, textAlign:"right", marginBottom:6 }}>شروط تنفيذ الطلب *</p>
              <ul style={{ margin:0, paddingRight:20, fontSize:12, color:"#555", lineHeight:2.2, textAlign:"right" }}>
                <li>يلزم الاتفاق مع الفني خلال فترة قصيرة بعد إرسال الطلب.</li>
                <li>يتم الاتفاق على الموعد النهائي بين الفني والعميل.</li>
                <li>في حال عدم حضور الفني في الموعد المحدد يحق للعميل إلغاء الطلب.</li>
                <li>في حال عدم حضور العميل يحق للفني إلغاء الطلب أو إعادة جدولته.</li>
                <li>السعر النهائي يتم تحديده بعد المعاينة الفعلية.</li>
              </ul>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8, flexDirection:"row-reverse", marginBottom:14 }}>
              <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)} />
              <label htmlFor="terms" style={{ fontSize:13, color:"#444" }}>
                أوافق على <span style={{ color:"#2e7d32", fontWeight:700, cursor:"pointer" }} onClick={() => navigate("/client/terms")}>الشروط والأحكام</span>
              </label>
            </div>

            {error && <p style={{ color:"#e53935", fontSize:13, textAlign:"center", marginBottom:8 }}>{error}</p>}

            <div style={{ display:"flex", gap:12 }}>
              <button style={S.submitBtn} onClick={handleSubmit} disabled={loading}>{loading ? "جاري الإرسال..." : "إرسال الطلب"}</button>
              <button style={S.cancelBtn} onClick={() => navigate(-1)}>إلغاء الطلب</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight:"100vh", background:"#f5f5f5", display:"flex", flexDirection:"column" },
  navbar: { background:"#2e7d32", color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 18px", position:"sticky", top:0, zIndex:100 },
  menuBtn: { fontSize:22, cursor:"pointer" },
  navTitle: { fontSize:18, fontWeight:700 },
  navLeft: { display:"flex", alignItems:"center", gap:10 },
  bellWrap: { position:"relative", fontSize:20 },
  badge: { position:"absolute", top:-4, right:-4, background:"#e53935", color:"#fff", fontSize:10, borderRadius:"50%", width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center" },
  userAvatar: { width:34, height:34, borderRadius:"50%", border:"2px solid #fff" },
  body: { display:"flex", flex:1 },
  sidebar: { width:180, background:"#fff", borderLeft:"1px solid #e8e8e8", display:"flex", flexDirection:"column", padding:"20px 0", minHeight:"calc(100vh - 54px)", position:"sticky", top:54 },
  navItem: { display:"flex", alignItems:"center", justifyContent:"flex-end", gap:10, padding:"12px 20px", cursor:"pointer", borderRadius:8, margin:"2px 8px", fontSize:14 },
  logoutBtn: { display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8, padding:"12px 20px", cursor:"pointer", color:"#e53935", fontSize:13, marginTop:"auto" },
  main: { flex:1, padding:24 },
  formCard: { background:"#fff", borderRadius:12, padding:"24px 28px", maxWidth:560, width:"100%", boxShadow:"0 1px 8px rgba(0,0,0,0.07)" },
  formTitle: { fontWeight:700, fontSize:20, textAlign:"center", color:"#1a1a1a", marginBottom:20 },
  label: { fontSize:13, color:"#444", marginBottom:4, display:"block", textAlign:"right" },
  input: { width:"100%", border:"1.5px solid #e0e0e0", borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:14, outline:"none", boxSizing:"border-box", textAlign:"right", direction:"rtl" },
  textarea: { width:"100%", border:"1.5px solid #e0e0e0", borderRadius:8, padding:"10px 12px", fontSize:14, marginBottom:14, outline:"none", boxSizing:"border-box", textAlign:"right", direction:"rtl", resize:"vertical" },
  uploadBox: { border:"1.5px solid #e0e0e0", borderRadius:8, padding:"20px 12px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", marginBottom:14, background:"#fafafa" },
  warningBox: { background:"#fffde7", border:"1px solid #ffe082", borderRadius:8, padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:8, marginBottom:14 },
  tipsBox: { background:"#f9f9f9", border:"1px solid #e8e8e8", borderRadius:8, padding:"12px 16px", marginBottom:14 },
  pickerToggle: { border:"1.5px solid #e0e0e0", borderRadius:8, padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", background:"#fff", fontSize:13, color:"#444" },
  dropdownBox: { position:"absolute", top:"110%", right:0, left:0, background:"#fff", border:"1.5px solid #e0e0e0", borderRadius:8, boxShadow:"0 4px 16px rgba(0,0,0,0.12)", zIndex:200, padding:12 },
  submitBtn: { flex:1, background:"#2e7d32", color:"#fff", border:"none", borderRadius:8, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer" },
  cancelBtn: { flex:1, background:"#e53935", color:"#fff", border:"none", borderRadius:8, padding:"13px 0", fontSize:14, cursor:"pointer" },
};