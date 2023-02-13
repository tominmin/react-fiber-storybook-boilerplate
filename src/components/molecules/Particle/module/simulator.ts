import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import { positionFragmentShader } from '../../../../utils/shader/Particle/positionShader';
import { velocityFragmentShader } from '../../../../utils/shader/Particle/velocityShader';
import type { ComTexs, Uniform } from './simulator.type';
import type * as THREE from 'three';

export class Simulator {
  private computeRenderer;

  private comTexs: ComTexs = {
    position: {
      texture: null,
      uniforms: null,
    },
    velocity: {
      texture: null,
      uniforms: null,
    },
  };

  constructor(gl: THREE.WebGLRenderer) {
    this.computeRenderer = new GPUComputationRenderer(1000, 500, gl);

    this.init();
  }

  private fillTextures(texture: THREE.DataTexture) {
    const arr = texture.image.data;
    for (let k = 0, kl = arr.length; k < kl; k += 4) {
      // const x = Math.random();
      // const y = Math.random();
      // const z = Math.random();
      arr[k + 0] = 0;
      arr[k + 1] = 0;
      arr[k + 2] = 0;
      arr[k + 3] = 0;
    }
  }

  private init = () => {
    // set the default position to texture
    const initPositionTex = this.computeRenderer.createTexture();
    const initVelocityTex = this.computeRenderer.createTexture();

    this.fillTextures(initPositionTex);
    this.fillTextures(initVelocityTex);

    this.comTexs.position.texture = this.computeRenderer.addVariable(
      'texturePosition',
      positionFragmentShader,
      initPositionTex
    );

    this.comTexs.velocity.texture = this.computeRenderer.addVariable(
      'textureVelocity',
      velocityFragmentShader,
      initVelocityTex
    );

    this.computeRenderer.setVariableDependencies(
      this.comTexs.position.texture,
      [this.comTexs.position.texture, this.comTexs.velocity.texture]
    );
    this.comTexs.position.uniforms = this.comTexs.position.texture.material
      .uniforms as Uniform;

    this.computeRenderer.setVariableDependencies(
      this.comTexs.velocity.texture,
      [this.comTexs.velocity.texture, this.comTexs.position.texture]
    );
    this.comTexs.velocity.uniforms = this.comTexs.velocity.texture.material
      .uniforms as Uniform;

    this.comTexs.velocity.uniforms.time = { type: 'f', value: 0 };
    this.comTexs.velocity.uniforms.seed = {
      type: 'f',
      value: Math.random() * 100,
    };

    const error = this.computeRenderer.init();
    if (error !== null) {
      console.error(error);
    }
  };

  compute = (time: number) => {
    this.computeRenderer.compute();

    this.comTexs.velocity.uniforms!.time.value = time;
  };

  getPositionTexture() {
    const target = this.computeRenderer.getCurrentRenderTarget(
      this.comTexs.position.texture!
    ) as THREE.WebGLRenderTarget;
    return target.texture;
  }

  getVelocityTexture() {
    const target = this.computeRenderer.getCurrentRenderTarget(
      this.comTexs.velocity.texture!
    ) as THREE.WebGLRenderTarget;
    return target.texture;
  }
}
