import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Block from "./components/block"
import Projects from "./components/projects"
import Profile from "./components/profile"

ReactDOM.render(
  <React.StrictMode>
      <Block>
       <Profile/>
      </Block>
      <Block background='var(--secondary-background)'>
        <Projects/>
      </Block>
  </React.StrictMode>,
  document.getElementById('root')
);

