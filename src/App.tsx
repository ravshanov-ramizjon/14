import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import BaseHome from './pages/baseHome'
import Home from './pages/artists'
import BaseLayout from './layouts/baseLayout'
import Main from './layouts/mainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<BaseHome />} />
        </Route>
        <Route path="/main" element={<Main />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
