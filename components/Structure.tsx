import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
// Remove the import statement for React
import { Vector3 } from "three"
import { PerspectiveCamera } from "three"
import Elements from "./Elements"

// import './App.css';
// import Elements from './Elements.js';

const Structure = (): React.ReactNode => {
  const cameraPosition = [0, 0, 18]

  return (
    <div>
      <Canvas
        camera={{
          position: new Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2]),
        }}
        style={{ height: "120vh", width: "120vw" }}
      >
        <color attach="background" args={["#EEE"]} />
        <ambientLight color="#ffffff" intensity={1} />

        {typeof window !== "undefined" && (
          <OrbitControls
            args={[new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)]}
          />
        )}

        <scene>
          <Elements />
        </scene>
      </Canvas>
    </div>
  )
}
export default Structure
//
