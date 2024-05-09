export type AudioData = {
    context: AudioContext
    source: AudioBufferSourceNode
    gain: GainNode
    data: Uint8Array
    avg: number
    update: () => number
}

export async function createAudio(url: string) {
    // Fetch audio data and create a buffer source
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const context = new (window.AudioContext)()
    const source = context.createBufferSource()
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
    source.loop = true
    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first
    // Create gain node and an analyser
    const gain = context.createGain()
    const analyser = context.createAnalyser()
    analyser.fftSize = 128
    source.connect(analyser)
    analyser.connect(gain)
    // The data array receive the audio frequencies
    const data = new Uint8Array(analyser.frequencyBinCount)
    return {
        context,
        source,
        gain,
        data,
        avg: 0,
        // This function gets called every frame per audio source
        update: () => {
            analyser.getByteFrequencyData(data)
            // Calculate a frequency average
            return data.avg = data.reduce((prev, cur) => prev + cur, 0) / data.length
        }
    }
}
