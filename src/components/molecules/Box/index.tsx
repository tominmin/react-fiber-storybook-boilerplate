import { useFrame, Vector3 } from '@react-three/fiber';
import { useRef } from 'react';

type Props = {
  position: Vector3;
};

const Box: React.FC<Props> = (props: Props) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Box;
