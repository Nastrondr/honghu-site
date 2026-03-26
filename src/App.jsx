import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/common/PageTransition';
import CustomCursor from './components/common/CustomCursor';
import Home from './pages/Home';
import CompetitionCenter from './pages/CompetitionCenter';
import CompetitionDetail from './pages/CompetitionDetail';
import About from './pages/About';
import Resources from './pages/Resources';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Partners from './pages/Partners';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterCompetition from './pages/RegisterCompetition';
import TeamHall from './pages/TeamHall';
import CompetitionData from './pages/CompetitionData';
import WorkSubmission from './pages/WorkSubmission';
import Dashboard from './pages/Dashboard';
import Experts from './pages/Experts';
import EcoProducts from './pages/EcoProducts';
import ApplyCompetition from './pages/ApplyCompetition';
import Enterprise from './pages/Enterprise';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

// 后台管理相关组件
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCompetitions from './pages/admin/AdminCompetitions';
import AdminEnrollments from './pages/admin/AdminEnrollments';
import AdminWorks from './pages/admin/AdminWorks';
import AdminReviews from './pages/admin/AdminReviews';
import AdminNews from './pages/admin/AdminNews';
import AdminStats from './pages/admin/AdminStats';

// 前台路由组件
const FrontendRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/competition-center" element={<CompetitionCenter />} />
        <Route path="/competition/:id" element={<CompetitionDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/eco-products" element={<EcoProducts />} />
        <Route path="/apply-competition" element={<ApplyCompetition />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-competition" element={<RegisterCompetition />} />
        <Route path="/team-hall" element={<TeamHall />} />
        <Route path="/competition-data" element={<CompetitionData />} />
        <Route path="/work-submission" element={<WorkSubmission />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </PageTransition>
  );
};

// 前台布局组件
const FrontendLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <FrontendRoutes />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CustomCursor />
      <Router>
        <Routes>
          {/* 前台路由 - 有Header和Footer */}
          <Route path="/*" element={<FrontendLayout />} />
          
          {/* 后台登录页 - 独立布局 */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 后台路由 - 使用AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="competitions" element={<AdminCompetitions />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
            <Route path="works" element={<AdminWorks />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
