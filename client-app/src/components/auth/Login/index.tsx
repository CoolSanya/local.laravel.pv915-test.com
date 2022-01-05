import RegisterForm from "./form"

const LoginPage = () => {
    return (
        <>
            <h1 className="text-center">Реєстрація</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                   <RegisterForm />
                </div>
            </div>
        </>
    )
}

export default LoginPage;