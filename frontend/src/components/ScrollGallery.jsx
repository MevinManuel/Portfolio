// ScrollGallery.jsx
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Image, Environment, ScrollControls, useScroll } from '@react-three/drei';
import { easing } from 'maath';
import { BentPlaneGeometry } from '../utils/util.js'; // Make sure this file exists


extend({ BentPlaneGeometry });

export default function ScrollGallery() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'radial-gradient(circle at center, #001f4d 0%, rgb(15 23 42) 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#001f4d', 8.5, 12]} />
        <ScrollControls pages={4}>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
        </ScrollControls>
        <Environment preset="dawn" blur={0.5} /> 
      </Canvas>
    </div>
  );
}

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return <group ref={ref} {...props} />;
  
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${(i % 10) + 1}_.jpg`} 
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({ url, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
