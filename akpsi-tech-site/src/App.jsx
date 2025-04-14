import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Home/Header';
import Banner from './components/Home/Banner';
import Story from './components/Home/Story';
import Organizations from './components/Home/Organizations';
import Pillars from './components/Home/Pillars';
import Awards from './components/Home/Awards';
import Sponsors from './components/Home/Sponsors';
import BrothersPage from './components/Brother/BrotherPage'; // import the new page
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        {/* Define your main routes here */}
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Sponsors />
              <Story />
              <Organizations />
              <Pillars />
              <Awards />
            </>
          } />
          <Route path="/brothers" element={<BrothersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;