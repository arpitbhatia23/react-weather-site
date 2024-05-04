import { combineReducers , createSlice } from "@reduxjs/toolkit";
const initialState={
    data:null
}
export const dataslice = createSlice({name:'data',
initialState,
reducers:
{
    setdata:(state,action)=>{
        state.data=action.payload
    }
}})
export const {setdata}=dataslice.actions
export default dataslice.reducer