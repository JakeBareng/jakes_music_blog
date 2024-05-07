function Footer() {
    // styling for footer stick to bottom
    const footerStyle = "bg-gray-800 text-white text-center py-4 bottom-0 w-full z-50 absolute"
    return (
        <footer className={footerStyle}>
            <p>Created by Jake Bareng</p>
        </footer>
    )
}

export default Footer;