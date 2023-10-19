
import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Chatpage from './Pages/Chatpage';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App' >
    

    {/* <Button colorScheme='blue'>Button</Button> */}
    <Routes>
    <Route path='/' Component={Home}  />
    <Route path='/chatspage' Component={Chatpage} ></Route>
    </Routes>
    </div>
  );
}

export default App;
