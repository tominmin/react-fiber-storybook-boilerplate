import { EffectComposer, Scanline } from '@react-three/postprocessing';

type Props = {
  density?: number;
};

const PassEffect: React.FC<Props> = ({ density = 0.1 }) => {
  return (
    <EffectComposer>
      <Scanline density={density} />
    </EffectComposer>
  );
};

export default PassEffect;
