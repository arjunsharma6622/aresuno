import { createSlice } from "@reduxjs/toolkit";

export const categoriestitleSlice = createSlice({
  name: "CategoryTitle",
  initialState: [
    {
      _id: "",
      title: "",
    },
  ],
  reducers: {
    setAllCategoryTitle: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAllCategoryTitle } = categoriestitleSlice.actions;
export default categoriestitleSlice.reducer;
