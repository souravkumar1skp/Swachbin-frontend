import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "details",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state = action.payload;
    },
  },
});

export default detailSlice.reducer;
