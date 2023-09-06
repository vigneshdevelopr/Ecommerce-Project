import {createSlice} from '@reduxjs/toolkit'


export const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addtoCart: (state,action)=>{
            state.push(action.payload)
        },
        removeCart:(state,action)=>{
            return state.filter((item)=>item!==action.payload.id)
        },
    },
})

export const {addtoCart,removeCart}=cartSlice.actions;

export default cartSlice.reducer;