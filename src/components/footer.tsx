import Image from "next/image";

function Footer() {
    // styling for footer stick to bottom
    const footerStyle = "text-white text-center py-4 bottom-0 w-full z-50 absolute"
    const textStyle = "text-sm text-gray-800 text-center"
    return (
        <footer className={footerStyle}>
            <a href="https://github.com/JakeBareng/jakes_music_blog">
                <p className={textStyle}>Created by Jake Bareng</p>
                <p className={textStyle}>View on Github</p>
                <Image
                    src="/github-mark.svg"
                    alt="github"
                    width={20}
                    height={20}
                    className="inline"
                />
            </a>
        </footer>
    )
}

export default Footer;