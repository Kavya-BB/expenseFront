import axios from "../config/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserExpenses = createAsyncThunk("expense/fetchUserExpenses", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/app/expense', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const createExpense = createAsyncThunk("expense/createExpense", async ({ form, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/app/expense', form, { headers: { Authorization: localStorage.getItem('token')}});
        handleReset();
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response.data.error);
    }
});

export const removeExpense = createAsyncThunk("expense/removeExpense", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/app/expense/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const updateExpense = createAsyncThunk("expense/updateExpense", async ({ editId, formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/app/expense/${editId}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
        handleReset();
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});


const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        data: [],
        loading: false,
        errors: null,
        editId: null
    },
    reducers: {
        resetExpense: (state) => {
            state.data = [],
            state.errors = null,
            state.loading = false
        },
        assignEditId: (state, action) => {
            state.editId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.data = action.payload;
            })
            .addCase(fetchUserExpenses.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = false;
                state.errors = null;
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(removeExpense.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data.splice(idx, 1);
            })
            .addCase(removeExpense.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export const { resetExpense, assignEditId } = expenseSlice.actions;

export default expenseSlice.reducer;