import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

function About() {
    const paragraph = useRef(null);

    const text = "I'm Jake, a web developer, computer science student, and music producer. This blog is where I combine my technical skills with my love for music to share things that I make."

    // write text to paragraph
    useEffect(() => {
        let i = 0;
        let speed = 40;

        function typeWriter() {
            if (i < text.length && paragraph.current) {
                (paragraph.current as HTMLElement).innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        typeWriter();
    }, [])

    return (
        <div className="text-wrap w-1/3">
            <h1 className="font-josefin text-center font-semibold">About me!</h1>
            <p className="font-josefin indent-9" ref={paragraph}></p>
        </div>
    )
    
}

export default About;