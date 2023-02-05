import { EffectComposer } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import { forwardRef, useMemo } from 'react';
import { TVNoiseShader } from '../../../../utils/shader/TVNoise';
import type { EffectProps } from '../../../../utils/shader/TVNoise';

export type Props = EffectProps;

class MyCustomEffectImpl extends Effect {
  constructor(props: EffectProps) {
    const shader = TVNoiseShader({ ...props });
    super('MyCustomEffect', shader.fragmentShader, {
      uniforms: shader.uniforms,
    });
  }
}

const CustomEffect = forwardRef<unknown, Props>((props, ref) => {
  const effect = useMemo(
    () =>
      new MyCustomEffectImpl({
        distortion: props.distortion,
        distortion2: props.distortion2,
        speed: props.speed,
        rollSpeed: props.rollSpeed,
      }),
    [props?.distortion, props?.distortion2, props?.speed, props?.rollSpeed]
  );

  return (
    <EffectComposer>
      <primitive ref={ref} object={effect} dispose={null} />
    </EffectComposer>
  );
});

export default CustomEffect;
