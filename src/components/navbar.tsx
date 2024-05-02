import { useSession } from "next-auth/react";
import LoginBtn from "./login-btn";

function Navbar() {
    const { data: session } = useSession();
    return (
        <nav>
            <ul className="flex-initial">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
                {session && (
                    <li>
                        <a href="/upload">Upload</a>
                    </li>
                )}
                <li>
                    <LoginBtn />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;