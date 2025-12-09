import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Userpage from './Component/Userpage'
import Reportform from './Component/Reportform'
import Tickesstatus from './Component/Tickesstatus'
import Admin from './Component/Admin'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Userpage/>}/>
        <Route path='/form' element={<Reportform/>}/>
        <Route path='/ticket' element={<Tickesstatus/>}/>
        <Route path='/admin' element={<Admin/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
