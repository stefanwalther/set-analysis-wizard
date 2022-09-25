import React from 'react';
import './App.css';
import {NavHeader} from "./components/NavHeader";
import {Container} from "@mantine/core";
import NavFooter from "./components/NavFooter";

const NAV_LINKS = [
  {
    label: 'Help',
    link: '/help'
  },
  {
    label: 'Examples',
    link: '/examples',
    links: []

  },
  {
  link: '/about',
  label: 'About'
  }
]

function App() {
  return (
    <div className="App">
      <NavHeader links={NAV_LINKS}></NavHeader>
      <Container>

      </Container>
      <NavFooter></NavFooter>
    </div>
  );
}

export default App;
