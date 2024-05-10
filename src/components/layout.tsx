import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <div className="flex justify-center align-middle">
                {children}
            </div>
            <Footer />
        </>
    );
}
export default Layout;