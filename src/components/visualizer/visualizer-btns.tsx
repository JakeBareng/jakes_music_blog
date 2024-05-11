import Image from "next/image";



type audioButtons = {
    functions: {
        playing: boolean;
        start: () => void;
        stop: () => void;
        prev: () => void;
        next: () => void;
    }
}


export default function VisualizerBtns({ functions }: audioButtons) {
    const { playing, start, stop, prev, next } = functions;
    return (
        <div className="absolute bottom-1/4 flex flex-row gap-24 z-10">
            <Image
                src="/skipNext.svg"
                alt="prev"
                width={30}
                height={30}
                style={{ opacity: 0.8, transform: "rotate(180deg)" }}
                onClick={prev}
                className={`cursor-pointer`}
            />

            {playing ?
                <Image
                    src="/pauseIcon.svg"
                    alt="pause"
                    width={35}
                    height={35}
                    style={{ opacity: 0.8 }}
                    onClick={stop}
                    className={`cursor-pointer`}
                />
                :
                <Image
                    src="/playIcon.svg"
                    alt="play"
                    width={40}
                    height={40}
                    style={{ opacity: 0.8 }}
                    onClick={start}
                    className={`cursor-pointer`}
                />
            }
            <Image
                src="/skipNext.svg"
                alt="next"
                width={30}
                height={30}
                style={{ opacity: 0.8 }}
                onClick={next}
                className={`cursor-pointer`}
            />

        </div>
    )
}