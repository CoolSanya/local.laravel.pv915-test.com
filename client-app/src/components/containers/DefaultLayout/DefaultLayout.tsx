import { Outlet } from "react-router";
import Header from './Header';

const DefaultLayout = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;