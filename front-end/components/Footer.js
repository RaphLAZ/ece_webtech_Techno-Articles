const Footer = () => {
    return (
        <footer className="p-4 bg-white md:p-4 lg:p-2 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <div className="mx-auto max-w-screen-xl flex justify-center items-center text-center">
                    <img
                        src="/logo_ece.png"
                        alt="Logo"
                        className="w-24 h-26 mr-2"
                    />
                </div>
                <p className="text-color">2023 Blogging Website.</p>
                <p className="text-color">
                    All rights reserved. Authors : Axel PAPE & Raphael LAZZARI-ARMOUR
                </p>
            </div>
        </footer>
    );
};

export default Footer;
