import { ReactReduxContext } from "react-redux";
import { Link } from "react-router-dom";

import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Header = () => {
    const {isAuth, user} = useTypedSelector(redux => redux.auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Биткі</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Головна</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Продукти</Link>
                        </li>
                    </ul>

                    {isAuth ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <img src={user?.image} alt="Profile image" width="32" className="rounded-circle" />
                                    &nbsp;&nbsp;          
                                    {user?.email}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Вихід</Link>
                            </li>
                        </ul>)
                    : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Вхід</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Реєстрація</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;