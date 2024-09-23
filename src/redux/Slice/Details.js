import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "details",
  initialState: {
    isAvailaible: false,
    name: null,
    id: null,
    email: null,
  },
  reducers: {
    addDetail: (state, action) => {
      state.isAvailaible = action.payload.flag;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
  },
});

export const { addDetail } = detailSlice.actions;
export default detailSlice.reducer;
