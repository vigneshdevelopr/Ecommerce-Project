import {createSlice} from '@reduxjs/toolkit'
export const milkSlice = createSlice({
    name:'milk',
    initialState:[],
    reducers:{
        addMilk:(state,action)=>{
            state.push(action.payload)
        },
        deleteMilk:(state,action)=>{
            return state.filter(milk=>milk!==action.payload)
        }
    }
})


export default milkSlice.reducer;
const addMilkProd = milkSlice.actions.addMilk
const removeMilkProd = milkSlice.actions.deleteMilk

export {addMilkProd,removeMilkProd}