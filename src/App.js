import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Technicians from "./pages/admin/Technicians";
import TechnicianDetails from "./pages/admin/technicianDetails";
import Services from "./pages/admin/Services";
import Reports from "./pages/admin/Reports";
import ReportsDetails from "./pages/admin/ReportsDetails";
import CreateAdmin from "./pages/admin/CreateAdmin";

// Tech Pages
import SelectAccountType from "./pages/tech/SelectAccountType";
import TechLogin from "./pages/tech/TechLogin";
import TechRegister from "./pages/tech/TechRegister";
import TechDashboard from "./pages/tech/TechDashboard";
import TechStatus from "./pages/tech/TechStatus";
import TechHome           from "./pages/tech/TechHome";
import TechRegisterSuccess from "./pages/tech/TechRegisterSuccess";
import TechRequests       from "./pages/tech/TechRequests";
import TechProfile        from "./pages/tech/TechProfile";
import EditProfile from "./pages/tech/EditProfile";
import ChangePassword from "./pages/tech/ChangePassword";
import PasswordChanged from "./pages/tech/PasswordChanged";
import Negotiation from "./pages/tech/Negotiation";
import TermsAndConditions from "./pages/tech/TermsAndConditions";
import PrivacyPolicy from "./pages/tech/PrivacyPolicy";
import RejectedStatus from "./pages/tech/RejectedStatus";
import AcceptedStatus from "./pages/tech/AcceptedStatus";
// =====================
// حماية صفحات الأدمن
// =====================
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

// =====================
// حماية صفحات الفني
// =====================
function ProtectedTechRoute({ children }) {
  const token = localStorage.getItem("techToken");
  if (!token) return <Navigate to="/tech/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── الصفحة الرئيسية ── */}
        <Route path="/" element={<SelectAccountType />} />

        {/* ══════════════════════════════
            صفحات الأدمن
        ══════════════════════════════ */}
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>
        } />
        <Route path="/admin/technicians" element={
          <ProtectedAdminRoute><Technicians /></ProtectedAdminRoute>
        } />
        <Route path="/admin/technicians/:id" element={
          <ProtectedAdminRoute><TechnicianDetails /></ProtectedAdminRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedAdminRoute><Services /></ProtectedAdminRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedAdminRoute><Reports /></ProtectedAdminRoute>
        } />
        <Route path="/admin/reports/:id" element={
          <ProtectedAdminRoute><ReportsDetails /></ProtectedAdminRoute>
        } />
        <Route path="/admin/create-admin" element={
          <ProtectedAdminRoute><CreateAdmin /></ProtectedAdminRoute>
        } />

        {/* ══════════════════════════════
            صفحات الفني
        ══════════════════════════════ */}
        <Route path="/tech/login"    element={<TechLogin />} />
        <Route path="/tech/register" element={<TechRegister />} />

        <Route path="/tech/dashboard" element={
          <ProtectedTechRoute><TechDashboard /></ProtectedTechRoute>
        } />
        <Route path="/tech/status" element={
          <ProtectedTechRoute><TechStatus /></ProtectedTechRoute>
        } />
        <Route path="/tech/home" element={
  <ProtectedTechRoute><TechHome /></ProtectedTechRoute>
} />
<Route path="/tech/register/success" element={<TechRegisterSuccess />} />
<Route path="/tech/requests" element={
  <ProtectedTechRoute><TechRequests /></ProtectedTechRoute>
} />
<Route path="/tech/profile" element={
  <ProtectedTechRoute><TechProfile /></ProtectedTechRoute>
} />
<Route path="/tech/edit-profile" element={<ProtectedTechRoute><EditProfile /></ProtectedTechRoute>} />
<Route path="/tech/change-password" element={<ProtectedTechRoute><ChangePassword /></ProtectedTechRoute>} />
<Route path="/tech/password-changed" element={<PasswordChanged />} />
<Route path="/tech/negotiation" element={<ProtectedTechRoute><Negotiation /></ProtectedTechRoute>} />
<Route path="/tech/terms" element={<ProtectedTechRoute><TermsAndConditions /></ProtectedTechRoute>} />
<Route path="/tech/privacy" element={<ProtectedTechRoute><PrivacyPolicy /></ProtectedTechRoute>} />
<Route path="/tech/rejected" element={<RejectedStatus />} />
<Route path="/tech/accepted" element={<AcceptedStatus />} />
        {/* ── أي رابط تاني يرجع للرئيسية ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;