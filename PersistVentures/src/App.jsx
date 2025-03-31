import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListingPage from './pages/JobListingPage';
import CandidateListingPage from './pages/CandidateListingPage';
import SignUpPage from './pages/SignUpPage';
import JobModel from './components/JobModel';
import { useSelector } from 'react-redux';

const App = () => {
  const currentPath = window.location.pathname;
  console.log('current Path', currentPath);
  const showJobModel = useSelector((state) => state.jobModel.showJobModel);

  return (
    <>
      <BrowserRouter>
        {currentPath !== '/login' && currentPath !== '/signup' && <Navbar />}
        {showJobModel && <JobModel />}
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
