'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Custom shader material for stars with UV duotone edges
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
        varying float vDistance;

        void main() {
          vColor = color;

          // Pulsating effect based on position
          float pulse = sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.5 + 0.5;
          vIntensity = 0.6 + pulse * 0.4;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = -mvPosition.z;

          // Size based on depth and pulse
          float size = (12.0 / vDistance) * pixelRatio;
          size *= (0.8 + pulse * 0.6);

          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        varying float vIntensity;
        varying float vDistance;

        void main() {
          // Create circular stars with duotone UV edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // Multi-layer glow system

          // Outer UV glow (purple/cyan duotone)
          float outerGlow = 1.0 - smoothstep(0.3, 0.5, dist);
          outerGlow = pow(outerGlow, 2.0);

          // Mid-range glow
          float midGlow = 1.0 - smoothstep(0.15, 0.35, dist);
          midGlow = pow(midGlow, 1.8);

          // Bright white core
          float core = 1.0 - smoothstep(0.0, 0.15, dist);
          core = pow(core, 4.0);

          // UV color bands - duotone edges
          vec3 uvPurple = vec3(0.7, 0.4, 1.0); // Bright purple
          vec3 uvCyan = vec3(0.3, 0.9, 1.0);   // Bright cyan
          vec3 white = vec3(1.0, 1.0, 1.0);

          // Animate color shift based on time and position
          float colorShift = sin(time * 0.5 + dist * 10.0) * 0.5 + 0.5;
          vec3 edgeColor = mix(uvPurple, uvCyan, colorShift);

          // Build final color with layered approach
          vec3 finalColor = vec3(0.0);

          // Add outer UV edge glow
          finalColor += edgeColor * outerGlow * 1.5;

          // Add mid-range with original star color
          finalColor += vColor * midGlow * 2.0;

          // Add bright white core
          finalColor += white * core * 3.0;

          // Calculate alpha with enhanced glow
          float finalAlpha = (outerGlow * 0.6 + midGlow * 0.8 + core * 1.0) * vIntensity;

          // Add shimmer effect
          float shimmer = sin(time * 3.0 + vDistance) * 0.1 + 0.9;
          finalAlpha *= shimmer;

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

      // BRIGHT, vivid UV color variation for black background
      const colorVariation = Math.random();
      const starType = Math.random();

      if (starType > 0.92) {
        // Ultra-bright purple/magenta stars
        colors[i3] = 0.8 + colorVariation * 0.2;
        colors[i3 + 1] = 0.3 + colorVariation * 0.2;
        colors[i3 + 2] = 1.0;
      } else if (starType > 0.82) {
        // Electric cyan stars
        colors[i3] = 0.2 + colorVariation * 0.2;
        colors[i3 + 1] = 0.8 + colorVariation * 0.2;
        colors[i3 + 2] = 1.0;
      } else if (starType > 0.7) {
        // Bright violet stars
        colors[i3] = 0.6 + colorVariation * 0.3;
        colors[i3 + 1] = 0.4 + colorVariation * 0.2;
        colors[i3 + 2] = 0.9 + colorVariation * 0.1;
      } else if (starType > 0.5) {
        // Bright blue stars
        colors[i3] = 0.3 + colorVariation * 0.2;
        colors[i3 + 1] = 0.5 + colorVariation * 0.3;
        colors[i3 + 2] = 0.95 + colorVariation * 0.05;
      } else {
        // White-blue stars (majority)
        colors[i3] = 0.7 + colorVariation * 0.3;
        colors[i3 + 1] = 0.8 + colorVariation * 0.2;
        colors[i3 + 2] = 1.0;
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

      {/* Glowing accent stars with enhanced UV brightness */}
      <Points ref={glowRef} positions={glowPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.95}
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
          const colorChoice = Math.random();
          const color = colorChoice > 0.66 ? '#a855f7' : colorChoice > 0.33 ? '#06b6d4' : '#8b5cf6';
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
      material.opacity = 0.35 + Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.35}
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
        color="#a855f7"
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

          // Nebula glow effect - enhanced for dark background
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 2.5);

          // UV color variation - bright and vivid for dark background
          vec3 color1 = vec3(0.7, 0.4, 1.0); // Bright purple
          vec3 color2 = vec3(0.3, 0.9, 1.0); // Electric cyan
          vec3 color3 = vec3(0.8, 0.5, 1.0); // Magenta

          // Triple color mix for complex shifting
          float mixer1 = sin(time * 0.4) * 0.5 + 0.5;
          float mixer2 = cos(time * 0.3) * 0.5 + 0.5;
          vec3 tempColor = mix(color1, color2, mixer1);
          vec3 color = mix(tempColor, color3, mixer2 * 0.5);

          // Enhanced opacity for visibility on dark background
          float opacity = glow * (0.12 + sin(time * 0.25) * 0.06);

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
