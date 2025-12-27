'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Generate star positions in a more realistic distribution
  const { positions, colors, glowPositions } = useMemo(() => {
    const positions = new Float32Array(12000 * 3);
    const colors = new Float32Array(12000 * 3);
    const glowPositions = new Float32Array(300 * 3);

    // Main starfield with layered depth
    for (let i = 0; i < 12000; i++) {
      const i3 = i * 3;

      // Create depth with varying z positions
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Enhanced color variation (blue-white-purple spectrum)
      const colorVariation = Math.random();
      const starType = Math.random();

      if (starType > 0.9) {
        // Purple stars
        colors[i3] = 0.7 + colorVariation * 0.3;
        colors[i3 + 1] = 0.5 + colorVariation * 0.3;
        colors[i3 + 2] = 1.0;
      } else if (starType > 0.7) {
        // Cyan/accent stars
        colors[i3] = 0.3 + colorVariation * 0.3;
        colors[i3 + 1] = 0.9 + colorVariation * 0.1;
        colors[i3 + 2] = 0.8 + colorVariation * 0.2;
      } else {
        // White-blue stars
        colors[i3] = 0.5 + colorVariation * 0.5;
        colors[i3 + 1] = 0.7 + colorVariation * 0.3;
        colors[i3 + 2] = 0.9 + colorVariation * 0.1;
      }
    }

    // Larger glowing stars with more variation
    for (let i = 0; i < 300; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      glowPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      glowPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      glowPositions[i3 + 2] = radius * Math.cos(phi);
    }

    return { positions, colors, glowPositions };
  }, []);

  // Enhanced rotation with mouse parallax
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();

      // Base rotation
      ref.current.rotation.x = time * 0.02 + mouse.y * 0.02;
      ref.current.rotation.y = time * 0.04 + mouse.x * 0.02;

      // Subtle drift
      ref.current.position.x = Math.sin(time * 0.1) * 0.1;
      ref.current.position.y = Math.cos(time * 0.15) * 0.1;
    }

    // Enhanced pulsing glow effect
    if (glowRef.current) {
      const time = state.clock.getElapsedTime();
      glowRef.current.rotation.x = time * 0.015 - mouse.y * 0.03;
      glowRef.current.rotation.y = time * 0.035 - mouse.x * 0.03;

      // Dynamic pulse scale with variation
      const scale = 1 + Math.sin(time * 0.7) * 0.15 + Math.cos(time * 0.3) * 0.05;
      glowRef.current.scale.setScalar(scale);

      // Mouse interaction
      glowRef.current.position.x = mouse.x * 0.5;
      glowRef.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <>
      {/* Main starfield */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Glowing accent stars */}
      <Points ref={glowRef} positions={glowPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#64ffda"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

function ShootingStarTrail() {
  const [stars, setStars] = useState<Array<{ id: number; progress: number; offset: THREE.Vector3 }>>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Spawn new shooting star occasionally
    if (Math.random() > 0.98 && stars.length < 3) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        -5
      );
      setStars(prev => [...prev, { id: Date.now(), progress: 0, offset }]);
    }

    // Update existing stars
    setStars(prev => prev
      .map(star => ({ ...star, progress: star.progress + 0.05 }))
      .filter(star => star.progress < 1)
    );
  });

  return (
    <>
      {stars.map(star => (
        <ShootingStar key={star.id} progress={star.progress} offset={star.offset} />
      ))}
    </>
  );
}

function ShootingStar({ progress, offset }: { progress: number; offset: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      const distance = 20;
      ref.current.position.x = offset.x + progress * distance;
      ref.current.position.y = offset.y - progress * distance * 0.5;
      ref.current.position.z = offset.z + progress * distance * 0.3;

      // Fade out
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - progress;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial
        color="#64ffda"
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
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
        <ShootingStarTrail />
        <NebulaCloud />
      </Canvas>
    </div>
  );
};
