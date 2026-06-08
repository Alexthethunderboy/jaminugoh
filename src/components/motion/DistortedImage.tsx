'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;
    
    // Subtle lens distortion on hover
    float distortion = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
    uv.x += distortion;
    
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

function ImageMesh({ url, isHovered }: { url: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, url);
  
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHover: { value: 0 },
    uTime: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function DistortedImage({ url }: { url: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    const saveData = connection?.saveData === true;
    
    if (reducedMotion || saveData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUseFallback(true);
    }
  }, []);

  if (useFallback) {
    return (
      <div 
        className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${url})` }}
      />
    );
  }

  return (
    <div 
      className="w-full h-full cursor-none relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CSS Fallback Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${url})` }}
      />
      
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }} className="relative z-10">
        <React.Suspense fallback={null}>
          <ImageMesh url={url} isHovered={isHovered} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
