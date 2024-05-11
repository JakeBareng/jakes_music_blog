function contact() {
    return (
        <div className="flex flex-col align-middle justify-center text-center">
            <h1 className="font-josefin font-semibold p-5">Contact</h1>
            <div className="grid grid-cols-2 gap-3">
                <p className="font-josefin font-medium">github:</p><a   className="hover:text-stone-300 transition duration-150" href="https://github.com/JakeBareng">github.com/JakeBareng</a>
                <p className="font-josefin font-medium">email:</p><a    className="hover:text-stone-300 transition duration-150" href="mailto:barengjake@gmail.com">barengjake@gmail.com</a>
                <p className="font-josefin font-medium">linkedin:</p><a className="hover:text-stone-300 transition duration-150" href="www.linkedin.com/in/jakebareng">linkedin.com/in/jakebareng</a>
            </div>
        </div>
    )

}

export default contact;