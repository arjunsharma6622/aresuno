import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "User",
    initialState : {
        name : "",
        userType : ""
    },
    reducers : {
        userLogin  : (state, action) => {
            const {name, userType} = action.payload
            console.log(action.payload)
            state.name = name
            state.userType = userType
        },
        userLogout : (state) => {
            state.name = ""
            state.userType = ""
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer