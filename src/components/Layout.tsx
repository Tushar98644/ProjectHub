import { Navbar } from ".";

const Layout = ({ children }:any) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;