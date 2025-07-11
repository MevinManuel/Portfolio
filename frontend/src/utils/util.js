// util.js
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'
import { shaderMaterial } from '@react-three/drei'

// utils/util.js
import * as THREE from 'three'

export class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius = 0.1, ...args) {
    super(...args)
    this.userData.radius = radius
    const pos = this.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const y = v.y * Math.PI
      v.z = Math.sin(y * radius)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
  }
}


const SineMaterial = shaderMaterial(
  { time: 0, map: null },
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 transformed = position.xyz;
      transformed.x += sin(uv.y * 3.1415) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  glsl`
    uniform sampler2D map;
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      uv.x += sin(uv.y * 10.0 + time) * 0.02;
      vec4 tex = texture2D(map, uv);
      gl_FragColor = tex;
    }
  `
)

extend({ MeshSineMaterial: SineMaterial })
