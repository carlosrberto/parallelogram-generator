import React from 'react';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import Button from './Button';

import ss from './MenuBar.sass';

const MenuBar = () => (
  <div className={ss.menuBar}>
    <Button><IoIosUndo /></Button>
    <Button><IoIosRedo /></Button>
    <Button>reset</Button>
    <Button>about</Button>
  </div>
);

export default MenuBar;
