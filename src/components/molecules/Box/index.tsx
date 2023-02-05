import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Vector3 } from '@react-three/fiber';

type Props = {
  position?: Vector3;
};

const Box: React.FC<Props> = ({ position = [0, 0, 0] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Box;
