import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.scss';
import {NavHeader} from "./components/NavHeader";
import {Affix, Container} from "@mantine/core";
import NavFooter from "./components/NavFooter";
import Home from "./pages/Home";
import Examples from "./pages/Examples";
import About from "./pages/About";
import Help from "./pages/Help";
import Start from "./pages/Start";
import FAQ from "./pages/FAQ";

const NAV_LINKS = [
  {
    key: 'start',
    route: '/start',
    label: 'Start'
  },
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
    key: 'faq',
    route: '/faq',
    label: `FAQ`
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
            <Route path='/start' element={<Start />} />
            <Route path='/help' element={<Help/>}/>
            <Route path='/examples' element={<Examples/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
