import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/login/reducer";
import {productReducer} from "../../components/products/reducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;