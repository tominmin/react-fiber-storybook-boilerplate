import { useControls } from 'leva';
import DemoScene from '../../../organisms/DemoScene';
import Box from '../../Box';
import PassEffect from '.';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'molecule/Effect/PassEffect',
  component: PassEffect,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PassEffect>;

const Template: ComponentStory<typeof PassEffect> = () => {
  const datas = useControls('Scanline', {
    enabled: true,
    density: { value: 1.25, min: 0, max: 10, step: 0.01 },
  });

  return (
    <>
      <DemoScene cameraPosition={[2, 2, 2]}>
        <directionalLight color="blue" position={[3, 3, 0]}></directionalLight>
        <Box position={[0, 0, 0]} />
        {datas.enabled ? <PassEffect density={datas.density} /> : <></>}
      </DemoScene>
    </>
  );
};

export const Sample_Pass = Template.bind({});
