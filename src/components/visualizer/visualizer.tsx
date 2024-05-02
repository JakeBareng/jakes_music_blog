import { Canvas } from "@react-three/fiber"
// drei controls
import { OrbitControls } from "@react-three/drei"

export default function Visualizer() {
    return (
        <Canvas className="h-screen">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
            <OrbitControls />
        </Canvas>
    )
}