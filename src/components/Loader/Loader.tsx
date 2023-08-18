const Loader = () => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center">
            <div className="loader">
                <div className="cube">
                    <div className="front"></div>
                    <div className="back"></div>
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
