
type audioButtons = {
    playing: boolean
    start: () => void
    stop: () => void
}

export default function VisualizerBtns({ playing, start, stop }: audioButtons) {
    return (
        <div className={`
        aboslute left-0 right-0 flex flex-col flex-grow-2 items-center
        `}>
            {playing ?
                <button onClick={stop}
                    className={`m-10`}>pause</button> :
                <button onClick={start}
                    className={`m-10`}>play</button>
            }
        </div>
    )
}