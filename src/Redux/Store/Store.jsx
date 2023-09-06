import {configureStore} from '@reduxjs/toolkit'
import MilkReducer from '../Reducer/MilkReducer';
const store = configureStore({
    reducer:{
milk: MilkReducer
    }
})

export default store;