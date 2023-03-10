export const particlesVertexShader = /* glsl */ `
  uniform sampler2D texturePosition;
  varying vec4 vColor;
  varying vec2 vUv;

  void main() {
    vec4 posTemp = texture2D(texturePosition, uv);
    vec3 pos = posTemp.xyz;
    vColor = vec4(pos, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.3;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particlesFragmentShader = /* glsl */ `
  precision mediump float;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;
