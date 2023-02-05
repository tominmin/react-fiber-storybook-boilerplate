import { useControls } from 'leva';
import DemoScene from '../../../organisms/DemoScene';
import Box from '../../Box';
import CustomEffect from '.';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'molecule/Effect/CustomEffect',
  component: CustomEffect,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CustomEffect>;

const Template: ComponentStory<typeof CustomEffect> = () => {
  const datas = useControls('Noise', {
    enabled: true,
    distortion: { value: 3.0, min: 0, max: 10, step: 0.01 },
    distortion2: { value: 6.0, min: 0, max: 10, step: 0.01 },
    speed: { value: 0.5, min: 0, max: 10, step: 0.01 },
    rollSpeed: { value: 0.2, min: 0, max: 10, step: 0.01 },
  });

  return (
    <>
      <DemoScene cameraPosition={[2, 2, 2]}>
        <directionalLight color="blue" position={[3, 3, 0]}></directionalLight>
        <Box position={[0, 0, 0]} />
        {datas.enabled ? (
          <CustomEffect
            distortion={datas.distortion}
            distortion2={datas.distortion2}
            speed={datas.speed}
            rollSpeed={datas.rollSpeed}
          />
        ) : (
          <></>
        )}
      </DemoScene>
    </>
  );
};

export const Sample_Custom = Template.bind({});
