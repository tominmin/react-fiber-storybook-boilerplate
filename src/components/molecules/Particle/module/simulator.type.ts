import type { Variable } from 'three/examples/jsm/misc/GPUComputationRenderer';

export type Uniform = {
  [uniform: string]: {
    type: string;
    value: number;
  };
};

export type ComTexs = {
  position: {
    texture: Variable | null;
    uniforms: Uniform | null;
  };
  velocity: {
    texture: Variable | null;
    uniforms: Uniform | null;
  };
};
