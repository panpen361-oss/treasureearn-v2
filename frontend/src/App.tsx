import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';

// Layouts & Guards
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute, PublicRoute } from './routes/RouteGuards';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { VerifyEmail } from './pages/VerifyEmail';
import { VerifyIp } from './pages/VerifyIp';
import { ResendOtp } from './pages/ResendOtp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

// App pages (sidebar layout - public to all)
import { HomePage } from './pages/HomePage';
import { EarnPage } from './pages/EarnPage';
import { CashoutPage, LeaderboardPage, ReferralsPage } from './pages/SidebarPages';
import { PrivacyPage } from './pages/PrivacyPage';

function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public app routes — sidebar layout, visible to everyone */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/cashout" element={<CashoutPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Auth routes - redirect to /home if already logged in */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Auth utility pages - always public */}
        <Route element={<AuthLayout />}>
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/verify-ip" element={<VerifyIp />} />
          <Route path="/verify-ip/:token" element={<VerifyIp />} />
          <Route path="/resend-otp" element={<ResendOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected user routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
