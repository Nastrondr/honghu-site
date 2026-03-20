import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
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

function App() {
  return (
    <AuthProvider>
      <CustomCursor />
      <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;