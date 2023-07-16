import { Navbar } from "..";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;