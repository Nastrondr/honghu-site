import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
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
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen flex flex-col bg-neutral-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/competition-center" element={<CompetitionCenter />} />
            <Route path="/competition/:id" element={<CompetitionDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-competition" element={<RegisterCompetition />} />
            <Route path="/team-hall" element={<TeamHall />} />
            <Route path="/competition-data" element={<CompetitionData />} />
            <Route path="/work-submission" element={<WorkSubmission />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;