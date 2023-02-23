import { useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import {
  particlesFragmentShader,
  particlesVertexShader,
} from '../../../utils/shader/Particle/particlesShader';
import { Simulator } from './module/simulator';
import { updateParticlesUniforms } from './module/update';

const [width, height] = [window.innerWidth, window.innerHeight] as const;

export const Particles: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  // create simulator
  const { gl, camera } = useThree();
  const simulator = useMemo(() => new Simulator(gl), [gl]);

  // create material
  const uni = {
    time: { type: 'f', value: 1.0 },
    texturePosition: { value: null },
    textureVelocity: { value: null },
  };

  const matShader = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: uni,
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      transparent: true,
    });
    mat.extensions.drawBuffers = true;

    return mat;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const uv = new Float32Array(width * height * 2);
    let p = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        uv[p++] = i / (width - 1);
        uv[p++] = j / (height - 1);
      }
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    const positions = new Float32Array(width * height * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // frame loop
  useFrame(() => {
    camera.position.x = 4.0 * Math.cos(time / 360.0);
    camera.position.z = 4.0 * Math.sin(time / 360.0);
    camera.lookAt(0, 0, 0);

    simulator.compute(time);
    updateParticlesUniforms(matShader, simulator);

    matShader.uniforms.time.value = (time / 60.0) * 5;
    matShader.needsUpdate = true;
    setTime(time + 1);
  });

  return (
    <>
      <points geometry={geometry} material={matShader} position={[0, 0, 0]} />
    </>
  );
};
