import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Technicians from "./pages/admin/Technicians";
import TechnicianDetails from "./pages/admin/technicianDetails";
import Services from "./pages/admin/Services";
import Reports from "./pages/admin/Reports";
import ReportsDetails from "./pages/admin/ReportsDetails";
import CreateAdmin from "./pages/admin/CreateAdmin";

// حماية الصفحات - لو مفيش token يرجع للوجين
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* اللوجين */}
        <Route path="/admin/login" element={<Login />} />

        {/* صفحات الأدمن المحمية */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/technicians" element={
          <ProtectedRoute><Technicians /></ProtectedRoute>
        } />
        <Route path="/admin/technicians/:id" element={
          <ProtectedRoute><TechnicianDetails /></ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute><Services /></ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>
        } />
        <Route path="/admin/reports/:id" element={
          <ProtectedRoute><ReportsDetails /></ProtectedRoute>
        } />
        <Route path="/admin/create-admin" element={
          <ProtectedRoute><CreateAdmin /></ProtectedRoute>
        } />

        {/* أي رابط تاني يرجع للوجين */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;