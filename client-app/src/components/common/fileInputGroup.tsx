import React, { useState } from "react";
import classNames from "classnames";
import FileInput, { IBaseInputProps } from "./fileInput";
import { FormikProps } from "formik";
import { IProduct } from "../products/types";

export interface IBaseInputGroupProps extends IBaseInputProps {
    label: string;
    error: string | undefined;
    touched: boolean | undefined;
    accept: string;
    formikRef: React.RefObject<FormikProps<IProduct>>;
}

const FileInputGroup = ({
    field,
    onChange,
    label,
    touched,
    accept,
    formikRef,
}: IBaseInputGroupProps) => {
    const imgSrcDefault: string =
        "https://www.pinclipart.com/picdir/middle/333-3334742_car-icons-pdf-car-icon-clipart.png";
    const [imgSrc, setImgSrc] = useState<string>(imgSrcDefault);
    const [error, setError] = useState<string>("");

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!(files && files[0])) {
            setError("Choose file");
            return;
        }
        setImgSrc(URL.createObjectURL(files[0]));
        formikRef.current?.setFieldValue(field, files[0]);
        setError("");
    };

    return (
        <div className="mb-3">
            <label htmlFor={field}>
                <img src={imgSrc} width="150" alt="user img" />
            </label>
            <input
                type="file"
                style={{ display: "none" }}
                className="form-control"
                id={field}
                onChange={selectImage}
            />

            {error && <span className="text-danger">{error}</span>}
        </div>
    );
};

export default FileInputGroup;
