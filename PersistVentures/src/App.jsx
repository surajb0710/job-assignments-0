import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListingPage from './pages/JobListingPage';
import CandidateListingPage from './pages/CandidateListingPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  const currentPath = window.location.pathname;
  console.log('current Path', currentPath);
  return (
    <>
      <BrowserRouter>
        {currentPath !== '/login' && currentPath !== '/signup' && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/candidates" element={<CandidateListingPage />} />
        </Routes>
        {currentPath !== '/login' && currentPath !== '/signup' && <Footer />}
      </BrowserRouter>
    </>
  );
};

export default App;
