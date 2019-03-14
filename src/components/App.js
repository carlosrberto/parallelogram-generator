import React from 'react';
import MenuBar from './MenuBar';
import Canvas from './Canvas';
import OptionsBar from './OptionsBar';

import ss from './App.sass';

const App = () => (
  <div className={ss.app}>
    <h1 className={ss.mainTitle}>Parallelogram Generator</h1>
    <MenuBar />
    <div className={ss.canvasArea}>
      <Canvas />
    </div>
    <OptionsBar />
  </div>
);

export default App;
