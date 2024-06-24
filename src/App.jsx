import { Routes, Route } from 'react-router-dom';
import './App.css'
import Splash from './components/Splash';
import Predict from './components/Predict';
import LandingPage from './components/LandingPage';

function App() {



  return (
    <>
    
          <Routes>
              <Route path='/' element={<Splash/>}  />
              <Route path='/LandingPage' element={<LandingPage />} />
              <Route path='LandingPage/Predict' element={<Predict />} />

          </Routes>

    

  
    </>
  )
}

export default App
