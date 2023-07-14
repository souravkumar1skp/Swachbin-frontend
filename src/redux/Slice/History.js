import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const historySlice= createSlice({
    name: 'details',
    initialState: [],
    reducers: {
        addItem : (state, action)=>
        {
            state= action.payload
        }
    }
});

export default historySlice.reducer;
