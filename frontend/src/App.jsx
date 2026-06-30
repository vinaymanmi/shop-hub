import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';

import Login from "./pages/Login"
import Signin from './pages/Signin'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Logout from './pages/Logout'
import { ToastProvider } from './context/ToastContext'

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
