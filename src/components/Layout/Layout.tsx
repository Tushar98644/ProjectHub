import { ChatBot, Navbar } from "..";
import { Fragment } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <Fragment>
            <head>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/images/favicon.png"
                />
            </head>
            <Navbar />
            <ChatBot />
            {children}
        </Fragment>
    );
};

export default Layout;
