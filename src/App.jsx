import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Splash from './components/Splash';
import Predict from './components/Predict';
import LandingPage from './components/LandingPage';

function App() {

  return (
    <>
    <BrowserRouter>

          <Routes>
              <Route path='/' element={<Splash/>}  />
              <Route path='/LandingPage' element={<LandingPage/>} />
              <Route path='LandingPage/Predict' element={<Predict />} />

          </Routes>

    

    </BrowserRouter>
    </>
  )
}

export default App
