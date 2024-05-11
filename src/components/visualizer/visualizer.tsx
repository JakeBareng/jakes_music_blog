import { Canvas, InstancedMeshProps, useFrame, useLoader, useThree } from "@react-three/fiber"
// drei controls
import { Cylinder, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useEffect, useRef, useState } from "react"
import { clear, suspend } from "suspend-react"
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
        setPlaying(false);
        audio?.context.suspend();
    }

    function start() {
        setPlaying(true);
        audio?.context.resume();
    }

    function next() {
        setSelectedSong((selectedSong + 1) % songs.length);
    }

    function prev() {
        setSelectedSong((selectedSong - 1 + songs.length) % songs.length);
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
        audio?.changeSrc(songs[selectedSong].URL);
    }, [selectedSong])

    //fetch songs on load
    useEffect(() => {
        (async () => {
            if (songs.length === 0) {
                const res = await getSongs();
                setSongs(res);
                setSelectedSong(0);
                setAudio(await createAudio(res[0].URL));
            }
        })();
    }, [])



    return (
        <>
            <div className="absolute top-10 left-0 right-0 flex flex-col flex-grow-2 items-center z-10">
                {
                    songs.length > 0 &&
                    <>
                        <p className="font-josefin text-lg font-semibold">Title: {songs[selectedSong].title}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">BPM: {songs[selectedSong].bpm}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">key: {songs[selectedSong].key}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">Date: {String(new Date(songs[selectedSong].createdAt).toDateString())}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">Producers: {songs[selectedSong].producers.join(", ")}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">Songwriters: {songs[selectedSong].songwriters.join(", ")}</p>
                        <p className="font-josefin text-sm opacity-60 font-normal">Tags: {songs[selectedSong].tags.join(", ")}</p>
                        <VisualizerBtns functions={{ playing, next, prev, start, stop }} />
                    </>
                }
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1, 5], fov: 10 }} className={``}>
                    <spotLight position={[-4, 4, -4]} angle={0.1} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                    <Suspense fallback={null}>
                        {
                            audio &&
                            <>
                                <Track position-z={0} audio={audio} />
                                <Zoom audio={audio} />
                            </>
                        }
                    </Suspense>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, .5]}>
                        <planeGeometry args={[100, 100, 1, 1]} />
                        <shadowMaterial transparent opacity={0.15} />
                    </mesh>
                    <OrbitControls autoRotate autoRotateSpeed={1.1} enableZoom={false}/>
                </Canvas>
            </div>
        </>
    )
}

function Zoom({ audio }: { audio: AudioData }) {
    // This will *not* re-create a new audio source, suspense is always cached,
    // so this will just access (or create and then cache) the source according to the url
    const { data } = audio;
    return useFrame((state) => {
        // Set the cameras field of view according to the frequency average
        state.camera.fov = 10 - data.avg / 100
        state.camera.updateProjectionMatrix()
    })
}