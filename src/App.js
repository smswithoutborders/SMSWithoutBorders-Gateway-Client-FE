import React, { useState } from 'react';
import './App.scss';

import Login from './content/Login';
import DashBoard from './content/Dashboard';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (<DashBoard />);
  }
  return (<Login />);
};

export default App;
