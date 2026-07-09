import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import ToastManager from './components/common/ToastManager';

// Pages
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import CourseRegistration from './pages/student/CourseRegistration';
import CourseDetails from './pages/student/CourseDetails';
import Validation from './pages/student/Validation';
import PendingApproval from './pages/student/PendingApproval';
import RegistrationSuccess from './pages/student/RegistrationSuccess';
import Timetable from './pages/student/Timetable';
import FeeStatus from './pages/student/FeeStatus';
import RegistrationSlip from './pages/student/RegistrationSlip';
import LecturerDashboard from './pages/lecturer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminReports from './pages/admin/Reports';

// Route guard component
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useApp();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard
    const dashboardMap = {
      student: '/student/dashboard',
      lecturer: '/lecturer/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboardMap[user.role] || '/login'} replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/student/courses" element={
            <ProtectedRoute allowedRoles={['student']}>
              <CourseRegistration />
            </ProtectedRoute>
          } />
          <Route path="/student/courses/:id" element={
            <ProtectedRoute allowedRoles={['student']}>
              <CourseDetails />
            </ProtectedRoute>
          } />
          <Route path="/student/validation" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Validation />
            </ProtectedRoute>
          } />
          <Route path="/student/pending" element={
            <ProtectedRoute allowedRoles={['student']}>
              <PendingApproval />
            </ProtectedRoute>
          } />
          <Route path="/student/success" element={
            <ProtectedRoute allowedRoles={['student']}>
              <RegistrationSuccess />
            </ProtectedRoute>
          } />
          <Route path="/student/timetable" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Timetable />
            </ProtectedRoute>
          } />
          <Route path="/student/fees" element={
            <ProtectedRoute allowedRoles={['student']}>
              <FeeStatus />
            </ProtectedRoute>
          } />
          <Route path="/student/slip" element={
            <ProtectedRoute allowedRoles={['student']}>
              <RegistrationSlip />
            </ProtectedRoute>
          } />
          
          {/* Lecturer routes */}
          <Route path="/lecturer/dashboard" element={
            <ProtectedRoute allowedRoles={['lecturer']}>
              <LecturerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          } />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <ToastManager />
    </Router>
  );
}

export default App;
