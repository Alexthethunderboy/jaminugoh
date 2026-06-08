'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const initialMeteors = Array.from({ length: 8 }).map(() => ({
  position: [
    -20 - Math.random() * 200,
    20 + Math.random() * 200,
    -5 - Math.random() * 15
  ] as [number, number, number]
}));

function Meteors() {
  const meteorRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meteorRef.current) {
      meteorRef.current.children.forEach((child) => {
        // Move diagonally at a slower pace
        child.position.x += 20 * delta;
        child.position.y -= 20 * delta;
        // Slight Z movement for depth
        child.position.z -= 2.5 * delta;

        // Reset if it goes way past the bottom right of the screen
        if (child.position.x > 100 || child.position.y < -100) {
          child.position.x = -50 - Math.random() * 200; // Place way offscreen for delay
          child.position.y = 50 + Math.random() * 200;  // Place way offscreen for delay
          child.position.z = -5 - Math.random() * 15;
        }
      });
    }
  });

  return (
    <group ref={meteorRef}>
      {initialMeteors.map((meteor, i) => (
        <mesh 
          key={i} 
          position={meteor.position}
          rotation={[0, 0, -Math.PI * 0.75]}
        >
          {/* Cylinder creates a streak. Top radius 0.08 (head), bottom radius 0 (tail), length 8 */}
          <cylinderGeometry args={[0.08, 0, 8, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function StarGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(isMobileDevice);

    let hasGyro = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        hasGyro = true;
        // gamma is left-to-right (-90 to 90), beta is front-to-back (-180 to 180)
        const x = Math.max(-1, Math.min(1, e.gamma / 45));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
        
        targetRotation.current.x = x;
        targetRotation.current.y = y;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasGyro) {
        targetRotation.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetRotation.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };

    if (isMobileDevice) {
      window.addEventListener('deviceorientation', handleOrientation);
      
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } else {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle parallax response to mouse
      const targetX = targetRotation.current.y * Math.PI * 0.05;
      const targetY = targetRotation.current.x * Math.PI * 0.05;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      
      // Constant slow drift
      groupRef.current.rotation.y += 0.0002;
      groupRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Stars 
          radius={50} 
          depth={50} 
          count={isMobile ? 1500 : 5000} 
          factor={3} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </group>
      <Meteors />
    </>
  );
}

export default function StarryBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-obsidian overflow-hidden">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarGroup />
      </Canvas>
    </div>
  );
}
