import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "Categories",
    initialState: [
        {
            _id: "",
            title: "",
            subcategories: [
                {
                    _id: "",
                    name: "",
                    image: {
                        url: "",
                        altTag: ""
                    }
                }
            ]
        }
    ],

    reducers: {
        setAllCategories: (state, action) => {            
            return action.payload;
        },
        addCategory: (state, action) => {
            state.push(action.payload);
        },
        updateCategory: (state, action) => {
            const index = state.findIndex(category => category._id === action.payload._id);
            state[index] = action.payload;
        },
        deleteCategory: (state, action) => {
            const index = state.findIndex(category => category._id === action.payload);
            state.splice(index, 1);
        },
        addSubCategory: (state, action) => {
            const index = state.findIndex(category => category._id === action.payload.categoryId);
            state[index].subCategories.push(action.payload.subCategory);
        },
        updateSubCategory: (state, action) => {
            const categoryIndex = state.findIndex(category => category._id === action.payload.categoryId);
            const subCategoryIndex = state[categoryIndex].subCategories.findIndex(subCategory => subCategory._id === action.payload.subCategoryId);
            state[categoryIndex].subCategories[subCategoryIndex] = action.payload.subCategory;
        },
        deleteSubCategory: (state, action) => {
            const categoryIndex = state.findIndex(category => category._id === action.payload.categoryId);
            const subCategoryIndex = state[categoryIndex].subCategories.findIndex(subCategory => subCategory._id === action.payload.subCategoryId);
            state[categoryIndex].subCategories.splice(subCategoryIndex, 1);
        },
    }
    


})


export const { setAllCategories, addCategory, updateCategory, deleteCategory, addSubCategory, updateSubCategory, deleteSubCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
