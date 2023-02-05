import { mod289 } from '../common/mod289';
import { snoise } from '../common/snoise';

export const fragmentShader = /* glsl */ `
	uniform sampler2D texture;
	uniform float distortion;
	uniform float distortion2;
	uniform float speed;
	uniform float rollSpeed;

	// Start Ashima 2D Simplex Noise
	${mod289}

	vec3 permute(vec3 x) {
		return mod289(((x*34.0)+1.0)*x);
	}

	// End Ashima 2D Simplex Noise
	${snoise}

	void mainUv(inout vec2 uv) {
		float ty = time * speed;
		float yt = uv.y - ty;

		// smooth distortion
		float offset = snoise(vec2(yt * 3.0, 0.0)) * 0.2;

		// boost distortion
		offset = offset * distortion * offset * distortion * offset;

		// add fine grain distortion
		offset += snoise(vec2(yt * 50.0, 0.0)) * distortion2 * 0.001;

		// combine distortion on X with roll on Y
		uv = vec2(fract(uv.x + offset), fract(uv.y - time * rollSpeed));
	}
`;
