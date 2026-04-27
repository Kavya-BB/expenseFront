import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "../slices/category-slice";
import ExpenseReducer from "../slices/expense-slice";

const createStore = () => {
    return configureStore({
        reducer: {
            category: CategoryReducer,
            expense: ExpenseReducer
        }
    });
}

export default createStore;