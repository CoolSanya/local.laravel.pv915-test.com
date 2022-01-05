import * as Yup from 'yup';

export const validationFields = () => {
    return Yup.object({
        email: Yup.string()
            .email('Не коректно вказана пошта')
            .required("Вкажіть пошту"),
        
        password: Yup.string()
            .required('Вкажіть пароль.') 
            .min(6, 'Пароль має містить мінімум 6 символів.'),
    });
};