import { useSession } from "next-auth/react";
import LoginBtn from "./login-btn";
import Link from "next/link";

function Navbar() {
    const { data: session } = useSession();

    // have constant size and make overflow visible
    const listItemStyle = "font-josefin text-m text-white hover:text-slate-200 transition duration-300 ease-in-out"

    // unordered list, no bullets, horizontal, no padding, no margin

    return (
        <ul className={`absolute p-10 z-50`}>
            <li className={listItemStyle}>
                <Link href="/"> Home </Link>
            </li>
            <li className={listItemStyle}>
                <Link href="/about"> About </Link>
            </li>
            <li className={listItemStyle}>
                <Link href="/projects"> Projects </Link>
            </li>
            {session && (
                <li className={listItemStyle}>
                    <Link href="/upload"> Upload </Link>
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