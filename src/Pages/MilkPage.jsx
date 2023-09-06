import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import store from '../Redux/Store/Store'
const MilkPage = () =>{
    const milkList = useSelector(store=>store.milk)
    const dispatch = useDispatch()

return (
    <h1>
        {milkList}
    </h1>
)
}

export default MilkPage