'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, View } from '@react-three/drei';
import * as THREE from 'three';

export const distortionVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const distortionFragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
uniform vec2 uImageRes;
uniform vec2 uContainerRes;
varying vec2 vUv;

void main() {
  // Object Cover Logic
  vec2 ratio = vec2(
    min((uContainerRes.x / uContainerRes.y) / (uImageRes.x / uImageRes.y), 1.0),
    min((uContainerRes.y / uContainerRes.x) / (uImageRes.y / uImageRes.x), 1.0)
  );
  
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  
  // Cinematic Liquid Distortion
  float waveX = sin(uv.y * 15.0 + uTime * 2.0) * 0.015 * uHoverState;
  float waveY = cos(uv.x * 15.0 + uTime * 2.0) * 0.015 * uHoverState;
  
  // Chromatic Aberration on Hover
  float r = texture2D(uTexture, uv + vec2(waveX * 2.0, waveY)).r;
  float g = texture2D(uTexture, uv + vec2(waveX, waveY)).g;
  float b = texture2D(uTexture, uv + vec2(waveX * -0.5, waveY)).b;
  
  vec4 color = vec4(r, g, b, 1.0);
  
  // Darken slightly on hover for cinematic feel
  color.rgb -= uHoverState * 0.15;
  
  gl_FragColor = color;
}
`;

const WebGLImage = ({ url, isHovered }: { url: string; isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(url);
  const { viewport, size } = useThree();
  
  const scale = useMemo(() => [viewport.width, viewport.height, 1] as [number, number, number], [viewport]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHoverState: { value: 0.0 },
      uTime: { value: 0.0 },
      uImageRes: { value: new THREE.Vector2((texture.image as HTMLImageElement).width, (texture.image as HTMLImageElement).height) },
      uContainerRes: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [texture, size.width, size.height]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        isHovered ? 1.0 : 0.0,
        0.08
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={distortionVertexShader}
        fragmentShader={distortionFragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

import { useInView } from 'framer-motion';

export default function WebGLDistortionImage({ src, alt, className, isHovered = false }: { src: string; alt: string; className?: string, isHovered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  if (!src) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${className || ''}`}>
      {isInView && (
        <View className="absolute inset-0 z-10 hidden md:block pointer-events-none">
          <React.Suspense fallback={null}>
            <WebGLImage url={src} isHovered={isHovered} />
          </React.Suspense>
        </View>
      )}
      
      {/* Fallback image that is always visible on mobile, or underneath the WebGL canvas on desktop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100" 
      />
    </div>
  );
}
