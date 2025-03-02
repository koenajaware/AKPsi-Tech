import React from 'react';
import Header from './components/Home/Header';
import Banner from './components/Home/Banner';
import Story from './components/Home/Story';
import Organizations from './components/Home/Organizations';
import Pillars from './components/Home/Pillars';
import Awards from './components/Home/Awards';
import './App.css';
import Sponsors from './components/Home/Sponsors';

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Sponsors />
      <Story />
      <Organizations />
      <Pillars />
      <Awards />
    </div>
  );
}

export default App;