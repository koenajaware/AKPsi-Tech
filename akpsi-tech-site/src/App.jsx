import React from 'react';
import Header from './components/Home/Header';
import Banner from './components/Home/Banner';
import Story from './components/Home/Story';
import Organizations from './components/Home/Organizations';
import Pillars from './components/Home/Pillars';
import PhotoWheel from './components/Home/PhotoWheel';
import Awards from './components/Home/Awards';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Story />
      <Organizations />
      <Pillars />
      <PhotoWheel />
      <Awards />
    </div>
  );
}

export default App;