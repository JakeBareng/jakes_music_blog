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
import song, { Song } from "@/models/song"

export default function Visualizer() {
    const [audio, setAudio] = useState<AudioData | null>(null);
    const [playing, setPlaying] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState(-1);

    function stop() {
        if (!audio) {
            const audio = suspend(() => createAudio(songs[selectedSong].URL), [songs[selectedSong].URL])
            audio.source.stop();
            setAudio(audio);
        }
        setPlaying(false);
        audio?.context.suspend();
    }
    function start() {
        if (!audio) {
            const audio = suspend(() => createAudio(songs[selectedSong].URL), [songs[selectedSong].URL])
            audio.source.start();
            setAudio(audio);
        }
        setPlaying(true);
        audio?.context.resume();
    }

    function next() {
        setSelectedSong((selectedSong + 1) % songs.length);
        stop();
    }

    function prev() {
        setSelectedSong((selectedSong - 1 + songs.length) % songs.length);
        stop();
    }

    const getSongs = async () => {
        const res = await fetch('/api/getAllSongs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const songs = await res.json();
        return songs;
    }

    useEffect(() => {
        (async () => {
            const res = await getSongs();
            setSongs(res);
            setSelectedSong(0);
        })();
    }, [])

    return (
        <>
            <div className="absolute p-10 left-0 right-0 flex flex-col flex-grow-2 items-center z-10">
                {
                    selectedSong >= 0 &&
                    <>
                        <p>Title: {songs[selectedSong].title}</p>
                        <p>BPM: {songs[selectedSong].bpm}</p>
                        <p>key: {songs[selectedSong].key}</p>
                        <p>Date: {String(new Date(songs[selectedSong].createdAt))}</p>
                        <p>Producers: {songs[selectedSong].producers.join(", ")}</p>
                        <p>Songwriters: {songs[selectedSong].songwriters.join(", ")}</p>
                        <p>Tags: {songs[selectedSong].tags.join(", ")}</p>
                        <VisualizerBtns playing={playing} start={start} stop={stop} />
                    </>
                }
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1, 5], fov: 10 }} className={``}>
                    <spotLight position={[-4, 4, -4]} angle={0.1} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                    <Suspense fallback={null}>
                        {
                            selectedSong >= 0 &&
                            <>
                                <Track position-z={0} url={songs[selectedSong].URL} />
                                <Zoom url={songs[selectedSong].URL} />
                            </>
                        }
                    </Suspense>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, .5]}>
                        <planeGeometry args={[100, 100, 1, 1]} />
                        <shadowMaterial transparent opacity={0.15} />
                    </mesh>
                </Canvas>
            </div>
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