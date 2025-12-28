'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Custom shader material for stars
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vIntensity;

        void main() {
          vColor = color;

          // Pulsating effect based on position
          float pulse = sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.5 + 0.5;
          vIntensity = 0.6 + pulse * 0.4;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Size based on depth and pulse
          float size = (8.0 / -mvPosition.z) * pixelRatio;
          size *= (0.8 + pulse * 0.4);

          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vIntensity;

        void main() {
          // Create circular stars with soft edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // Soft falloff for glow effect
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 1.5);

          // Core brightness
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          core = pow(core, 3.0);

          // Combine glow and core
          vec3 finalColor = vColor * (alpha + core * 1.5);
          float finalAlpha = (alpha * 0.85 + core) * vIntensity;

          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Generate star positions with MUCH darker, more dramatic colors
  const { positions, colors, glowPositions, starData } = useMemo(() => {
    const positions = new Float32Array(15000 * 3);
    const colors = new Float32Array(15000 * 3);
    const glowPositions = new Float32Array(400 * 3);
    const starData: Array<{ x: number; y: number; z: number }> = [];

    // Main starfield with much darker, more vibrant colors
    for (let i = 0; i < 15000; i++) {
      const i3 = i * 3;

      // Create depth with varying z positions
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Store some stars for flux ropes
      if (i < 50) {
        starData.push({ x, y, z });
      }

      // MUCH darker, more dramatic color variation
      const colorVariation = Math.random();
      const starType = Math.random();

      if (starType > 0.95) {
        // Brilliant purple stars
        colors[i3] = 0.5 + colorVariation * 0.3;
        colors[i3 + 1] = 0.1 + colorVariation * 0.2;
        colors[i3 + 2] = 0.8 + colorVariation * 0.2;
      } else if (starType > 0.85) {
        // Brilliant blue stars
        colors[i3] = 0.1 + colorVariation * 0.15;
        colors[i3 + 1] = 0.4 + colorVariation * 0.3;
        colors[i3 + 2] = 0.95 + colorVariation * 0.05;
      } else if (starType > 0.7) {
        // Cyan stars
        colors[i3] = 0.15 + colorVariation * 0.2;
        colors[i3 + 1] = 0.6 + colorVariation * 0.25;
        colors[i3 + 2] = 0.85 + colorVariation * 0.15;
      } else {
        // Deep blue-gray stars (darker majority)
        colors[i3] = 0.15 + colorVariation * 0.15;
        colors[i3 + 1] = 0.25 + colorVariation * 0.2;
        colors[i3 + 2] = 0.45 + colorVariation * 0.25;
      }
    }

    // Larger glowing stars
    for (let i = 0; i < 400; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      glowPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      glowPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      glowPositions[i3 + 2] = radius * Math.cos(phi);
    }

    return { positions, colors, glowPositions, starData };
  }, []);

  // Enhanced rotation with mouse parallax and shader updates
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ref.current) {
      // Update shader time uniform
      const material = ref.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Base rotation
      ref.current.rotation.x = time * 0.015 + mouse.y * 0.015;
      ref.current.rotation.y = time * 0.025 + mouse.x * 0.015;

      // Subtle drift
      ref.current.position.x = Math.sin(time * 0.08) * 0.08;
      ref.current.position.y = Math.cos(time * 0.12) * 0.08;
    }

    // Enhanced pulsing glow effect with more dramatic pulsing
    if (glowRef.current) {
      glowRef.current.rotation.x = time * 0.01 - mouse.y * 0.02;
      glowRef.current.rotation.y = time * 0.02 - mouse.x * 0.02;

      // More dramatic pulse scale
      const scale = 1 + Math.sin(time * 0.8) * 0.2 + Math.cos(time * 0.3) * 0.08;
      glowRef.current.scale.setScalar(scale);

      // Mouse interaction
      glowRef.current.position.x = mouse.x * 0.4;
      glowRef.current.position.y = mouse.y * 0.4;
    }
  });

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  return (
    <>
      {/* Main starfield with custom shader */}
      <points ref={ref} frustumCulled={false} geometry={geometry} material={starMaterial} />

      {/* Glowing accent stars with enhanced brightness */}
      <Points ref={glowRef} positions={glowPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Pass star data for flux ropes */}
      <FluxRopes starData={starData} />
    </>
  );
}

// Flux ropes - magnetic field lines connecting stars
function FluxRopes({ starData }: { starData: Array<{ x: number; y: number; z: number }> }) {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Create flux rope connections between random star pairs
  const fluxRopes = useMemo(() => {
    const ropes: Array<{ start: THREE.Vector3; end: THREE.Vector3; color: string; id: number }> = [];

    // Create 15 flux ropes connecting random stars
    for (let i = 0; i < 15; i++) {
      const start = starData[Math.floor(Math.random() * starData.length)];
      const end = starData[Math.floor(Math.random() * starData.length)];

      if (start && end && start !== end) {
        const distance = Math.sqrt(
          Math.pow(end.x - start.x, 2) +
          Math.pow(end.y - start.y, 2) +
          Math.pow(end.z - start.z, 2)
        );

        // Only connect stars that are reasonably close
        if (distance < 8) {
          const color = Math.random() > 0.5 ? '#2563eb' : '#8b5cf6';
          ropes.push({
            start: new THREE.Vector3(start.x, start.y, start.z),
            end: new THREE.Vector3(end.x, end.y, end.z),
            color,
            id: i
          });
        }
      }
    }

    return ropes;
  }, [starData]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.x = time * 0.008 + mouse.y * 0.01;
      groupRef.current.rotation.y = time * 0.012 + mouse.x * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {fluxRopes.map((rope) => (
        <FluxRope key={rope.id} start={rope.start} end={rope.end} color={rope.color} />
      ))}
    </group>
  );
}

function FluxRope({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const ref = useRef<any>(null);

  // Create curved path for flux rope
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3(
        (start.x + end.x) / 2 + (Math.random() - 0.5) * 2,
        (start.y + end.y) / 2 + (Math.random() - 0.5) * 2,
        (start.z + end.z) / 2 + (Math.random() - 0.5) * 2
      ),
      end
    ]);

    return curve.getPoints(50);
  }, [start, end]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const material = ref.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(time * 0.5) * 0.05;
    }
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.15}
    />
  );
}

function ShootingStarTrail() {
  const [stars, setStars] = useState<Array<{ id: number; progress: number; offset: THREE.Vector3 }>>([]);

  useFrame(() => {
    // Spawn new shooting star occasionally
    if (Math.random() > 0.985 && stars.length < 2) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        -5
      );
      setStars(prev => [...prev, { id: Date.now(), progress: 0, offset }]);
    }

    // Update existing stars
    setStars(prev => prev
      .map(star => ({ ...star, progress: star.progress + 0.04 }))
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
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial
        color="#2563eb"
        transparent
        opacity={1}
      />
    </mesh>
  );
}

function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.z = time * 0.008;

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

          // Color variation - softer for white background
          vec3 color1 = vec3(0.15, 0.4, 0.9); // Blue
          vec3 color2 = vec3(0.55, 0.35, 0.95); // Purple
          vec3 color = mix(color1, color2, sin(time * 0.4) * 0.5 + 0.5);

          // Subtle opacity
          float opacity = glow * (0.03 + sin(time * 0.25) * 0.015);

          gl_FragColor = vec4(color, opacity);
        }
      `,
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[25, 25]} />
      <shaderMaterial
        transparent
        depthWrite={false}
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
        dpr={[1, 2]}
      >
        <StarField />
        <ShootingStarTrail />
        <NebulaCloud />
      </Canvas>
    </div>
  );
};
