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
        <div className="flex flex-row ">
            <button onClick={prev} className={`font-josefin m-10`}>prev</button>
            {playing ?
                <Image
                    src="/pauseIcon.svg"
                    alt="pause"
                    width={30}
                    height={30}
                    style={{opacity: 0.8}}
                    onClick={stop}
                    className={`cursor-pointer`}
                />
                :
                <Image
                    src="/playIcon.svg"
                    alt="play"
                    width={30}
                    height={30}
                    style={{opacity: 0.8}}
                    onClick={start}
                    className={`cursor-pointer`}
                />
            }
            <button onClick={next} className={`font-josefin m-10`}>next</button>

        </div>
    )
}