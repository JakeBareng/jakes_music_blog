import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from "react";
import Image from "next/image";

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    const [navbarActive, setNavbarActive] = useState(false);

    return (
        <>
            <div className={`transition duration-300 ease-in-out ${navbarActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className={`transition duration-300 ease-in-out fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 ${navbarActive ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setNavbarActive(false)} />
                <Navbar />
            </div>
            {
                !navbarActive &&
                <Image
                    src={"/menuIcon.svg"}
                    width={30}
                    height={30}
                    alt="menu icon"
                    className="fixed top-10 left-10 z-50 cursor-pointer"
                    onClick={() => setNavbarActive(true)}
                />
            }

            <div className="flex justify-center items-center h-full">
                {children}
            </div>
            <Footer />
        </>
    );
}
export default Layout;