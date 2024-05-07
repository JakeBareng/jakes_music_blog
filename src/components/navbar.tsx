import { useSession } from "next-auth/react";
import LoginBtn from "./login-btn";

function Navbar() {
    const { data: session } = useSession();
    // position absolute, top 0, left 0, right 0, z-50
    const navbarStyle = "absolute bg-gray-800 text-white p-4 flex justify-between items-center"

    // have constant size and make overflow visible
    const listItemStyle = "px-4 py-2"

    // unordered list, no bullets, horizontal, no padding, no margin
    const ulStyle = "list-none flex"

    return (
        <nav className={navbarStyle}>
            <ul className={ulStyle}>
                <li className={listItemStyle}>
                    <a href="/">Home</a>
                </li>
                <li className={listItemStyle}>
                    <a href="/about">About</a>
                </li>
                <li className={listItemStyle}>
                    <a href="/contact">Contact</a>
                </li>
                {session && (
                    <li className={listItemStyle}>
                        <a href="/upload">Upload</a>
                    </li>
                )}
                <li className={listItemStyle}>
                    <LoginBtn />
                </li>
                {session && (
                    <li className={listItemStyle}>
                        <p>Signed in as {session?.user?.email}</p>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;