import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import User from './pages/User'
import History from './pages/History'
import ComparePlayers from './pages/Compare'
import Home from './pages/Home'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/finduser' element={<User/>} />
      <Route path='/history' element={<History/>}/>
      <Route  path='/compare' element={<ComparePlayers/>}/>
    </Routes>
    </BrowserRouter>
  )
}


export default App;
