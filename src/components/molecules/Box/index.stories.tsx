import DemoScene from '../../organisms/DemoScene';
import Box from '.';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'molecule/Box',
  component: Box,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = () => (
  <>
    <DemoScene cameraPosition={[2, 2, 2]}>
      <directionalLight color="blue" position={[3, 3, 0]}></directionalLight>
      <Box position={[0, 0, 0]} />
    </DemoScene>
  </>
);

export const Sample1 = Template.bind({});
