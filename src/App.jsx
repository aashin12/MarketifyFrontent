
import { Routes,Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import ProductDetails from './pages/ProductDetails'
import AdminPage from './pages/AdminPage'
import { AdminRoute, UserRoute } from './components/ProtectedRoutes'
import Unauthorized from './components/Unauthorized'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      
       
         {/* Admin Routes */}
        <Route element={<AdminRoute/>}>
          <Route path="/admin" element={<AdminPage/>} />
        </Route>

        
        {/* User Routes */}
        <Route element={<UserRoute/>}>
          <Route path="/home" element={<UserDashboard/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

         <Route path="/unauthorized" element={<Unauthorized/>} />

      </Routes>
      
    </>
  )
}

export default App
