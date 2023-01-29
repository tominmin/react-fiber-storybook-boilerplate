import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import Box from "../../molecules/Box";

type Props = {

};

const Work: React.FC<Props> = () => {
  return (
    <>
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          camera={{
            position: [2, 2, 2],
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 2000,
          }}
          shadows
        >
          <color attach="background" args={['#000']} />
          <ambientLight intensity={0.1}></ambientLight>
          <directionalLight color="blue" position={[3, 3, 0]} />
          <Box position={[0, 0, 0]}></Box>
        </Canvas>
      </div>
    </>
  )
};

export default Work;