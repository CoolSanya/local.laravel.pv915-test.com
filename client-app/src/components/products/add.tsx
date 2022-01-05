import { useRef, useState } from "react";
import { Formik, FormikProps, Form } from "formik";
import { IProductItem, ProductErrors } from "./types";
import { validationFields } from "./validation";
import InputGroupFormik from "../common/InputGroupFormik";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const initialValues: IProductItem = {
        id: 0,
        name: "",
        detail:"",
        image:""
    };
    const refFormik = useRef<FormikProps<IProductItem>>(null);
    const {addProduct} = useActions();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const navigator = useNavigate();
    const [invalid, setInvalid] = useState<string>("");

    const handleSubmit = async (values: IProductItem,) => {
        setIsSubmitted(true);
        try {
            await addProduct(values);
            setIsSubmitted(false);
            navigator("/products/list");
        } catch (error) {
            const serverErrors = error as ProductErrors;
            Object.entries(serverErrors).forEach(([key, value]) => {
                if(Array.isArray(value)) {
                    let message = '';
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
    }

    return (
        <>
            {invalid && <div className="alert alert-denger">{invalid}</div>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationFields}
                innerRef={refFormik}
                onSubmit={handleSubmit}
            >
                {(props: FormikProps<IProductItem>) => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    } = props
                
                    return (
                        <Form>
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
                            <InputGroupFormik
                                label="Image"
                                field="image"
                                type="file"
                                value={values.image}
                                error={errors.image}
                                touched={touched.image}
                                onChange={handleChange}
                            />
                            <button type="submit" disabled={isSubmitted} className="btn btn-primary">Додати продукт</button>
                        </Form>
                )}}
            </Formik>
        </>
    )
}

export default AddProduct;