import {Outlet} from 'react-router-dom';
import MenuBar from "@/components/MenuBar/MenuBar.tsx";

const Layout = () => {
    return (
        <>
            <MenuBar/>
            <Outlet/>
        </>
    );
};

export default Layout;