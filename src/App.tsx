import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.scss';
import {NavHeader} from "./components/NavHeader";
import {Container} from "@mantine/core";
import NavFooter from "./components/NavFooter";
import Home from "./pages/Home";
import Examples from "./pages/Examples";
import About from "./pages/About";
import Help from "./pages/Help";

const NAV_LINKS = [
  {
    key: 'help',
    route: '/help',
    label: 'Help'
  },
  {
    key: 'examples',
    route: '/examples',
    label: 'Examples',
    links: [
      {
        key: '/examples/1',
        route: '/examples/1',
        label: 'Basic Examples'
      }
    ]
  },
  {
    key: 'about',
    route: '/about',
    label: 'About',
  }
]

function App() {
  return (
    <Router>
      <div className="App" style={{height: '100vh'}}>
        <NavHeader links={NAV_LINKS}></NavHeader>
        <Container className='app-container' size={960}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/help' element={<Help/>}/>
            <Route path='/examples' element={<Examples/>}/>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
