import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="w-full">
      <nav className="fixed top-0 w-full bg-white shadow-md z-10">
        {/* <div className="container max-w-full flex justify-between items-center p-10"> */}
        <div className="flex justify-between items-center px-10 py-5">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-500 font-medium"
            >
              Home
            </Link>
            <Link
              to="/candidates"
              className="text-gray-800 hover:text-blue-500 font-medium"
            >
              Candidates
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-blue-500 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-blue-500 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}
