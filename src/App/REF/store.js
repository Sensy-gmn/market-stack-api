import { configureStore } from "@reduxjs/toolkit";
import SymbolPromptReducer from "../slices/FinancialData/SymbolPrompt";
import UiReducer from "../slices/UI/UiSlice";

export default configureStore({
    reducer: {
        Ui: UiReducer,
        SymbolPrompt: SymbolPromptReducer,
    },
});
