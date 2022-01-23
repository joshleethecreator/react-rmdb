import React from 'react';
//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components
import Header from './components/Header/index.js';
import Home from './components/Home.js';
import Movie from './components/Movie'
import NotFound from './components/NotFound'

//style
import { GlobalStyle } from './GlobalStyle.js';

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:movieId' element={<Movie />} />
        <Route path='/*' element={<NotFound />} /> 
      </Routes>

      <GlobalStyle />
    </Router>
  );
}

export default App;
