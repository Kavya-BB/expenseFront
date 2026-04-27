import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserCategories = createAsyncThunk("category/fetchUserCategories", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/categories', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const createCategory = createAsyncThunk("category/createCategory", async ({ formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/categories', formData, { headers: { Authorization: localStorage.getItem('token')}});
        handleReset();
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const removeCategory = createAsyncThunk("category/removeCategory", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/categories/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const updateCategory = createAsyncThunk("category/updateCategory", async ({ editId, formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/categories/${editId}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
        handleReset();
        return response.data;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        errors: null,
        loading: false,
        editId: null
    },
    reducers: {
        resetCategory: (state) => {
            state.data = [],
            state.errors = null,
            state.loading = false
        },
        assignEditId: (state, action) => {
            state.editId = action.payload;
        },
        resetEditId: (state) => {
            state.editId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserCategories.fulfilled, (state, action) => {
                state.data = action.payload;
                state.errors = null;
                state.loading = false;
            })
            .addCase(fetchUserCategories.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = false;
                state.errors = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data.splice(idx, 1);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export const { resetCategory, assignEditId, resetEditId } = categorySlice.actions;

export default categorySlice.reducer;