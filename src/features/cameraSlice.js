import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cameraImage: "",
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage += action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = "";
    },
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
