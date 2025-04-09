import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'

function App() {
  return (
    <BrowserRouter>
    <Home/>
    </BrowserRouter>
  )
}

export default App