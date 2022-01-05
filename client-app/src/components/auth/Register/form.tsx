import { useState, useRef } from "react";
import InputGroup from "../../common/inputGroup";
import { useActions } from "../../../hooks/useActions";
import { IRegisterModel } from "./types";
import { RegisterActionTypes, RegisterError } from "./types";
import { useNavigate } from "react-router";

import { RegisterAction } from "./types";

import { validationFields } from "./validation";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from "formik";
import InputGroupFormik from "../../common/InputGroupFormik";

interface IRegisterFormProps {
    handleSubmit: (e: React.FormEvent) => void;
}
interface OtherProps {
    title?: string;
}

const RegisterForm = () => {
    const [state, setState] = useState<IRegisterModel>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    } as IRegisterModel);
    const initialValues: IRegisterModel = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
    const { registerUser } = useActions();
    const refFormik = useRef<FormikProps<IRegisterModel>>(null);
    const navigator = useNavigate();

    const initialErrors: RegisterError = {
        name: [],
        email: [],
        password: [],
        error: "",
    };

    const [invalid, setInvalid] = useState<string>("");
    const [serverErrors, setServerErrors] =
        useState<RegisterError>(initialErrors);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async (values: IRegisterModel, actions: any) => {
        setIsSubmitted(true);

        try {
            await registerUser(values);
            setIsSubmitted(false);
            navigator("/login");
        } catch (ex) {
            const serverErrors = ex as RegisterError;
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

    return (
        <div>
            {invalid && <div className="alert alert-danger">{invalid}</div>}
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationFields}
                innerRef={refFormik}
            >
                {(props: FormikProps<IRegisterModel>) => {
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
                                label="Ім'я"
                                field="name"
                                type="text"
                                value={values.name}
                                error={errors.name}
                                touched={touched.name}
                                onChange={handleChange}
                            />
                            <InputGroupFormik
                                label="Пошта"
                                field="email"
                                type="email"
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChange={handleChange}
                            />
                            <InputGroupFormik
                                label="Пароль"
                                field="password"
                                type="password"
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                onChange={handleChange}
                            />
                            <InputGroupFormik
                                label="Підтвердження паролю"
                                field="password_confirmation"
                                type="password"
                                value={values.password_confirmation}
                                error={errors.password_confirmation}
                                touched={touched.password_confirmation}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                Підтвердити
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default RegisterForm;
