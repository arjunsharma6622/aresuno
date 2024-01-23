import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "User",
    initialState : {
        name : "sdafds",
        userType : "",
        image : "",
        coordinates : {
            lat : "17.3666403",
            lng : "78.5205603"
        },
        locationName : "Hyderabad"
    },
    reducers : {
        userLogin  : (state, action) => {
            const {name, userType, image} = action.payload
            state.name = name
            state.userType = userType
            state.image = image
        },
        userLogout : (state) => {
            state.name = "",
            state.userType = "",
            state.image = ""
        },
        setUserCoordinates : (state, action) => {
            const {lat, lng} = action.payload
            state.coordinates = {
                lat,
                lng
            }
            
        },
        setUserLocationName : (state, action) => {
            const {locationName} = action.payload
            state.locationName = locationName
        }
    }
})

export const { userLogin, userLogout, setUserCoordinates, setUserLocationName } = userSlice.actions
export default userSlice.reducer