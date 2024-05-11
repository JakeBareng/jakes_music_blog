import { useSession } from "next-auth/react";
import LoginBtn from "./login-btn";

function Navbar() {
    const { data: session } = useSession();

    // have constant size and make overflow visible
    const listItemStyle = "font-josefin text-m text-white hover:text-slate-200 transition duration-300 ease-in-out"

    // unordered list, no bullets, horizontal, no padding, no margin

    return (
        <ul className={`absolute p-10 z-50`}>
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
    );
}

export default Navbar;