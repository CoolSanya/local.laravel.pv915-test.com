import {
    ProductAction,
    IProduct,
    IGetProductsResponse,
    IDeleteProductsResponse,
    IAddProductsResponse,
    ProductActionTypes,
    ProductErrors,
    ISearchProduct,
    ProductState,
} from "./types";

import { Dispatch } from "react";
import http from "../../http_common";
import axios, { AxiosError } from "axios";
import { ServerResponse } from "http";
import { isConstructorDeclaration } from "typescript";

export const getProducts = (search: ISearchProduct) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.get<IGetProductsResponse>(
                "api/products",
                {
                    params: search,
                }
            );

            const { data, last_page } = response.data;
            SetProducts(
                {
                    products: data,
                    last_page: last_page,
                },
                dispatch
            );

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};
export const addProduct = (product: IProduct) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.post<IAddProductsResponse>(
                "api/products",
                product
            );

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};
export const editProducts = (product: IProduct) => {
    console.log(product);
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.put<IAddProductsResponse>(
                "api/products",
                product
            );

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};
export const removeProduct = (id: number) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.delete<IAddProductsResponse>(
                `api/products/${id}`
            );
            const { data } = response.data;
            DeleteProduct(data, dispatch);
            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const SetProducts = (
    data: ProductState,
    dispatch: Dispatch<ProductAction>
) => {
    dispatch({
        type: ProductActionTypes.PRODUCTS_GET,
        payload: data,
    });
};
export const DeleteProduct = (
    data: IProduct,
    dispatch: Dispatch<ProductAction>
) => {
    dispatch({
        type: ProductActionTypes.PRODUCT_DELETE,
        payload: data,
    });
};
