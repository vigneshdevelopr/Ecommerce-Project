import {Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import { styled } from 'styled-components'
import Register from './Pages/Register'
import Loading from './components/Loading'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
function App() {
  return (
<Container>
    <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
    </Routes>
</Container>
    )
}

export default App


const Container = styled.div`
width: 100vw;
`