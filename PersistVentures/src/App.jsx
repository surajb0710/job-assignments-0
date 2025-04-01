import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListingPage from './pages/JobListingPage';
import CandidateListingPage from './pages/CandidateListingPage';
import SignUpPage from './pages/SignUp0';
import JobModel from './components/JobModel';
import { AnimatePresence } from 'framer-motion';
import DashboardPage from './pages/DashboardPage';
import {
  PrivateRouteForAuthUser,
  PrivateRouteForUnAuthUser,
} from './utils/PrivateRoute';
import ScrollToTop from './utils/ScrollToTop';
import AboutUsPage from './pages/AboutUsPage';
import OurTeamPage from './pages/OurTeamPage';
import BlogsPage from './pages/BlogsPage';
import FAQsPage from './pages/FAQsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import { Toaster } from 'react-hot-toast';

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
      <Toaster position="top-right" />
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
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/ourteam" element={<OurTeamPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route
            path="/termsandconditions"
            element={<TermsAndConditionsPage />}
          />
        </Routes>
      </ScrollToTop>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Footer />
      )}
    </>
  );
};

export default App;
