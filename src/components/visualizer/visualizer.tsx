import { Canvas, InstancedMeshProps, useFrame, useLoader, useThree } from "@react-three/fiber"
// drei controls
import { Cylinder, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useEffect, useRef, useState } from "react"
import { suspend } from "suspend-react"
import { Track } from "./track"
import { AudioData, createAudio } from "./createAudio"
import { set } from "mongoose"
import VisualizerBtns from "./visualizer-btns"

export default function Visualizer() {
    //canvas styling absolute, top 0, left 0, width 100%, height 100% 
    const canvasStyle = ""
    const testUrl = "https://jakesmusic.s3.us-east-2.amazonaws.com/kanyevultures+2.mp3"
    const [audio, setAudio] = useState<AudioData | null>(null);
    const [playing, setPlaying] = useState(false);
    const [songs, setSongs] = useState();

    function stop() {
        if (!audio) {
            const audio = suspend(() => createAudio(testUrl), [testUrl])
            audio.source.stop();
            setAudio(audio);
        }
        setPlaying(false);
        audio?.context.suspend();
    }
    function start() {
        if (!audio) {
            const audio = suspend(() => createAudio(testUrl), [testUrl])
            audio.source.start();
            setAudio(audio);
        }
        setPlaying(true);
        audio?.context.resume();
    }


    const getSongs = async () => {
        const res = await fetch('/api/getAllSongs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const songs = await res.json();
        console.log(songs)
    }

    getSongs();


    return (
        <>
            <VisualizerBtns playing={playing} start={start} stop={stop} />
            <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1, 5], fov: 10 }} className={canvasStyle}>
                <spotLight position={[-4, 4, -4]} angle={0.1} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                <Suspense fallback={null}>
                    <Track position-z={0} url={testUrl} />
                    <Zoom url={testUrl} />
                </Suspense>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, .5]}>
                    <planeGeometry args={[100, 100, 1, 1]} />
                    <shadowMaterial transparent opacity={0.15} />
                </mesh>
            </Canvas>
        </>
    )
}

function Zoom({ url }: { url: string }) {
    // This will *not* re-create a new audio source, suspense is always cached,
    // so this will just access (or create and then cache) the source according to the url
    const { data } = suspend(() => createAudio(url), [url])
    return useFrame((state) => {
        // Set the cameras field of view according to the frequency average
        state.camera.fov = 10 - data.avg / 100
        state.camera.updateProjectionMatrix()
    })
}