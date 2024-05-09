function Footer() {
    // styling for footer stick to bottom
    const footerStyle = "text-white text-center py-4 bottom-0 w-full z-50 absolute"
    const textStyle = "text-sm text-gray-400 text-center"
    return (
        <footer className={footerStyle}>
            <p className={textStyle}>Created by Jake Bareng</p>
        </footer>
    )
}

export default Footer;