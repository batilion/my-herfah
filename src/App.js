import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ══════════════════════════════
// Admin Pages
// ══════════════════════════════
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Technicians from "./pages/admin/Technicians";
import TechnicianDetails from "./pages/admin/technicianDetails";
import Services from "./pages/admin/Services";
import Reports from "./pages/admin/Reports";
import ReportsDetails from "./pages/admin/ReportsDetails";
import CreateAdmin from "./pages/admin/CreateAdmin";

// ══════════════════════════════
// Tech Pages
// ══════════════════════════════
import SelectAccountType from "./pages/tech/SelectAccountType";
import TechLogin from "./pages/tech/TechLogin";
import TechRegister from "./pages/tech/TechRegister";
import TechDashboard from "./pages/tech/TechDashboard";
import TechStatus from "./pages/tech/TechStatus";
import TechHome from "./pages/tech/TechHome";
import TechRegisterSuccess from "./pages/tech/TechRegisterSuccess";
import TechRequests from "./pages/tech/TechRequests";
import TechProfile from "./pages/tech/TechProfile";
import TechEditProfile from "./pages/tech/EditProfile";
import TechChangePassword from "./pages/tech/ChangePassword";
import PasswordChanged from "./pages/tech/PasswordChanged";
import Negotiation from "./pages/tech/Negotiation";
import TermsAndConditions from "./pages/tech/TermsAndConditions";
import PrivacyPolicy from "./pages/tech/PrivacyPolicy";
import RejectedStatus from "./pages/tech/RejectedStatus";
import AcceptedStatus from "./pages/tech/AcceptedStatus";

// ══════════════════════════════
// Client Pages
// ══════════════════════════════
import ClientAccountType from "./pages/client/ClientAccountTyp";
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientRegisterDone from "./pages/client/ClientRegisterDone";
import ClientHome from "./pages/client/ClientHome";
import ClientRequests from "./pages/client/ClientRequests";
import ServiceRequest from "./pages/client/ServiceRequest";
import DoneServiceRequest from "./pages/client/DoneServiceRequest";
import RequestDetails from "./pages/client/RequestDetails";
import RequestStatus from "./pages/client/RequestStatus";
import AfterRequestCompleted from "./pages/client/AfterRequestCompleted";
import ComplainDetails from "./pages/client/ComplainDetails";
import ComplainDone from "./pages/client/ComplainDone";
import Rating from "./pages/client/Rating";
import Conversations from "./pages/client/Conversations";
import Account from "./pages/client/Account";
import ClientEditProfile from "./pages/client/EditProfile";
import ClientChangePassword from "./pages/client/ChangePassword";
import ClientPasswordChanged from "./pages/client/ClientPasswordChanged";
import ClientTerms from "./pages/client/ClientTerms";
import ClientPrivacyPolicy from "./pages/client/ClientPrivacyPolicy";

// ══════════════════════════════
// Route Guards
// ══════════════════════════════
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

function ProtectedTechRoute({ children }) {
  const token = localStorage.getItem("techToken");
  if (!token) return <Navigate to="/tech/login" replace />;
  return children;
}

function ProtectedClientRoute({ children }) {
  const token = localStorage.getItem("clientToken");
  if (!token) return <Navigate to="/client/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectAccountType />} />

        {/* ══════════ Admin ══════════ */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/technicians" element={<ProtectedAdminRoute><Technicians /></ProtectedAdminRoute>} />
        <Route path="/admin/technicians/:id" element={<ProtectedAdminRoute><TechnicianDetails /></ProtectedAdminRoute>} />
        <Route path="/admin/services" element={<ProtectedAdminRoute><Services /></ProtectedAdminRoute>} />
        <Route path="/admin/reports" element={<ProtectedAdminRoute><Reports /></ProtectedAdminRoute>} />
        <Route path="/admin/reports/:id" element={<ProtectedAdminRoute><ReportsDetails /></ProtectedAdminRoute>} />
        <Route path="/admin/create-admin" element={<ProtectedAdminRoute><CreateAdmin /></ProtectedAdminRoute>} />

        {/* ══════════ Tech ══════════ */}
        <Route path="/tech/login" element={<TechLogin />} />
        <Route path="/tech/register" element={<TechRegister />} />
        <Route path="/tech/register/success" element={<TechRegisterSuccess />} />
        <Route path="/tech/rejected" element={<RejectedStatus />} />
        <Route path="/tech/accepted" element={<AcceptedStatus />} />
        <Route path="/tech/password-changed" element={<PasswordChanged />} />
        <Route path="/tech/dashboard" element={<ProtectedTechRoute><TechDashboard /></ProtectedTechRoute>} />
        <Route path="/tech/status" element={<ProtectedTechRoute><TechStatus /></ProtectedTechRoute>} />
        <Route path="/tech/home" element={<ProtectedTechRoute><TechHome /></ProtectedTechRoute>} />
        <Route path="/tech/requests" element={<ProtectedTechRoute><TechRequests /></ProtectedTechRoute>} />
        <Route path="/tech/profile" element={<ProtectedTechRoute><TechProfile /></ProtectedTechRoute>} />
        <Route path="/tech/edit-profile" element={<ProtectedTechRoute><TechEditProfile /></ProtectedTechRoute>} />
        <Route path="/tech/change-password" element={<ProtectedTechRoute><TechChangePassword /></ProtectedTechRoute>} />
        <Route path="/tech/negotiation" element={<ProtectedTechRoute><Negotiation /></ProtectedTechRoute>} />
        <Route path="/tech/terms" element={<ProtectedTechRoute><TermsAndConditions /></ProtectedTechRoute>} />
        <Route path="/tech/privacy" element={<ProtectedTechRoute><PrivacyPolicy /></ProtectedTechRoute>} />

        {/* ══════════ Client ══════════ */}
        <Route path="/client/account-type" element={<ClientAccountType />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client/register-done" element={<ClientRegisterDone />} />
        <Route path="/client/home" element={<ProtectedClientRoute><ClientHome /></ProtectedClientRoute>} />
        <Route path="/client/requests" element={<ProtectedClientRoute><ClientRequests /></ProtectedClientRoute>} />
        <Route path="/client/service-request" element={<ProtectedClientRoute><ServiceRequest /></ProtectedClientRoute>} />
        <Route path="/client/done-service-request" element={<ProtectedClientRoute><DoneServiceRequest /></ProtectedClientRoute>} />
        <Route path="/client/request-details" element={<ProtectedClientRoute><RequestDetails /></ProtectedClientRoute>} />
        <Route path="/client/request-status" element={<ProtectedClientRoute><RequestStatus /></ProtectedClientRoute>} />
        <Route path="/client/after-request-completed" element={<ProtectedClientRoute><AfterRequestCompleted /></ProtectedClientRoute>} />
        <Route path="/client/complain-details" element={<ProtectedClientRoute><ComplainDetails /></ProtectedClientRoute>} />
        <Route path="/client/complain-done" element={<ProtectedClientRoute><ComplainDone /></ProtectedClientRoute>} />
        <Route path="/client/rating" element={<ProtectedClientRoute><Rating /></ProtectedClientRoute>} />
        <Route path="/client/conversations" element={<ProtectedClientRoute><Conversations /></ProtectedClientRoute>} />
        <Route path="/client/account" element={<ProtectedClientRoute><Account /></ProtectedClientRoute>} />
        <Route path="/client/edit-profile" element={<ProtectedClientRoute><ClientEditProfile /></ProtectedClientRoute>} />
        <Route path="/client/change-password" element={<ProtectedClientRoute><ClientChangePassword /></ProtectedClientRoute>} />
        <Route path="/client/password-changed" element={<ProtectedClientRoute><ClientPasswordChanged /></ProtectedClientRoute>} />
        <Route path="/client/terms" element={<ProtectedClientRoute><ClientTerms /></ProtectedClientRoute>} />
        <Route path="/client/privacy" element={<ProtectedClientRoute><ClientPrivacyPolicy /></ProtectedClientRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;