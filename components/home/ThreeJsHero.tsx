'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);

  // Generate star positions in a more realistic distribution
  const { positions, colors, glowPositions } = useMemo(() => {
    const positions = new Float32Array(8000 * 3);
    const colors = new Float32Array(8000 * 3);
    const glowPositions = new Float32Array(200 * 3);

    // Main starfield
    for (let i = 0; i < 8000; i++) {
      const i3 = i * 3;

      // Create depth with varying z positions
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color variation (blue-white spectrum)
      const colorVariation = Math.random();
      colors[i3] = 0.4 + colorVariation * 0.6; // R
      colors[i3 + 1] = 0.6 + colorVariation * 0.4; // G
      colors[i3 + 2] = 0.9 + colorVariation * 0.1; // B
    }

    // Larger glowing stars
    for (let i = 0; i < 200; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      glowPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      glowPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      glowPositions[i3 + 2] = radius * Math.cos(phi);
    }

    return { positions, colors, glowPositions };
  }, []);

  // Smooth rotation animation
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.x = time * 0.03;
      ref.current.rotation.y = time * 0.05;
    }

    // Pulsing glow effect
    if (glowRef.current) {
      const time = state.clock.getElapsedTime();
      glowRef.current.rotation.x = time * 0.02;
      glowRef.current.rotation.y = time * 0.04;

      // Pulse scale
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Main starfield */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Glowing accent stars */}
      <Points ref={glowRef} positions={glowPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#64ffda"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.z = time * 0.01;

      // Subtle opacity pulse
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }
    }
  });

  const shader = useMemo(
    () => ({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center);

          // Nebula glow effect
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 2.0);

          // Color variation
          vec3 color1 = vec3(0.39, 1.0, 0.85); // Accent color
          vec3 color2 = vec3(0.65, 0.55, 0.97); // Secondary color
          vec3 color = mix(color1, color2, sin(time * 0.5) * 0.5 + 0.5);

          // Pulsing opacity
          float opacity = glow * (0.08 + sin(time * 0.3) * 0.03);

          gl_FragColor = vec4(color, opacity);
        }
      `,
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        {...shader}
      />
    </mesh>
  );
}

export const ThreeJsHero: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <StarField />
        <NebulaCloud />
      </Canvas>
    </div>
  );
};
