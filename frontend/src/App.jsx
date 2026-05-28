import React from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './App.css';

import Login from "./pages/Login"
import Signin from './pages/Signin'
import Home from './pages/Home'

const App = () => {
  return (
    <div>

    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/logout' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
