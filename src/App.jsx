import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Login = lazy(() => import("./pages/login"));
const Help = lazy(() => import("./pages/help"));
const NotFound = lazy(() => import("./pages/notFound"));

export default function App() {
  return (
    <>
      <ScrollToTop />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}