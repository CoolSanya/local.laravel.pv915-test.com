import * as Yup from "yup";

export const validationFields = () => {
    return Yup.object().shape({
        name: Yup.string()
            .required('Name of product is required'),
        detail: Yup.string()
        .required(
            'Product detail is required'
        )
        // .min(20, "Detail must be min 20 characters"),
});   
}