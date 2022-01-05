import { useState, useRef } from "react"
import InputGroup from "../../common/InputGroup"
import { useActions } from "../../../hooks/useActions"
import { IRegisterModel } from "./types"
import { RegisterActionTypes, RegisterError } from "./types"
import { useNavigate } from "react-router";

import {RegisterAction} from "./types"

import {validationFields} from "./validation"
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import InputGroupFormik from "../../common/InputGroupFormik"

const RegisterPage = () => {

    const [state, setState] = useState<IRegisterModel>({ name: "", email: "", password: "", password_confirmation: "" } as IRegisterModel)
    const initialValues: IRegisterModel = { name: "", email: "", password: "", password_confirmation: "" };
    const {registerUser}  = useActions();
    const refFormik = useRef<FormikProps<IRegisterModel>>(null);
    const navigator = useNavigate();
    
    const initialErrors : RegisterError = {
        name: [],
        email: [],
        password: [],
        error: ""
    }

    const [invalid, setInvalid] = useState<string>("");
    const [serverErrors, setServerErrors] = useState<RegisterError>(initialErrors); 
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
              if(Array.isArray(value)) {
                  let message = '';
                  value.forEach((item) => {
                      message += `${item}`;
                  });
                  refFormik.current?.setFieldError(key, message);
              }
          });

          console.log("-------", serverErrors.error);
          if(serverErrors.error){
                setInvalid(serverErrors.error);
          }
          
          setIsSubmitted(false);
        }
    }

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
                        } = props

                return(
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
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Підтвердити</button>
                    </Form>
                )}}
            </Formik>
        </div>
        
    );

};

export default RegisterPage;

// import React, { useEffect, useRef, useState } from "react";
// import InputGroup from "../../common/InputGroup";
// // import {useActions} from '../../../hooks/useActions';
// import {IRegisterModel} from './types';
// import {Modal} from 'bootstrap';
// import Cropper from 'cropperjs';



// const RegisterPage = () => {

//   let modal: Modal;
//   let cropper: Cropper;

//   const modalRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);
//   // const {registerUser} = useActions();

//   const [model, setModel] = useState<IRegisterModel>({
//     name: "",
//     email: "",
//   } as IRegisterModel);

//   useEffect(() => {
//     modal = new Modal(modalRef.current as Element,{
//       backdrop: "static",
//       keyboard: false
//     });
//   }, [])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // registerUser(model);
//     console.log("submit data", model);
//     modal.show(); 

//     cropper = new Cropper(imageRef.current as HTMLImageElement, {
//       aspectRatio: 1 / 1,
//       crop(event) {
//         console.log(event.detail.x);
//         console.log(event.detail.y);
//         console.log(event.detail.width);
//         console.log(event.detail.height);
//         console.log(event.detail.rotate);
//         console.log(event.detail.scaleX);
//         console.log(event.detail.scaleY);
//       },
//     }); 

//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <h1 className="text-center">Реєстрація</h1>
//           <form onSubmit={handleSubmit}>
//             {/* <InputGroup
//               label="Пошта"
//               value={model.email}
//               field="surname"
//               type="email"
//               onChange={hadleChange}
//             />

//             <InputGroup
//               label="Ім'я"
//               value={model.name}
//               field="name"
//               type="text"
//               onChange={hadleChange}
//             /> */}

//             <button type="submit" className="btn btn-primary">
//               Реєстрація
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="modal" ref={modalRef} tabIndex={-1}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Modal title</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <p>Modal body text goes here.</p>
//               <div>
//                 <img ref={imageRef} style={{maxWidth: "100%", display: "block"}} 
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48ukN18yyXjwJu00yMd3gd4qVi5sBmOgRLg&usqp=CAU" 
//                   alt="girl" />
//               </div>

//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary"
//                 onClick={() =>{
//                   cropper.rotate(90);
//                 }}>
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterPage;

