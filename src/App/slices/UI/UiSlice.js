import { createSlice } from "@reduxjs/toolkit";

export const UiSlice = createSlice({
    name: "Ui",
    initialState: {
        isLightMode: true,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.isLightMode = !state.isLightMode;
        },
    },
});
export const { toggleDarkMode } = UiSlice.actions;

export default UiSlice.reducer;
