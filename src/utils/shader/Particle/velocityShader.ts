import { snoise } from './snoise';

export const velocityFragmentShader = /* glsl */ `
  uniform float time;
  uniform float seed;

  const float BULK_NUM = 10.0;

  ${snoise}

  void main() {
    if (gl_FragCoord.x >= 1.0) return;
    
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 pos = texture2D(texturePosition, uv).xyz;
    vec3 vel = texture2D(textureVelocity, uv).xyz;
    
    float scale = 0.1;

    // Creates the specified number of bundles(bulk) from each particle's trail.
    vel.xyz += 80.0 * vec3(
      snoise(vec4(scale*pos.xyz, 7.225 * seed * 200.0 + 0.4 * time * mod(gl_FragCoord.y, BULK_NUM))),
      snoise(vec4(scale*pos.xyz, 3.553 * seed + 0.4 * time * mod(gl_FragCoord.y, BULK_NUM))),
      snoise(vec4(scale*pos.xyz, 1.259 * seed * 10.0 + 0.4 * time * mod(gl_FragCoord.y, BULK_NUM)))
    ) * 0.005;

    vel += -pos*length(pos)* 0.005;
    vel.xyz *= 0.9 + abs(sin(uv.y * 9.0)) * 0.05;

    gl_FragColor = vec4(vel.xyz, 1.0);
  }
`;
