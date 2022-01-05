import { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import InputGroupFormik from "../../common/InputGroupFormik";
import { ILoginModel, LoginError } from "./types";
import { useActions } from "../../../hooks/useActions";
import { Formik, Form, FormikProps } from "formik";
import { validationFields } from "./validation";


const LoginPage = () => {
  const { loginUser } = useActions();
  const navigator = useNavigate();

  const refFormik = useRef<FormikProps<ILoginModel>>(null);

  const initialState: ILoginModel = {
    email: "",
    password: "",
  };

  const [invalid, setInvalid] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  const handleSubmit = async (values: ILoginModel) => {
    setIsSubmitted(true);

    try {
      console.log("Login begin");
      await loginUser(values);
      console.log("Login end");
      navigator("/");
      setIsSubmitted(false);
    } catch (ex) {
      const serverErrors = ex as LoginError;
      Object.entries(serverErrors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          let message = "";
          value.forEach((item) => {
            message += `${item} `;
          });
          refFormik.current?.setFieldError(key, message);
        }
      });
      
      if(serverErrors.error)
      {
        setInvalid(serverErrors.error);
      }
      setIsSubmitted(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Вхід</h1>
        {invalid && <div className="alert alert-danger">{invalid}</div>}
        <Formik
          innerRef={refFormik}
          initialValues={initialState}
          validationSchema={validationFields}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <InputGroupFormik
                label="Пошта"
                error={errors.email}
                onChange={handleChange}
                type="email"
                field="email"
                touched={touched.email}
                value={values.email}
              />

              <InputGroupFormik
                label="Пароль"
                error={errors.password}
                onChange={handleChange}
                type="password"
                field="password"
                touched={touched.password}
                value={values.password}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Вхід
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
