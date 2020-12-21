/**
 * Copyright (c)
 * All rights reserved. developer.martinhwang@gmail.com
 *
 * Filename: App.js
 *
 * Key Options:
 * 
 *
 * Revision History:
 * - 18 Oct 2020, Martin Hwang <developer.martinhwang@gmail.com> : Created
 */
import React from 'react';
import './App.css';
// components
import Students from './components/Students'
//material-ui core
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Students/>
      </div>
    </div>
  );
}

export default App;
