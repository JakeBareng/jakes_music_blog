export type AudioData = {
    context: AudioContext
    source: AudioBufferSourceNode
    gain: GainNode
    data: Uint8Array
    avg: number
    changeSrc: (url: string) => void
    update: () => number
    manualAvg: (num: number) => number  
}

export async function createAudio(url: string) {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const context = new (window.AudioContext)()
    let source = context.createBufferSource()
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
    source.loop = true
    source.start(0);
    context.suspend();

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
        changeSrc: async (url: string) => {
            try {
                // 1. Fetch the new audio resource
                const res = await fetch(url);
                const buffer = await res.arrayBuffer();

                // 2. Decode the new audio data
                const decodedAudio = await new Promise((res) => context.decodeAudioData(buffer, res));

                // 3. Stop the old audio source
                source.stop();

                // 4. Create a new source and assign the buffer
                source = context.createBufferSource();
                source.buffer = decodedAudio;
                source.loop = true;

                // 5. Reconnect the source to the audio graph
                source.connect(analyser); // Assuming 'analyser' is in scope

                source.start(0);
            } catch (error) {
                console.error("Error changing audio source:", error);
                // Handle the error appropriately for your application
            }
        },

        // This function gets called every frame per audio source
        update: () => {
            analyser.getByteFrequencyData(data)
            // Calculate a frequency average
            return data.avg = data.reduce((prev, cur) => prev + cur, 0) / data.length
        }
    }
}
