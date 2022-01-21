import React from 'react';
//components
import Header from './components/Header/index.js';
import Home from './components/Home.js';

//style
import { GlobalStyle } from './GlobalStyle.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <GlobalStyle />
    </div>
  );
}

export default App;
