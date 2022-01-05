import { useEffect, useRef, useState } from "react";

import { Formik, FormikProps, Form } from "formik";
import { IProduct, ProductErrors } from "./types";
import { validationFields } from "./validation";
import InputGroupFormik from "../common/InputGroupFormik";
import FileInputGroup from "../common/fileInputGroup";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
import ModalPage from "./modalGroup";

const AddProduct = () => {
    const initialValues: IProduct = {
        id: 0,
        name: "",
        detail: "",
        image: "",
    };
    const refFormik = useRef<FormikProps<IProduct>>(null);
    const { addProduct } = useActions();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const navigator = useNavigate();
    const [invalid, setInvalid] = useState<string>("");
    var Loader = require("react-loader");

    const handleSubmit = async (values: IProduct, actions: any) => {
        setIsSubmitted(true);
        try {
            await addProduct(values);
            setIsSubmitted(false);
            toast.success("Product succesfully added");
            navigator("/products");
        } catch (error) {
            const serverErrors = error as ProductErrors;
            Object.entries(serverErrors).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    let message = "";
                    value.forEach((item) => {
                        message += `${item}`;
                    });
                    refFormik.current?.setFieldError(key, message);
                }
            });

            if (serverErrors.error) {
                setInvalid(serverErrors.error);
            }
            setIsSubmitted(false);
        }
    };

    const handleImageEdit = (label: string, base: string) => {
        refFormik.current?.setFieldValue("image", base);
    };

    return (
        <>
            <Loader loaded={!isSubmitted}>
                {invalid && <div className="alert alert-danger">{invalid}</div>}
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationFields}
                    innerRef={refFormik}
                >
                    {(props: FormikProps<IProduct>) => {
                        const {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        } = props;
                        return (
                            <Form onSubmit={handleSubmit}>
                                <InputGroupFormik
                                    label="Name"
                                    field="name"
                                    type="text"
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                />
                                <InputGroupFormik
                                    label="Detail"
                                    field="detail"
                                    type="text"
                                    value={values.detail}
                                    error={errors.detail}
                                    touched={touched.detail}
                                    onChange={handleChange}
                                />
                                {/* <FileInputGroup
                                    label="Image"
                                    field="image"
                                    error={errors.image}
                                    touched={touched.image}
                                    onChange={handleChange}
                                    accept="image/jpg, image/gif, image/png, image/jpeg"
                                    formikRef={refFormik}
                                /> */}
                                <ModalPage
                                    onChange={handleImageEdit}
                                    field="image"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary mt-3"
                                >
                                    Підтвердити
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </Loader>
        </>
    );
};

export default AddProduct;
