import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "Banner",
  initialState: {
    url: "",
  },
  reducers: {
    getBanner: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { getBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
