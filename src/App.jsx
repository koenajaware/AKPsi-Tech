import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Welcome from "./components/Rush/Welcome";
import Schedule from "./components/Rush/Schedule";
import Faq from "./components/Rush/Faq";
import Sponsors from "./components/Sponsors";
import Gallery from "./components/Gallery";
import Leadership from "./components/Leadership";
import Alumni from "./components/Alumni";
import Families from "./components/Brothers/Families";
import Contact from "./components/Contact";

function App() {
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/about#our-story" element={<About />} />
        <Route path="/about#pillars" element={<About />} />
        <Route path="/about#awards" element={<About />} />
        <Route path="/rush/welcome" element={<Welcome />} />
        <Route path="/rush/schedule" element={<Schedule />} />
        <Route path="/rush/faq" element={<Faq />} />
        <Route path="/sponsors" element={<Sponsors/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/brothers/alumni" element={<Alumni />} />
        <Route path="/brothers/families" element={<Families />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;