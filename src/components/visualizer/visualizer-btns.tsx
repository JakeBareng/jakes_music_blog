
type audioButtons = {
    playing: boolean
    start: () => void
    stop: () => void
}

export default function VisualizerBtns({ playing, start, stop }: audioButtons) {
    return (
        <>
            {playing ?
                <button onClick={stop}
                    className={`m-10`}>pause</button> :
                <button onClick={start}
                    className={`m-10`}>play</button>
            }
        </>
    )
}