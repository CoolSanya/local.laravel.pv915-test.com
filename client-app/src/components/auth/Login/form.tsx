import { useRef, useState } from "react";
import InputGroup from "../../common/inputGroup";
import InputGroupFormik from "../../common/InputGroupFormik";
import { ILoginModel, LoginError } from "./types";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router";
import { validationFields } from "./validation";

import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from "formik";

interface IRegisterFormProps {
    handleSubmit: (e: React.FormEvent) => void;
}

interface OtherProps {
    title?: string;
}

const RegisterForm = () => {
    const initialValues: ILoginModel = { email: "", password: "" };
    const [state, setState] = useState<ILoginModel>(initialValues);
    const { loginUser } = useActions();
    const refFormik = useRef<FormikProps<ILoginModel>>(null);
    const navigator = useNavigate();

    const initialErrors: LoginError = {
        email: [],
        password: [],
        error: "",
    };
    const [invalid, setInvalid] = useState<string>("");
    const [serverErrors, setServerErrors] = useState<LoginError>(initialErrors);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async (values: ILoginModel, actions: any) => {
        setIsSubmitted(true);

        try {
            await loginUser(values);
            setIsSubmitted(false);
            navigator("/");
        } catch (ex) {
            const serverErrors = ex as LoginError;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
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
                {(props: FormikProps<ILoginModel>) => {
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
                                label="Пошта"
                                field="email"
                                type="text"
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
                                touched={touched.email}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
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
