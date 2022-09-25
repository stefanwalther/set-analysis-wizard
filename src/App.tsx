import React from 'react';
import './App.css';
import {HeaderMenu} from "./components/HeaderMenu";

const NAV_LINKS = [{
  link: '/about',
  label: 'About',
  links: []
}
]

function App() {
  return (
    <div className="App">
      <HeaderMenu links={NAV_LINKS}></HeaderMenu>
    </div>
  );
}

export default App;
