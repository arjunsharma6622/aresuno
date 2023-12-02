import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "User",
    initialState : {
        name : "",
        userType : "",
        image : ""
    },
    reducers : {
        userLogin  : (state, action) => {
            const {name, userType, image} = action.payload
            console.log(action.payload)
            state.name = name
            state.userType = userType
            state.image = image
        },
        userLogout : (state) => {
            state.name = "",
            state.userType = "",
            state.image = ""
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer