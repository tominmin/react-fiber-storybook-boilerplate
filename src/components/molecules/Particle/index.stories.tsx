import { Bloom, EffectComposer } from '@react-three/postprocessing';

import * as THREE from 'three';

import DemoScene from '../../organisms/DemoScene';
import { Particles } from '.';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'molecule/Particle',
  component: Particles,
  parameter: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Particles>;

const Template: ComponentStory<typeof Particles> = () => {
  return (
    <>
      <DemoScene>
        <directionalLight
          color={new THREE.Color(0xffffff)}
          position={[1, 1, 1]}
        ></directionalLight>
        <Particles></Particles>
        <EffectComposer>
          <Bloom intensity={0.5}></Bloom>
        </EffectComposer>
        {/* <axesHelper></axesHelper> */}
      </DemoScene>
    </>
  );
};

export const Sample_Particle = Template.bind({});
