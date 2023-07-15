import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await fetch("https://swachbin-sever.onrender.com/search/");
  return response.json();
});
const historySlice = createSlice({
  name: "marker",
  initialState: {
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default historySlice.reducer;
