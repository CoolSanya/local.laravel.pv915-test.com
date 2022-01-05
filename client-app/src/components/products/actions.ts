import { Dispatch } from "react";
import http from "../../http_common";
import { 
  ProductActions, 
  IProductsResponse, 
  ProductsActionTypes, 
  ISearchProduct,
  IAddProductResponse,
  IEditProductResponse,
  IProductItem,
  ProductErrors,
 } from "./types";

import axios, { AxiosError } from "axios";

export const fetchProducts = (search: ISearchProduct) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const response = await http.get<IProductsResponse>("api/products", {
        params: search
      });
      const { data, last_page } = response.data;
      dispatch({
        type: ProductsActionTypes.FETCH_PRODUCTS,
        payload: {
          last_page: last_page,
          products: data
        },
      });
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ProductErrors>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data)
        }
      }
    }
  };
};


export const addProduct = (product: IProductItem) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const responce = await http.post<IAddProductResponse>('api/products', product);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ProductErrors>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data)
        }
      }
    }
  }
}

export const editProduct = (id: number) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const responce = await http.put<IEditProductResponse>(`api/products/${id}`);
      const {data} = responce.data;
      dispatch ({
        type: ProductsActionTypes.EDIT_PRODUCT,
        payload: data
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ProductErrors>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data)
        }
      }
    }
  }
}

export const deleteProduct = (id: number) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const response = await http.delete<IAddProductResponse>(`api/products/${id}`);
      const {data} = response.data;
      dispatch({
        type: ProductsActionTypes.DELETE_PRODUCT,
        payload: data
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ProductErrors>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data)
        }
      }
    }
  }
}