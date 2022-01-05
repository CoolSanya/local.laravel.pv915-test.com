import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IProduct, ProductErrors } from "./types";
import { Formik, FormikProps, Form } from "formik";
import { validationFields } from "./validation";
import InputGroupFormik from "../common/InputGroupFormik";
import ModalPage from "./modalGroup";
import { ToastContainer, toast } from "react-toastify";
import { useActions } from "../../hooks/useActions";

const EditProduct = () => {
    const defaultImage =
        "https://www.pinclipart.com/picdir/middle/333-3334742_car-icons-pdf-car-icon-clipart.png";
    const [searchParams] = useSearchParams();
    const refFormik = useRef<FormikProps<IProduct>>(null);
    const navigator = useNavigate();
    const { editProducts } = useActions();

    const [product, setProduct] = useState<IProduct>({
        id: searchParams.get("id") ? +(searchParams?.get("id") as string) : 0,
        name: searchParams.get("name") ? searchParams.get("name") : "",
        detail: searchParams.get("detail") ? searchParams.get("detail") : "",
        image: searchParams.get("image")
            ? searchParams.get("image")
            : defaultImage,
    });

    const handleSubmit = async (values: IProduct, actions: any) => {
        try {
            await editProducts(values);
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
        }
    };

    useEffect(() => {}, []);

    const handleImageEdit = (label: string, base: string) => {
        refFormik.current?.setFieldValue("image", base);
    };

    return (
        <Formik
            initialValues={product}
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
                            value={values.image}
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
    );
};

export default EditProduct;
