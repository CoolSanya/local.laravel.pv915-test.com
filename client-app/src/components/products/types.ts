export enum ProductsActionTypes {
    FETCH_PRODUCTS="FETCH_PRODUCTS",
    ADD_PRODUCT="ADD_PRODUCT",
    EDIT_PRODUCT="EDIT_PRODUCT",
    DELETE_PRODUCT="DELETE_PRODUCT"
}

export interface IProductItem {
    id: number;
    name: string;
    detail: string;
    image: string;
} 

export interface IProductsResponse {
    current_page: number;
    last_page: number;
    data: Array<IProductItem>;
}

export interface IAddProductResponse {
    data: IProductItem,
    success: boolean,
    message: string
}

export interface IEditProductResponse {
    data: IProductItem,
    success: boolean,
    message: string
}

export interface IDeleteProductResponce {
    data: IProductItem,
    success: boolean,
    message: string
}

export interface ISearchProduct {
    page?: null|string|number,
    name?: null|string
}

export interface ProductsState {
    products: Array<IProductItem>;
    last_page: number;
}

export type ProductErrors = {
    id: string,
    name: string,
    detail:string,
    image: string,
    error: string
}

export interface FetchProductsAction {
    type: ProductsActionTypes.FETCH_PRODUCTS,
    payload: ProductsState
}

export interface EditProductsActions {
    type: ProductsActionTypes.EDIT_PRODUCT,
    payload: IProductItem
}

export interface DeleteProductsAction {
    type: ProductsActionTypes.DELETE_PRODUCT,
    payload: IProductItem
}

export type ProductActions = FetchProductsAction | DeleteProductsAction | EditProductsActions;