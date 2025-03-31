import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListingPage from './pages/JobListingPage';
import CandidateListingPage from './pages/CandidateListingPage';
import SignUpPage from './pages/SignUpPage';
import JobModel from './components/JobModel';
import { AnimatePresence } from 'framer-motion';
import DashboardPage from './pages/DashboardPage';
import {
  PrivateRouteForAuthUser,
  PrivateRouteForUnAuthUser,
} from './utils/PrivateRoute';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
};

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Navbar />
      )}
      <AnimatePresence>
        <JobModel />
      </AnimatePresence>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRouteForAuthUser />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<PrivateRouteForUnAuthUser />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/candidates" element={<CandidateListingPage />} />
        </Routes>
      </ScrollToTop>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Footer />
      )}
    </>
  );
};

export default App;
