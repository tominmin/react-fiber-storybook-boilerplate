import type { Simulator } from './simulator';

export const updateParticlesUniforms = (
  material: THREE.ShaderMaterial,
  simulator: Simulator
) => {
  material.uniforms.texturePosition.value = simulator.getPositionTexture();
  material.uniforms.textureVelocity.value = simulator.getVelocityTexture();
};
