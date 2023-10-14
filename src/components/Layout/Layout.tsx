import { ChatBot, Navbar } from "..";
import { Fragment } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <Fragment>
            <Navbar />
            <ChatBot />
            {children}
        </Fragment>
    );
};

export default Layout;
