export enum ProductActionTypes {
    PRODUCTS_GET = "GET_ALL_PRODUCTS",
    PRODUCT_ADD = "ADD_PRODUCT",
    PRODUCT_DELETE = "DELETE_PRODUCT",
}

export interface IProduct {
    id: number;
    name: string | number | readonly string[] | undefined | null;
    detail: string | number | readonly string[] | undefined | null;
    image?: string | undefined | null;
}
export interface IGetProductsResponse {
    data: Array<IProduct>;
    last_page: number;
    success: boolean;
    message: string;
    currentPage: number;
}
export interface IDeleteProductsResponse {
    data: IProduct;
    success: boolean;
    message: string;
}
export interface IAddProductsResponse {
    data: IProduct;
    success: boolean;
    message: string;
}

export interface ISearchProduct {
    page: number | string | null;
    name: string | number | readonly string[] | undefined;
    detail: string | number | readonly string[] | undefined;
}

export type ProductErrors = {
    id: string;
    name: string;
    detail: string;
    image: string;
    error: string;
};

export interface ProductState {
    products: Array<IProduct>;
    last_page: number;
}

export interface ProductGetAction {
    type: ProductActionTypes.PRODUCTS_GET;
    payload: ProductState;
}
export interface ProductDeleteAction {
    type: ProductActionTypes.PRODUCT_DELETE;
    payload: IProduct;
}

export type ProductAction = ProductGetAction | ProductDeleteAction;
