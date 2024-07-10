import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Vector3 } from "three"
import { PerspectiveCamera } from "three"
import Elements from "./periodicTable/Elements"

type StructureProps = {
  count: number
  characteristicCount: number
  numberOfCharacteristics: number
  selectedAtomicNumber: number
  numberOfShapes: number
  setIsModalVisible: (isModalVisible: boolean) => void
  setAtomicNumber: (atomicNumber: number) => void
}

const Structure = (props: StructureProps): React.ReactNode => {
  const cameraPosition = [0, 0, 18]

  return (
    <div>
      <Canvas
        camera={{
          position: new Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2]),
        }}
        style={{ height: "96vh", width: "98vw" }}
      >
        <color attach="background" args={["#EEE"]} />
        <ambientLight color="#ffffff" intensity={1} />

        {typeof window !== "undefined" && (
          <OrbitControls
            args={[new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)]}
          />
        )}
        <group rotation={[-Math.PI / 2, 0, 0]} position={[5, 8, 0]}>
          <Elements
            selectedAtomicNumber={props.selectedAtomicNumber}
            count={props.count}
            numberOfShapes={props.numberOfShapes}
            shapesCount={props.count}
            numberOfCharacteristics={props.numberOfCharacteristics}
            CharacteristicCount={props.characteristicCount}
            setIsModalVisible={props.setIsModalVisible}
            setAtomicNumber={props.setAtomicNumber}
          />
        </group>
      </Canvas>
    </div>
  )
}
export default Structure
