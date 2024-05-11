import { useSession } from "next-auth/react";
import LoginBtn from "./login-btn";
import Link from "next/link";

function Navbar({ setNavbarActive, navbarActive }: { setNavbarActive: (active: boolean) => void, navbarActive: boolean }) {
    const { data: session } = useSession();

    // have constant size and make overflow visible
    const listItemStyle = "font-josefin text-m text-white hover:text-slate-200 transition duration-300 ease-in-out"

    return (
        <ul className={`absolute p-10 z-50`}>
            <li className={listItemStyle}>
                <Link href="/" onClick={e => { setNavbarActive(!navbarActive) }}> Home </Link>
            </li>
            <li className={listItemStyle}>
                <Link href="/about" onClick={e => { setNavbarActive(!navbarActive) }}> About </Link>
            </li>
            <li className={listItemStyle}>
                <Link href="/contact" onClick={e => { setNavbarActive(!navbarActive) }}> Contact </Link>
            </li>
            {session && (
                <li className={listItemStyle}>
                    <Link href="/upload" onClick={e => { setNavbarActive(!navbarActive) }}> Upload </Link>
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