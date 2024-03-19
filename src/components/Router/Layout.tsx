import {Outlet} from 'react-router-dom';
import MenuBar from "@/components/MenuBar/MenuBar.tsx";
import Footer from "@/components/Footer/Footer.tsx";

const Layout = () => {
    return (
        <>
            <MenuBar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;