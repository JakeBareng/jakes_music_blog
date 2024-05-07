import { Canvas, InstancedMeshProps, useFrame, useLoader, useThree } from "@react-three/fiber"
// drei controls
import { Cylinder, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useEffect, useRef } from "react"
import { suspend } from "suspend-react"


export default function Visualizer() {
    //canvas styling absolute, top 0, left 0, width 100%, height 100% 
    const canvasStyle = "absolute top-0 left-0 w-full h-full"
    const testUrl = "https://jakesmusic.s3.us-east-2.amazonaws.com/kanyevultures+2.mp3"
    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }} className={canvasStyle}>
            <spotLight position={[-4, 4, -4]} angle={0.1} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
            <Suspense fallback={null}>
                <Track position-z={0} url={testUrl} />
                <Zoom url={testUrl} />
            </Suspense>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, .5]}>
                <planeGeometry args={[50, 50, 1, 1]} />
                <shadowMaterial transparent opacity={0.15} />
            </mesh>
            <OrbitControls />
        </Canvas>
    )
}
function Track({ url, y = 1500, space = 1, width = 0.04, height = 0.05, depth = 0.05, obj = new THREE.Object3D(), ...props }: any) {
    const ref = useRef<InstancedMeshProps>()
    // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = suspend(() => createAudio(url), [url])
    useEffect(() => {
        // Connect the gain node, which plays the audio
        gain.connect(context.destination)
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()
        // Distribute the instanced planes according to the frequency daza
        for (let i = 0; i < data.length; i++) {
            obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y, 0)
            obj.updateMatrix()
            ref.current.setMatrixAt(i, obj.matrix)
        }

        // Set the hue according to the frequency average
        ref.current.material.color.setHSL(avg / 300, 0.75, 0.75)
        ref.current.instanceMatrix.needsUpdate = true
    })
    return (
        <instancedMesh castShadow ref={ref} args={[null, null, data.length]}  {...props}>
            <sphereGeometry args={[.01, 32, 32]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}

async function createAudio(url: string) {
    // Fetch audio data and create a buffer source
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const context = new (window.AudioContext)()
    const source = context.createBufferSource()
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
    source.loop = true
    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first
    source.start(0)
    // Create gain node and an analyser
    const gain = context.createGain()
    const analyser = context.createAnalyser()
    analyser.fftSize = 64
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
function Zoom({ url }: { url: string }) {
    // This will *not* re-create a new audio source, suspense is always cached,
    // so this will just access (or create and then cache) the source according to the url
    const { data } = suspend(() => createAudio(url), [url])
    return useFrame((state) => {
        // Set the cameras field of view according to the frequency average
        state.camera.fov = 25 - data.avg / 100
        state.camera.updateProjectionMatrix()
    })
}