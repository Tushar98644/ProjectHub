import { ChatBot, Navbar } from "..";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <div>
            <ToastContainer />
            <Navbar />
            <ChatBot />
            {children}
        </div>
    );
};

export default Layout;
