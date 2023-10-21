import {createSlice} from "@reduxjs/toolkit"

const businessSlice = createSlice({
    name : "Business",
    initialState : {
        name : "",
        type : "",
        mainCategory : "",
        subCategory : "",
        phone : "",
        timing : "",
    },
    reducers : {
        getBusiness : (state, action) => {
            state.name = action.payload
        }
        
    }
})

export const { getBusiness } = businessSlice.actions
export default businessSlice.reducer