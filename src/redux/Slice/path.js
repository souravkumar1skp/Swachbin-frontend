import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "paths",
  initialState: {
    lat: 0,
    lng: 0,
  },
  reducers: {
    addPath: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});
export const { addPath } = pathSlice.actions;
export default pathSlice.reducer;
