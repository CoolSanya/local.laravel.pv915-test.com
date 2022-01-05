import { RegisterAction, RegisterActionTypes, IRegisterModel, RegisterError } from "./types"
import {Dispatch} from "react";
import http from '../../../http_common';
import { AxiosError } from "axios";

export const registerUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try{
            dispatch({type: RegisterActionTypes.REGISTER_AUTH});
            const response = await http.post('api/auth/register', data);
            return Promise.resolve();
        }
        catch(error){
            const serverError = error as AxiosError<RegisterError>;
            if(serverError && serverError.response){
                return Promise.reject(serverError.response.data);
            }
        }
    }
}