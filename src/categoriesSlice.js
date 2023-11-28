import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "Categories",
    initialState: [
        {
            _id: "",
            title: "",
            subCategories: [
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
    // reducers: {
    //     setAllCategories: (state, action) => {
    //         state.categories = action.payload
    //     },
    //     addCategory: (state, action) => {
    //         state.categories.push(action.payload)
    //     },
    //     updateCategory: (state, action) => {
    //         const index = state.categories.findIndex(category => category._id === action.payload._id)
    //         state.categories[index] = action.payload

    //     },
    //     deleteCategory: (state, action) => {
    //         const index = state.categories.findIndex(category => category._id === action.payload)
    //         state.categories.splice(index, 1)
    //     },
    //     addSubCategory: (state, action) => {
    //         const index = state.categories.findIndex(category => category._id === action.payload.categoryId)
    //         state.categories[index].subCategories.push(action.payload.subCategory)
    //     },
    //     updateSubCategory: (state, action) => {
    //         const categoryIndex = state.categories.findIndex(category => category._id === action.payload.categoryId)
    //         const subCategoryIndex = state.categories[categoryIndex].subCategories.findIndex(subCategory => subCategory._id === action.payload.subCategoryId)
    //         state.categories[categoryIndex].subCategories[subCategoryIndex] = action.payload.subCategory
    //     },
    //     deleteSubCategory: (state, action) => {
    //         const categoryIndex = state.categories.findIndex(category => category._id === action.payload.categoryId)
    //         const subCategoryIndex = state.categories[categoryIndex].subCategories.findIndex(subCategory => subCategory._id === action.payload.subCategoryId)
    //         state.categories[categoryIndex].subCategories.splice(subCategoryIndex, 1)
    //     },

    // }



    reducers: {
        setAllCategories: (state, action) => {
            return action.payload; // Assuming action.payload is an array of categories
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
