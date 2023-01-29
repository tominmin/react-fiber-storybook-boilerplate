import { Canvas, Vector3 } from "@react-three/fiber";

type Props = {
  cameraPosition: Vector3,
  fov?: number,
  near?: number,
  far?: number,
  aspect?: number | undefined,
  children: React.ReactNode;
}

const DemoScene: React.FC<Props> = ({
  children,
  cameraPosition = [0, 0, 0],
  fov = 50,
  near = 0.1,
  far = 2000,
  aspect
 }) => {
  return (
    <>
      <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov,
            aspect: aspect ?? (window.innerWidth / window.innerHeight),
            near,
            far,
          }}
          shadows
        >
          <color attach="background" args={['#000']} />
          <ambientLight intensity={0.1}></ambientLight>
          {children}
        </Canvas>
      </div>

    </>
  );
}

export default DemoScene;