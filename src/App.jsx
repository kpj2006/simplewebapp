import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="app-container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/candidates">Candidates</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate/:id" element={<CandidateProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
