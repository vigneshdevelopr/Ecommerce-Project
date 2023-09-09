import {Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import { styled } from 'styled-components'
import Register from './Pages/Register'
import Loading from './components/Loading'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import EndCard from './Pages/EndCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getuserId } from './components/Who\'s_the_User'
import Admin from './Pages/Admin'
import Your_Orders from './Pages/Your_Orders'
function App() {
    const userId = getuserId();


const [loginUser,setLoginUser]=useState([])
    useEffect(()=>{
const loginUsers = async() =>{
    const response = await axios.get(`https://townbazzar-backend.onrender.com/products/loginUser/${userId}`)
    setLoginUser(response.data)
   console.log(response.data);

    console.log(loginUser);
}
loginUsers();

    },[Admin])
  return (
<Container>
    <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/end' element={<EndCard />} />
        <Route path='/orders' element={<Your_Orders />} />
        <Route path='/admin'  element={<Admin loginUser={loginUser} setLoginUser={setLoginUser} />} />
    </Routes>
</Container>
    )
}

export default App;


const Container = styled.div`
`