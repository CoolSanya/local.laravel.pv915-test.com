import {ProductActions, ProductsActionTypes, ProductsState} from './types';

const initialState : ProductsState = {
    products: [],
    last_page: 0
}

export const productsReducer = (state = initialState, action: ProductActions) : ProductsState => {
    switch(action.type) {

        case ProductsActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                ...action.payload
            };

        case ProductsActionTypes.EDIT_PRODUCT:
            var product = state.products.filter((value, index, obj) => {
                return value.id != action.payload.id
            });
            return {
                ...state,
                products: product
            }

        case ProductsActionTypes.DELETE_PRODUCT:
            var tmpList = state.products.filter((value, index, arr) => {
                return value.id != action.payload.id
            });
            return {
                ...state,
                products: tmpList
            };
        default:
            return state;
    }
    
}