import { Uniform } from 'three';
import { fragmentShader } from './fragment';
import { vertexShader } from './vertex';

export type EffectProps = {
  distortion?: number;
  distortion2?: number;
  speed?: number;
  rollSpeed?: number;
};

export const TVNoiseShader = ({
  distortion = 3.0,
  distortion2 = 6.0,
  speed = 0.5,
  rollSpeed = 0.2,
}: EffectProps) => ({
  uniforms: new Map([
    ['texture', new Uniform(null)],
    ['distortion', new Uniform(distortion)],
    ['distortion2', new Uniform(distortion2)],
    ['speed', new Uniform(speed)],
    ['rollSpeed', new Uniform(rollSpeed)],
  ]),
  vertexShader,
  fragmentShader,
});
