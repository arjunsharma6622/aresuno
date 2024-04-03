import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "Business",
  initialState: {
    name: "",
  },
  reducers: {
    getBusiness: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { getBusiness } = businessSlice.actions;
export default businessSlice.reducer;
