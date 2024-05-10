import { InstancedMeshProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createAudio } from "./createAudio";

export function Track({ audio, y = 1800, space = .4, width = 0.04, height = 0.05, depth = 0.05, obj = new THREE.Object3D(), ...props }: any) {
    const ref = useRef<any>()
    const { gain, context, update, data } = audio;

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
        <instancedMesh castShadow ref={ref} args={[null, null, data.length]} {...props}>
            <sphereGeometry args={[0.006, 32, 32]} />
            {/* <boxGeometry args={[.034,.034,.034]} /> */}
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}
