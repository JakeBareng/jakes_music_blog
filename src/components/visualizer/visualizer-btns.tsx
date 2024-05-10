
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
        <div className="flex flex-row">
            <button onClick={prev} className={`m-10`}>prev</button>
            {playing ?
                <button onClick={stop}
                    className={`m-10`}>pause</button> :
                <button onClick={start}
                    className={`m-10`}>play</button>
            }
            <button onClick={next} className={`m-10`}>next</button>
        </div>
    )
}