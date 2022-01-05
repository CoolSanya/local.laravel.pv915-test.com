import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/Login/reducer";
import { productsReducer } from "../../components/products/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    product: productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;