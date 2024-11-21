import { createSlice } from "@reduxjs/toolkit";

export const SymbolPromptSlice = createSlice({
    name: "SymbolPrompt",
    initialState: {
        symbolPrompt: "AAPL",
    },
    reducers: {
        setSymbolPrompt: (state, action) => {
            state.symbolPrompt = action.payload;
        },
    },
});
export const { setSymbolPrompt } = SymbolPromptSlice.actions;
export default SymbolPromptSlice.reducer;
