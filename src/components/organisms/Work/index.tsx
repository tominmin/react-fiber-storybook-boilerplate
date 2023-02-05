import React from 'react';
import Box from '../../molecules/Box';
import DemoScene from '../DemoScene';

const Work: React.FC = () => {
  return (
    <>
      <DemoScene cameraPosition={[2, 2, 2]}>
        <directionalLight color="blue" position={[3, 3, 0]} />
        <Box position={[0, 0, 0]}></Box>
      </DemoScene>
    </>
  );
};

export default Work;
