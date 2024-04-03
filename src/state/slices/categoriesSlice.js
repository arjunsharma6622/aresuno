import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "Categories",
  initialState: [
    {
      _id: "",
      categoryTitle: "",
      name: "",
      image: {
        url: "",
        altTag: "",
      },
      icon: "",
    },
  ],

  reducers: {
    setAllCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAllCategories, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
