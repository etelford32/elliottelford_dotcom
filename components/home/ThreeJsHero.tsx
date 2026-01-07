'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const velocities = useRef<Float32Array>(new Float32Array(15000 * 3));

  // Custom shader material for stars with UV duotone edges
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
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
  const [{ positions, colors, glowPositions }] = useState(() => {
    const positions = new Float32Array(15000 * 3);
    const colors = new Float32Array(15000 * 3);
    const glowPositions = new Float32Array(400 * 3);

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

    return { positions, colors, glowPositions };
  });

  // Enhanced rotation with mouse parallax, shader updates, and black hole gravity
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ref.current) {
      // Update shader time uniform
      const material = ref.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Apply gravitational pull toward center (black hole)
      const positionAttr = ref.current.geometry.attributes.position;
      const positions = positionAttr.array as Float32Array;
      const vels = velocities.current;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Calculate distance from center (black hole)
        const distToCenter = Math.sqrt(x * x + y * y + z * z);

        // Gravitational force (stronger when closer)
        const gravityStrength = 0.0008;
        const force = gravityStrength / (distToCenter * distToCenter + 0.1);

        // Direction toward center
        const dirX = -x / distToCenter;
        const dirY = -y / distToCenter;
        const dirZ = -z / distToCenter;

        // Apply force to velocity
        vels[i] += dirX * force;
        vels[i + 1] += dirY * force;
        vels[i + 2] += dirZ * force;

        // Add tangential velocity for orbital motion
        const orbitalSpeed = 0.002 / Math.sqrt(distToCenter + 0.5);
        vels[i] += -y * orbitalSpeed;
        vels[i + 1] += x * orbitalSpeed;

        // Apply velocity damping
        vels[i] *= 0.998;
        vels[i + 1] *= 0.998;
        vels[i + 2] *= 0.998;

        // Update position
        positions[i] += vels[i];
        positions[i + 1] += vels[i + 1];
        positions[i + 2] += vels[i + 2];

        // Reset stars that get too close to event horizon
        if (distToCenter < 0.8) {
          const resetRadius = 18 + Math.random() * 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          positions[i] = resetRadius * Math.sin(phi) * Math.cos(theta);
          positions[i + 1] = resetRadius * Math.sin(phi) * Math.sin(theta);
          positions[i + 2] = resetRadius * Math.cos(phi);
          vels[i] = 0;
          vels[i + 1] = 0;
          vels[i + 2] = 0;
        }
      }

      positionAttr.needsUpdate = true;

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

      {/* Flux ropes removed - causing random line artifacts */}
    </>
  );
}

// Flux ropes - magnetic field lines connecting stars
// FluxRopes component - currently unused, may be enabled in future
/* eslint-disable @typescript-eslint/no-unused-vars */
function _FluxRopes({ starData }: { starData: Array<{ x: number; y: number; z: number }> }) {
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
        <_FluxRope key={rope.id} start={rope.start} end={rope.end} color={rope.color} />
      ))}
    </group>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */

function _FluxRope({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
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

function ShootingStarTrail({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
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
        <ShootingStar key={star.id} progress={star.progress} offset={star.offset} theme={theme} />
      ))}
    </>
  );
}

function ShootingStar({ progress, offset, theme: _theme = 'dark' }: { progress: number; offset: THREE.Vector3; theme?: 'light' | 'dark' }) {
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

// Black Hole with Event Horizon and 3D Volumetric Accretion Disk
function BlackHole({
  enableDopplerShift = true,
  enableGravitationalLensing = true,
  theme = 'dark'
}: {
  enableDopplerShift?: boolean;
  enableGravitationalLensing?: boolean;
  theme?: 'light' | 'dark';
}) {
  const eventHorizonRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Points>(null);
  const innerDiskRef = useRef<THREE.Points>(null);
  const polarJetsRef = useRef<THREE.Points>(null);
  const holographicDiskRef = useRef<THREE.Points>(null);
  const magneticFieldLinesRef = useRef<THREE.Points>(null);
  const particleTrailsRef = useRef<THREE.Points>(null);
  const orbitingStarsRef = useRef<THREE.Points>(null);
  const starTrailsRef = useRef<THREE.Points>(null);

  // Velocity storage for accretion disk particles
  const diskVelocities = useRef<Float32Array>(new Float32Array(8000 * 3));
  const innerDiskVelocities = useRef<Float32Array>(new Float32Array(2000 * 3));

  // Angular momentum and transform state
  const angularMomentum = useRef<Float32Array>(new Float32Array(8000));
  const polarAngle = useRef<Float32Array>(new Float32Array(8000)); // Theta in spherical coords
  const azimuthalAngle = useRef<Float32Array>(new Float32Array(8000)); // Phi in spherical coords

  // Particle trail history (last N positions for each particle)
  const TRAIL_LENGTH = 20;
  const trailPositions = useRef<Float32Array>(new Float32Array(8000 * TRAIL_LENGTH * 3));
  const trailAges = useRef<Float32Array>(new Float32Array(8000 * TRAIL_LENGTH));

  // Blandford-Znajek magnetic field state
  const magneticFieldStrength = useRef<Float32Array>(new Float32Array(8000));
  const spiralArmPhase = useRef<Float32Array>(new Float32Array(8000));

  // 3D Volumetric Accretion disk particles with full physics
  const { diskPositions, diskColors, diskData } = useMemo(() => {
    const particleCount = 8000; // Increased for density
    const diskPositions = new Float32Array(particleCount * 3);
    const diskColors = new Float32Array(particleCount * 3);
    const diskData: Array<{
      radius: number;
      angle: number;
      verticalPhase: number;
      turbulence: number;
      speed: number;
      spiralArmIndex: number;
      magneticFlux: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create 3D SPHERICAL TOROIDAL volume (not flat disk!)
      // Use spherical coordinates for true 3D distribution
      const minRadius = 0.9;
      const maxRadius = 3.4;

      // Radial distance from black hole (r in spherical coords)
      // Bias toward inner regions (more density closer in)
      const radiusBias = Math.pow(Math.random(), 0.7); // Power law distribution
      const radius = minRadius + radiusBias * (maxRadius - minRadius);

      // Azimuthal angle φ (full circle around z-axis)
      const phiInit = Math.random() * Math.PI * 2;

      // Polar angle θ from z-axis - concentrated near equator but with 3D volume
      // Use beta distribution for concentration near equator (θ = π/2)
      const thetaConcentration = 0.3; // Lower = more concentrated at equator
      const thetaRandom = Math.random();
      const thetaBias = Math.pow(Math.sin(thetaRandom * Math.PI), thetaConcentration);
      // Center around π/2 (equator) with spread
      const thetaInit = Math.PI / 2 + (Math.random() - 0.5) * thetaBias * 0.8;

      // Convert spherical (r, θ, φ) to Cartesian (x, y, z)
      diskPositions[i3] = radius * Math.sin(thetaInit) * Math.cos(phiInit);      // x
      diskPositions[i3 + 1] = radius * Math.sin(thetaInit) * Math.sin(phiInit);  // y
      diskPositions[i3 + 2] = radius * Math.cos(thetaInit);                       // z

      // Add small random perturbations for turbulence
      const perturbation = 0.02;
      diskPositions[i3] += (Math.random() - 0.5) * perturbation;
      diskPositions[i3 + 1] += (Math.random() - 0.5) * perturbation;
      diskPositions[i3 + 2] += (Math.random() - 0.5) * perturbation;

      // Store particle data for complex physics simulation
      // Spiral arms: 3 major arms following logarithmic spiral pattern
      const spiralArmIndex = Math.floor(Math.random() * 3);
      const magneticFlux = 0.5 + Math.random() * 0.5; // Magnetic field threading through disk

      diskData.push({
        radius,
        angle: phiInit,
        verticalPhase: Math.random() * Math.PI * 2, // For vertical oscillations
        turbulence: Math.random(), // Turbulent motion seed
        speed: 0.015 / Math.sqrt(radius), // Keplerian speed
        spiralArmIndex, // Which spiral arm (0, 1, or 2)
        magneticFlux // Poloidal magnetic field strength
      });

      // Initialize magnetic field strength and spiral phase
      magneticFieldStrength.current[i] = magneticFlux;
      spiralArmPhase.current[i] = spiralArmIndex * (2 * Math.PI / 3);

      // Initialize angular momentum (L = r × v)
      // For Keplerian orbit: L = r * v = r * sqrt(GM/r) = sqrt(GMr)
      const L = Math.sqrt(radius) * 0.5; // Normalized angular momentum
      angularMomentum.current[i] = L;

      // Initialize spherical coordinates
      // Convert (x, y, z) to (r, θ, φ)
      const rInit = Math.sqrt(diskPositions[i3] * diskPositions[i3] + diskPositions[i3 + 1] * diskPositions[i3 + 1] + diskPositions[i3 + 2] * diskPositions[i3 + 2]);
      const thetaCoord = Math.acos(diskPositions[i3 + 2] / rInit); // Polar angle from z-axis
      const phiCoord = Math.atan2(diskPositions[i3 + 1], diskPositions[i3]); // Azimuthal angle
      polarAngle.current[i] = thetaCoord;
      azimuthalAngle.current[i] = phiCoord;

      // Initialize trail positions (all start at particle position)
      for (let t = 0; t < TRAIL_LENGTH; t++) {
        const trailIdx = i * TRAIL_LENGTH + t;
        trailPositions.current[trailIdx * 3] = diskPositions[i3];
        trailPositions.current[trailIdx * 3 + 1] = diskPositions[i3 + 1];
        trailPositions.current[trailIdx * 3 + 2] = diskPositions[i3 + 2];
        trailAges.current[trailIdx] = t / TRAIL_LENGTH;
      }

      // Advanced temperature and color model for 3D spherical structure
      // Temperature based on distance from black hole center
      const distFromCenter = Math.sqrt(
        diskPositions[i3] * diskPositions[i3] +
        diskPositions[i3 + 1] * diskPositions[i3 + 1] +
        diskPositions[i3 + 2] * diskPositions[i3 + 2]
      );
      const temp = 1.0 - (distFromCenter - 0.9) / 2.5;

      // Cooling based on distance from equatorial plane
      const equatorDist = Math.abs(Math.cos(thetaCoord));
      const verticalCooling = 1.0 - equatorDist * 0.5;

      const effectiveTemp = temp * verticalCooling;

      if (effectiveTemp > 0.75) {
        // Ultra-hot inner region - brilliant blue-white
        diskColors[i3] = 0.85 + Math.random() * 0.15;
        diskColors[i3 + 1] = 0.92 + Math.random() * 0.08;
        diskColors[i3 + 2] = 1.0;
      } else if (effectiveTemp > 0.55) {
        // Hot region - white-yellow with blue tint
        diskColors[i3] = 0.95 + Math.random() * 0.05;
        diskColors[i3 + 1] = 0.85 + Math.random() * 0.15;
        diskColors[i3 + 2] = 0.5 + Math.random() * 0.3;
      } else if (effectiveTemp > 0.35) {
        // Warm region - yellow-orange
        diskColors[i3] = 1.0;
        diskColors[i3 + 1] = 0.6 + Math.random() * 0.3;
        diskColors[i3 + 2] = 0.2 + Math.random() * 0.3;
      } else {
        // Cool outer region - orange-red
        diskColors[i3] = 1.0;
        diskColors[i3 + 1] = 0.25 + Math.random() * 0.35;
        diskColors[i3 + 2] = 0.05 + Math.random() * 0.2;
      }
    }

    return { diskPositions, diskColors, diskData };
  }, []);

  // Inner super-hot accretion disk layer
  const { innerDiskPositions, innerDiskColors } = useMemo(() => {
    const particleCount = 2000;
    const innerDiskPositions = new Float32Array(particleCount * 3);
    const innerDiskColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 0.78 + Math.random() * 0.3; // Very close to event horizon
      const angle = Math.random() * Math.PI * 2;
      const thickness = (Math.random() - 0.5) * 0.04; // Very thin

      innerDiskPositions[i3] = Math.cos(angle) * radius;
      innerDiskPositions[i3 + 1] = Math.sin(angle) * radius;
      innerDiskPositions[i3 + 2] = thickness;

      // Extreme temperature - pure white with blue/UV tint
      innerDiskColors[i3] = 0.9 + Math.random() * 0.1;
      innerDiskColors[i3 + 1] = 0.95 + Math.random() * 0.05;
      innerDiskColors[i3 + 2] = 1.0;
    }

    return { innerDiskPositions, innerDiskColors };
  }, []);

  // HOLOGRAPHIC PHOTON DISK - Information-theoretic boundary layer
  const { holographicPositions, holographicColors } = useMemo(() => {
    const particleCount = 3000; // Dense holographic encoding
    const holographicPositions = new Float32Array(particleCount * 3);
    const holographicColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Holographic photon sphere at r = 1.5 * Schwarzschild radius
      const photonSphereRadius = 1.125; // Exact photon sphere
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Information encoded on spherical shell (holographic principle)
      const informationPattern = Math.sin(angle * 7 + phi * 5);
      const radiusVariation = photonSphereRadius * (1.0 + informationPattern * 0.02);

      holographicPositions[i3] = radiusVariation * Math.sin(phi) * Math.cos(angle);
      holographicPositions[i3 + 1] = radiusVariation * Math.sin(phi) * Math.sin(angle);
      holographicPositions[i3 + 2] = radiusVariation * Math.cos(phi);

      // Holographic colors - quantum information patterns
      // Encode in UV spectrum (high frequency photons)
      const infoPhase = (angle + phi) % (Math.PI / 3);
      if (infoPhase < Math.PI / 6) {
        // High-energy photons (blue-violet)
        holographicColors[i3] = 0.7 + Math.random() * 0.2;
        holographicColors[i3 + 1] = 0.8 + Math.random() * 0.2;
        holographicColors[i3 + 2] = 1.0;
      } else {
        // Ultra-high energy (white-blue)
        holographicColors[i3] = 0.95 + Math.random() * 0.05;
        holographicColors[i3 + 1] = 0.97 + Math.random() * 0.03;
        holographicColors[i3 + 2] = 1.0;
      }
    }

    return { holographicPositions, holographicColors };
  }, []);

  // MAGNETIC FIELD LINES - Blandford-Znajek threading
  const { magneticLinePositions, magneticLineColors } = useMemo(() => {
    const numLines = 50; // Number of field lines
    const pointsPerLine = 60; // Points along each line
    const totalPoints = numLines * pointsPerLine;
    const magneticLinePositions = new Float32Array(totalPoints * 3);
    const magneticLineColors = new Float32Array(totalPoints * 3);

    for (let lineIdx = 0; lineIdx < numLines; lineIdx++) {
      const startAngle = (lineIdx / numLines) * Math.PI * 2;
      const startRadius = 0.9 + Math.random() * 0.4; // Start in inner disk

      for (let pointIdx = 0; pointIdx < pointsPerLine; pointIdx++) {
        const i3 = (lineIdx * pointsPerLine + pointIdx) * 3;
        const t = pointIdx / pointsPerLine; // Parameter along field line

        // Poloidal field line trajectory (from disk to jet)
        const radius = startRadius * (1.0 - t * 0.3); // Spirals inward
        const height = t * 3.5; // Extends upward
        const angle = startAngle + t * Math.PI * 0.5; // Twists

        // Random vertical direction
        const direction = lineIdx % 2 === 0 ? 1 : -1;

        magneticLinePositions[i3] = Math.cos(angle) * radius;
        magneticLinePositions[i3 + 1] = Math.sin(angle) * radius;
        magneticLinePositions[i3 + 2] = height * direction;

        // Color based on field strength (brighter near black hole)
        const fieldStrength = 1.0 - t;
        magneticLineColors[i3] = 0.3 + fieldStrength * 0.5; // Red channel
        magneticLineColors[i3 + 1] = 0.6 + fieldStrength * 0.3; // Green
        magneticLineColors[i3 + 2] = 0.9 + fieldStrength * 0.1; // Blue (cyan)
      }
    }

    return { magneticLinePositions, magneticLineColors };
  }, []);

  // Polar jets - relativistic particles shooting from poles
  const jetDataRef = useRef<{
    jetPositions: Float32Array;
    jetColors: Float32Array;
    jetData: Array<{ height: number; angle: number; speed: number }>;
  }>(null as unknown as {
    jetPositions: Float32Array;
    jetColors: Float32Array;
    jetData: Array<{ height: number; angle: number; speed: number }>;
  });

  if (!jetDataRef.current) {
    const particleCount = 1500;
    const jetPositions = new Float32Array(particleCount * 3);
    const jetColors = new Float32Array(particleCount * 3);
    const jetData: Array<{ height: number; angle: number; speed: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Jets shoot along Z axis (perpendicular to disk)
      const height = Math.random() * 4; // Jet length
      const jetRadius = 0.05 + (height / 4) * 0.2; // Widens with distance
      const angle = Math.random() * Math.PI * 2;
      const direction = i < particleCount / 2 ? 1 : -1; // North and south jets

      jetPositions[i3] = Math.cos(angle) * jetRadius;
      jetPositions[i3 + 1] = Math.sin(angle) * jetRadius;
      jetPositions[i3 + 2] = (0.8 + height) * direction; // Start above disk

      jetData.push({
        height,
        angle,
        speed: 0.02 + Math.random() * 0.03
      });

      // Jet colors - blue-white with cyan synchrotron radiation
      const intensity = 1.0 - height / 4;
      jetColors[i3] = 0.4 + intensity * 0.4;
      jetColors[i3 + 1] = 0.7 + intensity * 0.3;
      jetColors[i3 + 2] = 1.0;
    }

    jetDataRef.current = { jetPositions, jetColors, jetData };
  }

  const { jetPositions, jetColors, jetData } = jetDataRef.current;

  // ORBITING STARS - Gravitational attractors in outer disk for accretion evolution
  const NUM_STARS = 9;
  const STAR_TRAIL_LENGTH = 150; // Longer trails for stars

  const starDataRef = useRef<{
    starPositions: Float32Array;
    starColors: Float32Array;
    starVelocities: Float32Array;
    starData: Array<{
      radius: number;
      angle: number;
      orbitalSpeed: number;
      mass: number;
      phase: number;
    }>;
  }>(null as unknown as {
    starPositions: Float32Array;
    starColors: Float32Array;
    starVelocities: Float32Array;
    starData: Array<{
      radius: number;
      angle: number;
      orbitalSpeed: number;
      mass: number;
      phase: number;
    }>;
  });

  if (!starDataRef.current) {
    const starPositions = new Float32Array(NUM_STARS * 3);
    const starColors = new Float32Array(NUM_STARS * 3);
    const starVelocities = new Float32Array(NUM_STARS * 3);
    const starData: Array<{
      radius: number;
      angle: number;
      orbitalSpeed: number;
      mass: number;
      phase: number;
    }> = [];

    for (let i = 0; i < NUM_STARS; i++) {
      const i3 = i * 3;

      // Distribute stars in outer disk (r: 2.0 to 3.2)
      const radius = 2.0 + (i / NUM_STARS) * 1.2;
      const angle = (i / NUM_STARS) * Math.PI * 2 + Math.random() * 0.5;
      const phase = Math.random() * Math.PI * 2;

      // Initial position on circular orbit in disk plane
      starPositions[i3] = Math.cos(angle) * radius;
      starPositions[i3 + 1] = Math.sin(angle) * radius;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 0.15;

      // Keplerian orbital speed v = sqrt(GM/r)
      const orbitalSpeed = Math.sqrt(1.0 / radius) * 0.15;

      // Initial velocity (perpendicular to radius)
      starVelocities[i3] = -Math.sin(angle) * orbitalSpeed;
      starVelocities[i3 + 1] = Math.cos(angle) * orbitalSpeed;
      starVelocities[i3 + 2] = 0;

      // Star mass (gravitational influence on particles)
      const mass = 0.08 + Math.random() * 0.12;

      starData.push({
        radius,
        angle,
        orbitalSpeed,
        mass,
        phase
      });

      // Star colors - bright stellar colors (white, yellow-white, blue-white)
      const starType = Math.random();
      if (starType < 0.33) {
        // Blue-white hot stars
        starColors[i3] = 0.85 + Math.random() * 0.15;
        starColors[i3 + 1] = 0.90 + Math.random() * 0.10;
        starColors[i3 + 2] = 1.0;
      } else if (starType < 0.66) {
        // White stars
        starColors[i3] = 0.95 + Math.random() * 0.05;
        starColors[i3 + 1] = 0.95 + Math.random() * 0.05;
        starColors[i3 + 2] = 0.90 + Math.random() * 0.10;
      } else {
        // Yellow-white stars
        starColors[i3] = 1.0;
        starColors[i3 + 1] = 0.92 + Math.random() * 0.08;
        starColors[i3 + 2] = 0.70 + Math.random() * 0.15;
      }
    }

    // Debug: log star initial positions
    console.log('Created', NUM_STARS, 'stars');
    for (let i = 0; i < NUM_STARS; i++) {
      const i3 = i * 3;
      console.log(`Star ${i}: pos=(${starPositions[i3].toFixed(2)}, ${starPositions[i3+1].toFixed(2)}, ${starPositions[i3+2].toFixed(2)}), color=(${starColors[i3].toFixed(2)}, ${starColors[i3+1].toFixed(2)}, ${starColors[i3+2].toFixed(2)})`);
    }

    starDataRef.current = { starPositions, starColors, starVelocities, starData };
  }

  const { starPositions, starColors, starVelocities, starData } = starDataRef.current;

  // Star trail positions (each star has a trail showing its orbit)
  const starTrailPositions = useRef<Float32Array | null>(null);
  const starTrailAges = useRef<Float32Array | null>(null);
  const starTrailColors = useRef<Float32Array | null>(null);

  // Initialize star trails
  if (!starTrailPositions.current) {
    starTrailPositions.current = new Float32Array(NUM_STARS * STAR_TRAIL_LENGTH * 3);
    starTrailAges.current = new Float32Array(NUM_STARS * STAR_TRAIL_LENGTH);
    starTrailColors.current = new Float32Array(NUM_STARS * STAR_TRAIL_LENGTH * 3);

    for (let i = 0; i < NUM_STARS; i++) {
      const i3 = i * 3;
      for (let t = 0; t < STAR_TRAIL_LENGTH; t++) {
        const trailIdx = i * STAR_TRAIL_LENGTH + t;
        starTrailPositions.current[trailIdx * 3] = starPositions[i3];
        starTrailPositions.current[trailIdx * 3 + 1] = starPositions[i3 + 1];
        starTrailPositions.current[trailIdx * 3 + 2] = starPositions[i3 + 2];
        starTrailAges.current[trailIdx] = t / STAR_TRAIL_LENGTH;
        starTrailColors.current[trailIdx * 3] = starColors[i3];
        starTrailColors.current[trailIdx * 3 + 1] = starColors[i3 + 1];
        starTrailColors.current[trailIdx * 3 + 2] = starColors[i3 + 2];
      }
    }
  }

  // Particle orbital binding state - tracks which gravitational source each particle orbits
  const particleOrbitSource = useRef<Int32Array | null>(null);
  const particleOrbitTransition = useRef<Float32Array | null>(null);

  // Initialize all particles to orbit black hole
  if (!particleOrbitSource.current) {
    particleOrbitSource.current = new Int32Array(8000);
    particleOrbitTransition.current = new Float32Array(8000);

    for (let i = 0; i < 8000; i++) {
      particleOrbitSource.current[i] = -1;
      particleOrbitTransition.current[i] = 0.0;
    }
  }

  // Animate 3D accretion disk with full physics simulation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Event horizon shader animation with camera position and theme updates
    if (eventHorizonRef.current) {
      const material = eventHorizonRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.isLightMode.value = theme === 'light'; // Update theme in real-time
      }
    }

    // Update accretion disk shader uniforms with theme
    if (accretionDiskRef.current) {
      const material = accretionDiskRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }
    }

    // ORBITING STARS - Update star positions with Keplerian orbital motion
    for (let i = 0; i < NUM_STARS; i++) {
      const i3 = i * 3;
      const star = starData[i];

      const x = starPositions[i3];
      const y = starPositions[i3 + 1];
      const z = starPositions[i3 + 2];

      const distToCenter = Math.sqrt(x * x + y * y + z * z);

      // Gravitational attraction from black hole
      const gravityStrength = 0.0015; // Stars also affected by black hole gravity
      const gravityForce = gravityStrength / (distToCenter * distToCenter + 0.02);

      const dirX = -x / distToCenter;
      const dirY = -y / distToCenter;
      const dirZ = -z / distToCenter;

      // Apply gravity to star velocity
      starVelocities[i3] += dirX * gravityForce;
      starVelocities[i3 + 1] += dirY * gravityForce;
      starVelocities[i3 + 2] += dirZ * gravityForce;

      // Keplerian orbital velocity (tangential)
      const cylindricalRadius = Math.sqrt(x * x + y * y);
      const orbitalOmega = star.orbitalSpeed / (cylindricalRadius + 0.1);

      // Tangential velocity to maintain orbit
      starVelocities[i3] += -y * orbitalOmega * 0.5;
      starVelocities[i3 + 1] += x * orbitalOmega * 0.5;

      // Slight damping for stability
      starVelocities[i3] *= 0.998;
      starVelocities[i3 + 1] *= 0.998;
      starVelocities[i3 + 2] *= 0.999;

      // Update star position
      starPositions[i3] += starVelocities[i3];
      starPositions[i3 + 1] += starVelocities[i3 + 1];
      starPositions[i3 + 2] += starVelocities[i3 + 2];

      // Update star angle and radius in data
      star.angle = Math.atan2(starPositions[i3 + 1], starPositions[i3]);
      star.radius = Math.sqrt(starPositions[i3] * starPositions[i3] + starPositions[i3 + 1] * starPositions[i3 + 1]);

      // UPDATE STAR TRAILS
      // Shift trail positions (oldest gets discarded)
      for (let t = STAR_TRAIL_LENGTH - 1; t > 0; t--) {
        const trailIdx = i * STAR_TRAIL_LENGTH + t;
        const prevIdx = i * STAR_TRAIL_LENGTH + (t - 1);

        starTrailPositions.current[trailIdx * 3] = starTrailPositions.current[prevIdx * 3];
        starTrailPositions.current[trailIdx * 3 + 1] = starTrailPositions.current[prevIdx * 3 + 1];
        starTrailPositions.current[trailIdx * 3 + 2] = starTrailPositions.current[prevIdx * 3 + 2];
        starTrailAges.current[trailIdx] = t / STAR_TRAIL_LENGTH;
      }

      // Set newest trail position to current star position
      const trailIdx = i * STAR_TRAIL_LENGTH;
      starTrailPositions.current[trailIdx * 3] = starPositions[i3];
      starTrailPositions.current[trailIdx * 3 + 1] = starPositions[i3 + 1];
      starTrailPositions.current[trailIdx * 3 + 2] = starPositions[i3 + 2];
      starTrailAges.current[trailIdx] = 0;
    }

    // Main 3D volumetric accretion disk with complex physics
    if (accretionDiskRef.current) {
      const posAttr = accretionDiskRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;
      const vels = diskVelocities.current;

      // Define accretion disk boundaries
      const INNER_RADIUS = 0.9;  // Inner edge (just outside photon sphere)
      const OUTER_RADIUS = 3.4;  // Outer edge of accretion disk
      const EVENT_HORIZON = 0.75; // Schwarzschild radius

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        const data = diskData[i];
        if (!data) continue;

        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        const radius = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);
        const distToCenter = Math.sqrt(x * x + y * y + z * z);

        // ENHANCED GRAVITATIONAL DYNAMICS - Stronger 3D gravity
        const gravityStrength = 0.0008; // Increased for more dramatic motion
        const gravityForce = gravityStrength / (distToCenter * distToCenter + 0.02);

        // Direction toward black hole center (3D)
        const dirX = -x / distToCenter;
        const dirY = -y / distToCenter;
        const dirZ = -z / distToCenter;

        // Apply strong 3D gravitational pull
        vels[i3] += dirX * gravityForce;
        vels[i3 + 1] += dirY * gravityForce;
        vels[i3 + 2] += dirZ * gravityForce;

        // DIFFERENTIAL ROTATION - Keplerian angular velocity Ω(r) ∝ r^(-1.5)
        // Inner particles orbit MUCH faster than outer particles
        const cylindricalRadius = Math.sqrt(x * x + y * y); // Distance from z-axis
        const differentialOmega = 0.025 / Math.pow(cylindricalRadius + 0.2, 1.5);

        // Apply differential rotation as tangential velocity
        vels[i3] += -y * differentialOmega;
        vels[i3 + 1] += x * differentialOmega;

        // SPHERICAL ROTATION COMPONENT - Rotation in θ direction (meridional)
        // Creates 3D spherical motion, not just planar
        const sphericalOmega = differentialOmega * 0.3; // 30% of azimuthal rotation
        const thetaVel = sphericalOmega * Math.sin(azimuthalAngle.current[i]);

        // Update z-velocity for spherical rotation
        vels[i3 + 2] += thetaVel * Math.cos(polarAngle.current[i]);

        // Frame-dragging: ENHANCED for 3D effect
        const frameDrag = 0.006 / (distToCenter * distToCenter + 0.05);
        vels[i3] += -y * frameDrag;
        vels[i3 + 1] += x * frameDrag;
        vels[i3 + 2] += z * frameDrag * 0.5; // Vertical frame-dragging

        // STELLAR GRAVITATIONAL ATTRACTION - Particles attracted to orbiting stars
        // Calculate distance to each star and apply gravitational force
        let closestStarDist = Infinity;
        let closestStarIndex = -1;
        let totalStarForceX = 0;
        let totalStarForceY = 0;
        let totalStarForceZ = 0;

        for (let s = 0; s < NUM_STARS; s++) {
          const si3 = s * 3;
          const starX = starPositions[si3];
          const starY = starPositions[si3 + 1];
          const starZ = starPositions[si3 + 2];

          // Vector from particle to star
          const dx = starX - x;
          const dy = starY - y;
          const dz = starZ - z;
          const distToStar = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Track closest star for orbit-switching logic
          if (distToStar < closestStarDist) {
            closestStarDist = distToStar;
            closestStarIndex = s;
          }

          // Gravitational force from star: F = G * M_star / r^2
          const starMass = starData[s].mass;
          const starGravityForce = starMass / (distToStar * distToStar + 0.05);

          // Direction toward star (normalized)
          const starDirX = dx / (distToStar + 0.001);
          const starDirY = dy / (distToStar + 0.001);
          const starDirZ = dz / (distToStar + 0.001);

          // Accumulate gravitational forces from all stars
          totalStarForceX += starDirX * starGravityForce;
          totalStarForceY += starDirY * starGravityForce;
          totalStarForceZ += starDirZ * starGravityForce;
        }

        // Apply stellar gravitational forces to particle velocity
        vels[i3] += totalStarForceX * 0.4; // Scaled for balance with black hole
        vels[i3 + 1] += totalStarForceY * 0.4;
        vels[i3 + 2] += totalStarForceZ * 0.4;

        // ORBIT-SWITCHING LOGIC - Accretion evolution dynamics
        // Particles can switch between orbiting black hole and orbiting stars
        const currentOrbitSource = particleOrbitSource.current[i];
        const blackHoleInfluence = gravityForce; // Already calculated above

        // Influence sphere: star's gravitational influence vs black hole
        let targetOrbitSource = -1; // Default to black hole

        if (closestStarDist < 0.4) { // Within star's influence sphere
          const closestStarMass = starData[closestStarIndex].mass;
          const starInfluence = closestStarMass / (closestStarDist * closestStarDist + 0.05);

          // If star's gravity dominates, switch to star orbit
          if (starInfluence > blackHoleInfluence * 1.5) {
            targetOrbitSource = closestStarIndex;
          }
        }

        // Smooth orbit transition
        if (targetOrbitSource !== currentOrbitSource) {
          // Gradually transition between orbital sources
          particleOrbitTransition.current[i] += 0.02; // Transition speed

          if (particleOrbitTransition.current[i] >= 1.0) {
            // Complete transition
            particleOrbitSource.current[i] = targetOrbitSource;
            particleOrbitTransition.current[i] = 0.0;

            // When switching to star orbit, add tangential velocity
            if (targetOrbitSource >= 0) {
              const si3 = targetOrbitSource * 3;
              const starX = starPositions[si3];
              const starY = starPositions[si3 + 1];

              // Vector from star to particle
              const dx = x - starX;
              const dy = y - starY;
              const radialDist = Math.sqrt(dx * dx + dy * dy);

              // Add orbital velocity around star
              const orbitalSpeed = Math.sqrt(starData[targetOrbitSource].mass / (radialDist + 0.05)) * 0.3;
              vels[i3] += -dy / (radialDist + 0.001) * orbitalSpeed;
              vels[i3 + 1] += dx / (radialDist + 0.001) * orbitalSpeed;
            }
          }
        } else {
          // Reset transition when staying with same source
          particleOrbitTransition.current[i] = 0.0;
        }

        // Apply velocity damping to prevent runaway speeds
        vels[i3] *= 0.995;
        vels[i3 + 1] *= 0.995;
        vels[i3 + 2] *= 0.997;

        // Update position based on velocity
        let newX = x + vels[i3];
        let newY = y + vels[i3 + 1];
        let newZ = z + vels[i3 + 2];

        // Add 3D turbulence - chaotic eddies and vortices
        const turbulenceScale = 0.003 * (1.0 + Math.sin(data.turbulence * 100));
        const turbX = Math.sin(time * 1.5 + data.turbulence * 10) * turbulenceScale;
        const turbY = Math.cos(time * 1.3 + data.turbulence * 8) * turbulenceScale;
        newX += turbX;
        newY += turbY;

        // Vertical oscillations - disk "breathing" from pressure waves
        const verticalOscillation = Math.sin(time * 2 + data.verticalPhase) * 0.015;
        // Epicyclic frequency - vertical oscillations at different rate than orbital
        const epicyclicFreq = Math.sqrt(2.0 / (radius + 0.5));
        const verticalWave = Math.sin(time * epicyclicFreq * 3 + angle * 2) * 0.008;

        // Magneto-rotational instability - creates vertical structure
        const mriTurbulence = Math.sin(time * 4 + radius * 5 + data.turbulence * 20) * 0.012;

        newZ += verticalOscillation + verticalWave + mriTurbulence;

        // ENHANCED SPIRAL DENSITY WAVES - Multi-arm logarithmic spiral
        // Logarithmic spiral: r = a * e^(b*θ) creates galaxy-like arms
        const numArms = 3; // Three major spiral arms
        const spiralTightness = 0.3; // How tightly wound the spiral is

        // Calculate spiral arm pattern for this particle
        const armPhase = spiralArmPhase.current[i];
        const spiralPattern = Math.sin(numArms * angle - spiralTightness * radius - armPhase + time * 0.3);

        // Density enhancement in spiral arms (particles concentrate here)
        const armDensity = Math.exp(spiralPattern * 1.5) * 0.04;

        // Magnetic pressure along spiral arms (Blandford-Znajek mechanism)
        const magneticPressure = magneticFieldStrength.current[i] * armDensity * 0.015;

        // Apply magnetic force perpendicular to orbital motion
        const magneticForceAngle = angle + Math.PI / 2;
        newX += Math.cos(magneticForceAngle) * magneticPressure;
        newY += Math.sin(magneticForceAngle) * magneticPressure;

        // Secondary spiral wave (creates sub-structure)
        const secondarySpiral = Math.sin(angle * 5 - radius * 1.5 - time * 0.4) * 0.015;

        // Combine spiral effects
        const totalSpiralEffect = spiralPattern * 0.025 + secondarySpiral;

        const newRadius = Math.sqrt(newX * newX + newY * newY);

        // BLANDFORD-ZNAJEK ENERGY EXTRACTION
        // Extract rotational energy via magnetic field lines threading event horizon
        if (radius < 1.5) { // Close to event horizon
          // Magnetic field extracts energy and angular momentum
          const bzExtraction = (1.5 - radius) * magneticFieldStrength.current[i] * 0.002;

          // Energy flows outward along field lines (powers jets)
          vels[i3 + 2] += Math.sign(z) * bzExtraction; // Vertical acceleration

          // Angular momentum is extracted
          vels[i3] *= (1.0 - bzExtraction * 0.1);
          vels[i3 + 1] *= (1.0 - bzExtraction * 0.1);

          // Update magnetic field strength (flux conservation)
          magneticFieldStrength.current[i] *= (1.0 + bzExtraction * 0.05);

          // Update angular momentum after extraction
          angularMomentum.current[i] *= (1.0 - bzExtraction * 0.1);
        }

        // ANGULAR MOMENTUM TRANSFORM & SPHERICAL SPIRAL DYNAMICS
        // Update spherical coordinates
        const r = Math.sqrt(newX * newX + newY * newY + newZ * newZ);
        const theta = Math.acos(newZ / (r + 0.001)); // Polar angle from z-axis
        const phi = Math.atan2(newY, newX); // Azimuthal angle

        polarAngle.current[i] = theta;
        azimuthalAngle.current[i] = phi;

        // POLAR POLARIZATION - Particles align toward poles
        // Creates vertical component to spiral motion
        const polarizationStrength = 0.015;
        const distFromEquator = Math.abs(theta - Math.PI / 2); // Distance from equatorial plane

        // Polarization force toward nearest pole (north or south)
        const polarDirection = theta < Math.PI / 2 ? -1 : 1; // North or south
        const polarForce = polarizationStrength * Math.sin(distFromEquator * 2);

        // Apply polar transform (moves particles toward/away from poles)
        const polarVelocity = polarForce * polarDirection;
        newZ += polarVelocity * Math.cos(time * 0.5 + phi * 3);

        // SPHERICAL SPIRAL DYNAMICS - 3D spirals on disk surface
        // Combines azimuthal rotation with polar motion
        const sphericalSpiralTightness = 0.5;
        const sphericalArmPattern = Math.sin(3 * phi - sphericalSpiralTightness * theta - time * 0.4);

        // Radial pulsation from spherical spiral
        const radialPulse = sphericalArmPattern * 0.02;
        newX *= (1.0 + radialPulse);
        newY *= (1.0 + radialPulse);

        // Vertical component from spherical spiral (creates 3D helix)
        const verticalSpiral = Math.cos(phi * 5 + theta * 3 - time * 0.3) * 0.01;
        newZ += verticalSpiral * Math.sin(distFromEquator);

        // ANGULAR MOMENTUM CONSERVATION
        // L = r × v must be conserved
        const currentL = Math.sqrt(newX * newX + newY * newY) * Math.sqrt(vels[i3] * vels[i3] + vels[i3 + 1] * vels[i3 + 1]);
        const targetL = angularMomentum.current[i];

        // Adjust velocities to conserve angular momentum
        if (currentL > 0.001) {
          const lFactor = targetL / currentL;
          vels[i3] *= lFactor;
          vels[i3 + 1] *= lFactor;
        }

        // TRANSFORM FUNCTION - Coordinate transformation for z-axis symmetry
        // Apply rotation around z-axis based on angular momentum
        const rotationRate = angularMomentum.current[i] / (r * r + 0.1);
        const deltaAngle = rotationRate * 0.01;

        // Rotate position in xy-plane
        const cosDA = Math.cos(deltaAngle);
        const sinDA = Math.sin(deltaAngle);
        const rotatedX = newX * cosDA - newY * sinDA;
        const rotatedY = newX * sinDA + newY * cosDA;

        newX = rotatedX;
        newY = rotatedY;

        // SPHERICAL BREATHING MODES - Entire disk pulsates spherically
        // Like a beating heart or oscillating sphere
        const breathingFrequency = 0.8;
        const breathingAmplitude = 0.015;
        const breathingPhase = Math.sin(time * breathingFrequency + phi * 2);
        const breathing = breathingPhase * breathingAmplitude;

        // Apply breathing to all coordinates (radial expansion/contraction)
        newX *= (1.0 + breathing);
        newY *= (1.0 + breathing);
        newZ *= (1.0 + breathing);

        // SPHERICAL HARMONIC OSCILLATIONS
        // Y_l^m spherical harmonics create complex 3D patterns
        const l = 2; // Degree
        const m = 1; // Order
        const harmonicPattern = Math.sin(l * theta) * Math.cos(m * phi + time * 0.6);
        const harmonicDisplacement = harmonicPattern * 0.012;

        // Apply harmonic displacement in radial direction
        const radialNorm = Math.sqrt(newX * newX + newY * newY + newZ * newZ);
        if (radialNorm > 0.01) {
          newX += (newX / radialNorm) * harmonicDisplacement;
          newY += (newY / radialNorm) * harmonicDisplacement;
          newZ += (newZ / radialNorm) * harmonicDisplacement;
        }

        // MERIDIONAL CIRCULATION - Flow in θ direction
        // Creates north-south circulation patterns
        const meridionalSpeed = 0.008 * Math.sin(phi * 3 - time * 0.5);
        const meridionalFlow = meridionalSpeed * Math.sin(theta);

        // Convert meridional flow to Cartesian
        // Flow in θ direction: ∂/∂θ
        const dTheta = meridionalFlow;
        newZ += dTheta * Math.sin(theta);

        // VORTEX STRUCTURES - Localized rotating vortices
        const vortexFreq = 4.0;
        const vortexScale = 0.01;
        const vortexPattern = Math.sin(vortexFreq * phi - time * 2.0) * Math.cos(vortexFreq * theta);
        const vortexStrength = vortexPattern * vortexScale;

        // Apply vortex rotation
        newX += vortexStrength * Math.sin(phi + Math.PI / 2);
        newY += vortexStrength * Math.cos(phi + Math.PI / 2);

        // PARTICLE TRAIL UPDATE
        // Shift trail positions (oldest trail point gets discarded)
        for (let t = TRAIL_LENGTH - 1; t > 0; t--) {
          const trailIdx = i * TRAIL_LENGTH + t;
          const prevIdx = i * TRAIL_LENGTH + (t - 1);

          trailPositions.current[trailIdx * 3] = trailPositions.current[prevIdx * 3];
          trailPositions.current[trailIdx * 3 + 1] = trailPositions.current[prevIdx * 3 + 1];
          trailPositions.current[trailIdx * 3 + 2] = trailPositions.current[prevIdx * 3 + 2];
          trailAges.current[trailIdx] = (t / TRAIL_LENGTH);
        }

        // Set newest trail position to current particle position
        const trailIdx = i * TRAIL_LENGTH;
        trailPositions.current[trailIdx * 3] = positions[i3];
        trailPositions.current[trailIdx * 3 + 1] = positions[i3 + 1];
        trailPositions.current[trailIdx * 3 + 2] = positions[i3 + 2];
        trailAges.current[trailIdx] = 0;

        // BOUNDARY CONSTRAINTS - Keep particles within accretion disk
        if (newRadius < INNER_RADIUS || newRadius > OUTER_RADIUS || distToCenter < EVENT_HORIZON) {
          // Particle has escaped bounds or fell into black hole - respawn it
          const spawnRadius = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS);
          const spawnAngle = Math.random() * Math.PI * 2;

          // Respawn with thickness distribution
          const maxThickness = 0.08 + (spawnRadius - 0.9) / 2.5 * 0.25;
          const thicknessRandom = (Math.random() - 0.5) * 2;
          const verticalDist = Math.sign(thicknessRandom) * Math.pow(Math.abs(thicknessRandom), 0.7);
          const thickness = verticalDist * maxThickness;

          positions[i3] = Math.cos(spawnAngle) * spawnRadius;
          positions[i3 + 1] = Math.sin(spawnAngle) * spawnRadius;
          positions[i3 + 2] = thickness;

          // Reset velocity with initial orbital speed
          const initialSpeed = 0.015 / Math.sqrt(spawnRadius);
          vels[i3] = -Math.sin(spawnAngle) * initialSpeed;
          vels[i3 + 1] = Math.cos(spawnAngle) * initialSpeed;
          vels[i3 + 2] = 0;
        } else {
          // Apply spiral density wave to radius
          const finalRadius = newRadius * (1.0 + totalSpiralEffect);
          const newAngle = Math.atan2(newY, newX);

          positions[i3] = Math.cos(newAngle) * finalRadius;
          positions[i3 + 1] = Math.sin(newAngle) * finalRadius;
          positions[i3 + 2] = newZ;
        }
      }

      posAttr.needsUpdate = true;
    }

    // Inner super-hot disk layer - PHOTON DISK with extreme relativistic effects
    if (innerDiskRef.current) {
      const posAttr = innerDiskRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;
      const vels = innerDiskVelocities.current;

      // Photon disk boundaries - very close to event horizon
      const PHOTON_INNER_RADIUS = 0.78;  // Just above event horizon
      const PHOTON_OUTER_RADIUS = 1.08;  // Photon sphere boundary
      const EVENT_HORIZON = 0.75;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const radius = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);
        const distToCenter = Math.sqrt(x * x + y * y + z * z);

        // EXTREME GRAVITATIONAL ATTRACTION - Much stronger near event horizon
        const gravityStrength = 0.0012; // 4x stronger than outer disk
        const gravityForce = gravityStrength / (distToCenter * distToCenter + 0.01);

        // Direction toward black hole
        const dirX = -x / distToCenter;
        const dirY = -y / distToCenter;
        const dirZ = -z / distToCenter;

        // Apply strong gravitational pull
        vels[i] += dirX * gravityForce;
        vels[i + 1] += dirY * gravityForce;
        vels[i + 2] += dirZ * gravityForce;

        // RELATIVISTIC VELOCITY - Near speed of light at photon sphere
        // Photon sphere: v = c/sqrt(3) ≈ 0.577c
        const relativisticSpeed = 0.035 / Math.sqrt(radius + 0.02);

        // Add tangential orbital velocity
        vels[i] += -y * relativisticSpeed;
        vels[i + 1] += x * relativisticSpeed;

        // Extreme frame-dragging near event horizon (Kerr metric)
        const extremeFrameDrag = 0.008 / (radius * radius + 0.01);
        vels[i] += -y * extremeFrameDrag;
        vels[i + 1] += x * extremeFrameDrag;

        // Less damping in photon disk (more chaotic)
        vels[i] *= 0.992;
        vels[i + 1] *= 0.992;
        vels[i + 2] *= 0.994;

        // Update position
        let newX = x + vels[i];
        let newY = y + vels[i + 1];
        let newZ = z + vels[i + 2];

        // Intense turbulence near ISCO (innermost stable circular orbit)
        const turbulence = Math.sin(time * 5 + i * 0.1) * 0.015;
        newX += Math.cos(angle + time) * turbulence;
        newY += Math.sin(angle + time) * turbulence;

        // Vertical chaos from magnetic reconnection
        const verticalChaos = Math.sin(time * 6 + i * 0.2) * 0.012;
        newZ += verticalChaos;

        const newRadius = Math.sqrt(newX * newX + newY * newY);

        // PHOTON DISK BOUNDARY ENFORCEMENT
        if (newRadius < PHOTON_INNER_RADIUS || newRadius > PHOTON_OUTER_RADIUS || distToCenter < EVENT_HORIZON) {
          // Respawn in photon disk region
          const spawnRadius = PHOTON_INNER_RADIUS + Math.random() * (PHOTON_OUTER_RADIUS - PHOTON_INNER_RADIUS);
          const spawnAngle = Math.random() * Math.PI * 2;
          const thickness = (Math.random() - 0.5) * 0.04; // Very thin disk

          positions[i] = Math.cos(spawnAngle) * spawnRadius;
          positions[i + 1] = Math.sin(spawnAngle) * spawnRadius;
          positions[i + 2] = thickness;

          // Reset with high initial velocity
          const initialSpeed = 0.03 / Math.sqrt(spawnRadius);
          vels[i] = -Math.sin(spawnAngle) * initialSpeed;
          vels[i + 1] = Math.cos(spawnAngle) * initialSpeed;
          vels[i + 2] = 0;
        } else {
          positions[i] = newX;
          positions[i + 1] = newY;
          positions[i + 2] = newZ;
        }
      }

      posAttr.needsUpdate = true;
    }

    // Polar jets - BLANDFORD-ZNAJEK POWERED with PENROSE TWISTOR ACCELERATION
    if (polarJetsRef.current) {
      const posAttr = polarJetsRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        const data = jetData[i];
        if (!data) continue;

        const direction = i < jetData.length / 2 ? 1 : -1;

        // PENROSE TWISTOR ACCELERATION
        // Twistor theory: particles follow null geodesics in complexified spacetime
        // Acceleration increases with height due to magnetic field energy extraction
        const twistorPhase = time * 2.0 + data.angle * 3.0 + data.height * 1.5;
        const twistorField = Math.sin(twistorPhase) * 0.5 + 0.5;

        // Relativistic acceleration (approaches speed of light)
        const baseSpeed = data.speed;
        const twistorBoost = 1.0 + twistorField * 0.5; // Boost up to 1.5x
        const relativisticSpeed = baseSpeed * twistorBoost * (1.0 + data.height * 0.1);

        // Move particles upward along jet with acceleration
        let height = data.height + relativisticSpeed;

        // JET TRANSFORMS - particles recycle through ergosphere
        if (height > 4) {
          // Particle reaches end of jet, returns energy to black hole
          height = 0;
          // Randomize new trajectory slightly
          data.angle = data.angle + (Math.random() - 0.5) * 0.3;
          data.speed = 0.02 + Math.random() * 0.03; // Reset with new energy
        }

        data.height = height;

        // MAGNETIC COLLIMATION - Blandford-Znajek mechanism
        // Initial collimation near black hole, then expansion at larger scales
        const collimationStrength = Math.exp(-height * 0.5); // Exponential decay
        const collimatedRadius = 0.05 * (1.0 - collimationStrength * 0.7);

        // Expansion due to radiation pressure and particle interactions
        const expansion = height > 1 ? (height - 1) * 0.15 : 0;

        // Total jet radius with magnetic pinching
        const jetRadius = collimatedRadius + expansion;

        // HELICAL MAGNETIC FIELD STRUCTURE
        // Toroidal and poloidal components create helical pattern
        const helixAngle = data.angle + height * 2.5; // Magnetic field winding
        // Helix amplitude: jetRadius * (0.3 + sin(1.5t + 3h) * 0.2)

        // Penrose process contribution (energy extraction from ergosphere)
        const penroseRadius = jetRadius * (1.0 + twistorField * 0.15);

        // HOLOGRAPHIC PROJECTION - particles trace out holographic boundary
        // Information encoded on 2D surface projects to 3D jet structure
        const holographicAngle = helixAngle + Math.sin(time * 3.0 + height * 2.0) * 0.4;
        const holographicRadius = penroseRadius * (1.0 + Math.cos(time * 2.5 - height * 4.0) * 0.1);

        positions[i3] = Math.cos(holographicAngle) * holographicRadius;
        positions[i3 + 1] = Math.sin(holographicAngle) * holographicRadius;
        positions[i3 + 2] = (0.8 + height) * direction;

        // Add chaotic perturbations from turbulent plasma
        if (height < 0.5) {
          // Near launch point, strong turbulence
          const turbulence = Math.sin(time * 10 + i * 0.5) * 0.02;
          positions[i3] += turbulence;
          positions[i3 + 1] += turbulence * 0.8;
        }
      }

      posAttr.needsUpdate = true;
    }

    // HOLOGRAPHIC PHOTON DISK - Information-theoretic animation
    if (holographicDiskRef.current) {
      const posAttr = holographicDiskRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const radius = Math.sqrt(x * x + y * y + z * z);
        const angle = Math.atan2(y, x);
        const phi = Math.acos(z / radius);

        // HOLOGRAPHIC PRINCIPLE: Information oscillates on 2D surface
        // Quantum fluctuations create patterns (5.0 Hz frequency)
        const quantumFluctuation = Math.sin(time * 3.0 + angle * 7.0 + phi * 5.0) * 0.015;

        // Spherical harmonic patterns (like atomic orbitals)
        const l = 3; // Angular momentum quantum number
        const m = 2; // Magnetic quantum number
        const sphericalHarmonic = Math.sin(l * phi) * Math.cos(m * angle + time * 2.0);

        // Radius pulsation with quantum signature
        const photonSphereRadius = 1.125;
        const newRadius = photonSphereRadius * (1.0 + quantumFluctuation + sphericalHarmonic * 0.01);

        // Update positions on holographic shell
        positions[i] = newRadius * Math.sin(phi) * Math.cos(angle);
        positions[i + 1] = newRadius * Math.sin(phi) * Math.sin(angle);
        positions[i + 2] = newRadius * Math.cos(phi);
      }

      posAttr.needsUpdate = true;

      // Rotate holographic shell slowly (frame-dragging effect)
      holographicDiskRef.current.rotation.z += 0.002;
    }

    // MAGNETIC FIELD LINES - Animate with field oscillations
    if (magneticFieldLinesRef.current) {
      const posAttr = magneticFieldLinesRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      const numLines = 50;
      const pointsPerLine = 60;

      for (let lineIdx = 0; lineIdx < numLines; lineIdx++) {
        const linePhase = (lineIdx / numLines) * Math.PI * 2;

        for (let pointIdx = 0; pointIdx < pointsPerLine; pointIdx++) {
          const i3 = (lineIdx * pointsPerLine + pointIdx) * 3;
          const t = pointIdx / pointsPerLine;

          // Magnetic field oscillation (Alfvén waves)
          const waveAmplitude = 0.02;
          const waveFrequency = 2.0;
          const alfvenWave = Math.sin(time * waveFrequency - t * 10.0 + linePhase) * waveAmplitude;

          // Apply wave perturbation
          const baseX = positions[i3];
          const baseY = positions[i3 + 1];
          const angle = Math.atan2(baseY, baseX);

          positions[i3] += Math.cos(angle + Math.PI / 2) * alfvenWave;
          positions[i3 + 1] += Math.sin(angle + Math.PI / 2) * alfvenWave;

          // Vertical wave propagation (energy transport)
          positions[i3 + 2] += Math.sin(time * 3.0 + t * 8.0) * 0.01;
        }
      }

      posAttr.needsUpdate = true;
    }

    // PARTICLE TRAILS - Update shader and geometry
    if (particleTrailsRef.current) {
      const material = particleTrailsRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Update trail geometry positions (already updated in main disk loop)
      const posAttr = particleTrailsRef.current.geometry.attributes.position;
      posAttr.needsUpdate = true;

      const ageAttr = particleTrailsRef.current.geometry.attributes.age as THREE.BufferAttribute;
      ageAttr.needsUpdate = true;
    }

    // Update star trail shader and geometry
    if (starTrailsRef.current) {
      const material = starTrailsRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Update star trail geometry positions (already updated in star orbit loop)
      const posAttr = starTrailsRef.current.geometry.attributes.position;
      posAttr.needsUpdate = true;

      const ageAttr = starTrailsRef.current.geometry.attributes.age as THREE.BufferAttribute;
      ageAttr.needsUpdate = true;
    }

    // Update star positions geometry
    if (orbitingStarsRef.current) {
      const posAttr = orbitingStarsRef.current.geometry.attributes.position;
      posAttr.needsUpdate = true;
    }
  });

  // Enhanced event horizon shader with gravitational lensing
  const eventHorizonShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      isLightMode: { value: theme === 'light' }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDistortion;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;

        // World position for lensing calculations
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;

        // Gravitational distortion effect
        float distortionAmount = 0.02;
        float pulse = sin(time * 0.5) * 0.5 + 0.5;
        vDistortion = pulse;

        // Slight vertex displacement for warping effect
        vec3 distortedPosition = position + normal * distortionAmount * pulse * 0.1;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform bool isLightMode;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDistortion;

      // Noise function for procedural effects
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
      }

      // Fractal Brownian Motion for complex patterns
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        // Calculate view direction
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);

        // Multi-layer Fresnel effects for depth
        float fresnel1 = 1.0 - abs(dot(viewDir, vNormal));
        float fresnel2 = pow(fresnel1, 2.0);  // Sharper inner edge
        float fresnel3 = pow(fresnel1, 3.5);  // Even sharper core
        float fresnel4 = pow(fresnel1, 5.0);  // Ultra-sharp center

        // GRAVITATIONAL LENSING RINGS - Multiple visible rings
        float lensingRing1 = smoothstep(0.3, 0.4, fresnel1) * smoothstep(0.5, 0.4, fresnel1);
        float lensingRing2 = smoothstep(0.5, 0.6, fresnel1) * smoothstep(0.7, 0.6, fresnel1);
        float lensingRing3 = smoothstep(0.7, 0.8, fresnel1) * smoothstep(0.9, 0.8, fresnel1);

        // Animated ring pulsing
        float pulse1 = sin(time * 1.5 + fresnel1 * 10.0) * 0.5 + 0.5;
        float pulse2 = sin(time * 2.0 - fresnel1 * 8.0) * 0.5 + 0.5;
        float pulse3 = sin(time * 2.5 + fresnel1 * 12.0) * 0.5 + 0.5;

        lensingRing1 *= pulse1 * 1.8;
        lensingRing2 *= pulse2 * 2.2;
        lensingRing3 *= pulse3 * 2.5;

        // Color shifting based on angle and time
        float angleShift = atan(vPosition.y, vPosition.x) / 3.14159;
        float timeShift = sin(time * 0.3) * 0.5 + 0.5;

        // Procedural caustic patterns (like light through water)
        vec3 causticPos = vWorldPosition * 3.0 + vec3(time * 0.2);
        float caustic = fbm(causticPos);
        caustic = pow(caustic, 2.0) * fresnel2 * 0.4;

        // Theme-based colors with enhanced palette
        vec3 lensingColor1, lensingColor2, lensingColor3, coreColor, photonColor, atmosphereColor;

        if (isLightMode) {
          // Light mode: Bright celestial colors
          lensingColor1 = vec3(1.0, 0.85, 0.3);  // Bright gold
          lensingColor2 = vec3(0.95, 0.7, 0.15); // Orange-gold
          lensingColor3 = vec3(0.8, 0.5, 0.1);   // Deep amber
          coreColor = vec3(0.98, 0.97, 0.95);    // Almost white
          photonColor = vec3(0.4, 0.35, 0.15);   // Dark gold ring
          atmosphereColor = vec3(0.9, 0.8, 0.5); // Golden atmosphere
        } else {
          // Dark mode: ULTRAVIOLET SPECTRUM - Extreme high-energy colors
          lensingColor1 = vec3(1.4, 0.3, 2.2);   // Deep UV violet
          lensingColor2 = vec3(0.5, 1.2, 2.8);   // UV electric blue
          lensingColor3 = vec3(1.8, 0.5, 2.4);   // UV magenta
          coreColor = vec3(0.002, 0.001, 0.005); // Deep void black
          photonColor = vec3(2.2, 2.0, 2.8);     // White-hot UV
          atmosphereColor = vec3(1.0, 0.4, 2.0); // UV violet atmosphere
        }

        // Complex color mixing with multiple layers
        vec3 colorA = mix(lensingColor1, lensingColor2, sin(angleShift * 3.0 + time * 0.2) * 0.5 + 0.5);
        vec3 colorB = mix(lensingColor2, lensingColor3, cos(angleShift * 2.0 - time * 0.15) * 0.5 + 0.5);
        vec3 colorC = mix(lensingColor1, lensingColor3, sin(angleShift * 4.0 + time * 0.1) * 0.5 + 0.5);
        vec3 edgeColor = mix(mix(colorA, colorB, timeShift), colorC, fresnel3);

        // VOLUMETRIC ATMOSPHERIC GLOW - Multiple layers
        float atmosphere1 = pow(fresnel2, 1.5) * 0.6;  // Outer atmosphere
        float atmosphere2 = pow(fresnel3, 1.8) * 0.8;  // Mid atmosphere
        float atmosphere3 = pow(fresnel4, 2.0) * 1.0;  // Inner atmosphere

        // PHOTON SPHERE - Ultra-bright ring with better definition
        float photonSphere = smoothstep(0.50, 0.60, fresnel1) * smoothstep(0.75, 0.60, fresnel1);
        photonSphere *= (sin(time * 2.5 + angleShift * 12.0) * 0.25 + 0.75);
        photonSphere = pow(photonSphere, 1.5) * 2.5; // Amplified brightness

        // GRAVITATIONAL REDSHIFT EFFECT - Color shifts with depth
        float redshift = 1.0 - fresnel1;
        vec3 redshiftColor = mix(vec3(1.0), vec3(1.3, 0.7, 0.5), redshift * 0.3);

        // Build final color with enhanced layering
        vec3 finalColor = coreColor;

        // Add atmospheric layers
        finalColor += atmosphereColor * atmosphere1 * (isLightMode ? 0.4 : 0.8);
        finalColor += edgeColor * atmosphere2 * (isLightMode ? 0.6 : 1.2);
        finalColor += edgeColor * atmosphere3 * (isLightMode ? 0.8 : 1.5);

        // Add lensing rings
        finalColor += edgeColor * lensingRing1 * (isLightMode ? 1.0 : 1.5);
        finalColor += edgeColor * lensingRing2 * (isLightMode ? 1.2 : 1.8);
        finalColor += edgeColor * lensingRing3 * (isLightMode ? 1.4 : 2.0);

        // Add ultra-bright photon sphere
        finalColor += photonColor * photonSphere;

        // Add caustic patterns
        finalColor += edgeColor * caustic * (isLightMode ? 0.5 : 1.0);

        // Apply gravitational redshift
        finalColor *= redshiftColor;

        // Procedural noise for quantum fluctuations
        vec3 noisePos = vWorldPosition * 8.0 + vec3(time * 0.5);
        float quantumNoise = noise(noisePos) * fresnel2 * 0.03;
        finalColor += (isLightMode ? vec3(0.6, 0.5, 0.3) : vec3(0.8, 0.7, 1.0)) * quantumNoise;

        // HAWKING RADIATION - High-energy quantum emission
        float hawkingGlow = pow(fresnel4, 1.5) * 0.25 * (sin(time * 3.5) * 0.4 + 0.6);
        if (isLightMode) {
          finalColor += vec3(0.7, 0.6, 0.4) * hawkingGlow;
        } else {
          // UV Hawking radiation
          vec3 hawkingUV = vec3(1.6, 1.4, 2.5); // White-hot UV
          finalColor += hawkingUV * hawkingGlow * 1.2;
        }

        // UV ENERGY CORONA - Brilliant high-frequency emission
        if (!isLightMode) {
          float uvCorona = pow(fresnel3, 2.5) * (sin(time * 7.0 + angleShift * 20.0) * 0.3 + 0.7);
          vec3 uvCoronaColor = mix(
            vec3(1.8, 0.6, 2.5),  // UV magenta
            vec3(0.6, 1.5, 2.8),  // UV cyan
            sin(time * 4.0) * 0.5 + 0.5
          );
          finalColor += uvCoronaColor * uvCorona * 0.4;
        }

        // Edge brightening with UV enhancement
        float edgeBrightness = pow(fresnel2, 1.2) * 0.5;
        finalColor += edgeColor * edgeBrightness;

        // CHROMATIC ABERRATION - UV spectrum dispersion
        float aberration = fresnel3 * (isLightMode ? 0.15 : 0.25);
        if (!isLightMode) {
          // Enhanced UV chromatic aberration
          finalColor.r += aberration * 0.8;
          finalColor.g += aberration * 0.4;
          finalColor.b += aberration * 1.2; // Strong blue shift
        } else {
          finalColor.r += aberration * 0.3;
          finalColor.b += aberration * 0.2;
        }

        // X-RAY FLASH effect (high-energy bursts)
        if (!isLightMode) {
          float xrayFlash = sin(time * 20.0 + angleShift * 15.0) * 0.5 + 0.5;
          xrayFlash = pow(xrayFlash, 10.0); // Sharp pulses
          vec3 xrayColor = vec3(2.5, 2.5, 3.0); // Ultra-high energy white
          finalColor += xrayColor * xrayFlash * fresnel4 * 0.3;
        }

        // Final HDR-ready output with overbright values
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), [theme]);

  // Advanced accretion disk shader with Kip Thorne physics
  const accretionDiskShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      enableDoppler: { value: enableDopplerShift },
      enableLensing: { value: enableGravitationalLensing },
      blackHoleMass: { value: 1.0 },
      pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
    },
    vertexShader: `
      uniform float time;
      uniform float blackHoleMass;
      uniform bool enableLensing;
      uniform float pixelRatio;

      attribute vec3 color;

      varying vec3 vColor;
      varying float vVelocity;
      varying float vDistance;
      varying float vLensingFactor;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vViewDirection;

      // Schwarzschild radius for gravitational calculations
      const float schwarzschildRadius = 0.75;
      const float G = 1.0; // Gravitational constant (normalized)
      const float c = 1.0; // Speed of light (normalized)

      void main() {
        vColor = color;
        vPosition = position;

        // Calculate distance from black hole center
        float r = length(position);
        vDistance = r;

        // Calculate orbital velocity (Keplerian)
        vec3 tangentialDir = normalize(vec3(-position.y, position.x, 0.0));
        float orbitalSpeed = sqrt(G * blackHoleMass / r);
        vec3 velocity = tangentialDir * orbitalSpeed;

        // Store velocity magnitude for Doppler shift
        vec3 viewDir = normalize(cameraPosition - position);
        vViewDirection = viewDir;
        vVelocity = dot(velocity, viewDir);

        vec3 finalPosition = position;

        if (enableLensing) {
          // Kip Thorne gravitational lensing - ENHANCED
          // Calculate impact parameter (closest approach distance for light ray)
          float impactParameter = r * sin(acos(clamp(dot(normalize(position), normalize(cameraPosition)), -1.0, 1.0)));

          // Einstein deflection angle: α = 4GM/(c²·b) - AMPLIFIED
          float deflectionAngle = (4.0 * G * blackHoleMass) / (c * c * max(impactParameter, 0.01));

          // Enhanced gravitational potential well warping
          float gravitationalPotential = -G * blackHoleMass / (r + schwarzschildRadius * 0.1);
          float warpingFactor = gravitationalPotential * 0.25; // Increased from 0.15

          // Frame-dragging effect (Kerr metric) - ENHANCED spacetime rotation
          float frameDragging = (schwarzschildRadius / r) * sin(time * 0.2 + r);
          frameDragging *= 1.5; // Amplify frame-dragging

          // Apply lensing displacement perpendicular to radial direction
          vec3 radialDir = normalize(position);
          vec3 perpDir = cross(radialDir, vec3(0.0, 0.0, 1.0));
          if (length(perpDir) < 0.01) {
            perpDir = cross(radialDir, vec3(0.0, 1.0, 0.0));
          }
          perpDir = normalize(perpDir);

          // Apply combined gravitational effects - ENHANCED
          finalPosition += perpDir * deflectionAngle * 0.5; // Increased from 0.3
          finalPosition += radialDir * warpingFactor;
          finalPosition.xy += vec2(-finalPosition.y, finalPosition.x) * frameDragging * 0.08; // Increased from 0.05

          // Store lensing factor for brightness enhancement
          vLensingFactor = deflectionAngle * 2.0; // Amplified
        } else {
          vLensingFactor = 0.0;
        }

        // World position for camera-reactive effects
        vWorldPosition = (modelMatrix * vec4(finalPosition, 1.0)).xyz;

        // Project to screen space
        vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Point size - LARGER for visible 3D particles (like holographic sphere)
        float pointSize = (10.0 / -mvPosition.z) * pixelRatio; // Increased for distinct particle visibility
        gl_PointSize = pointSize * (1.0 + vLensingFactor * 0.3); // Sharper lensing effect
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform bool enableDoppler;

      varying vec3 vColor;
      varying float vVelocity;
      varying float vDistance;
      varying float vLensingFactor;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vViewDirection;

      const float c = 1.0; // Speed of light
      const float innerRadius = 0.8;  // Inner edge of accretion disk
      const float photonSphere = 1.125; // Photon sphere at 1.5 * Schwarzschild radius

      void main() {
        // Circular particle shape with SHARP falloff for 3D definition
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        // SHARP edges with bright core for distinct 3D particles
        float alpha = 1.0 - smoothstep(0.25, 0.5, dist); // Sharper edges
        alpha = pow(alpha, 2.0); // Steeper falloff for definition

        // BRIGHT CORE - Makes each particle visible and distinct
        float coreBrightness = 1.0 - smoothstep(0.0, 0.15, dist);
        coreBrightness = pow(coreBrightness, 3.0); // Very sharp core

        vec3 finalColor = vColor;
        float brightness = 1.0;

        // TEMPERATURE-BASED EMISSION (Wien's law approximation)
        // Closer to event horizon = hotter = more energetic
        float temperature = 1.0 / (vDistance + 0.3); // Inverse distance temperature
        temperature = pow(temperature, 1.5);

        // ULTRAVIOLET TEMPERATURE SPECTRUM - Extreme energy visualization
        // Black body radiation extended into UV spectrum
        vec3 temperatureColor = vec3(1.0);

        // UV spectrum colors for extreme energy
        vec3 uvUltraviolet = vec3(1.4, 0.6, 2.5);   // Deep UV
        vec3 uvViolet = vec3(1.6, 0.4, 2.2);        // Violet
        vec3 uvWhiteHot = vec3(2.0, 1.8, 2.5);      // White-hot UV
        vec3 uvElectricBlue = vec3(0.8, 1.2, 2.8);  // Electric blue
        vec3 uvCyan = vec3(0.6, 2.2, 2.5);          // UV cyan

        if (temperature > 0.9) {
          // ULTRA-extreme: White-hot UV emission
          temperatureColor = uvWhiteHot * (1.0 + temperature * 1.2);
        } else if (temperature > 0.75) {
          // Extreme: UV electric blue
          float t = (temperature - 0.75) / 0.15;
          temperatureColor = mix(uvElectricBlue, uvWhiteHot, t) * (1.0 + temperature * 0.8);
        } else if (temperature > 0.6) {
          // Very hot: UV cyan
          float t = (temperature - 0.6) / 0.15;
          temperatureColor = mix(uvCyan, uvElectricBlue, t) * (1.0 + temperature * 0.6);
        } else if (temperature > 0.4) {
          // Hot: Deep violet
          float t = (temperature - 0.4) / 0.2;
          temperatureColor = mix(uvViolet, uvCyan, t) * (1.0 + temperature * 0.4);
        } else {
          // Warm: Ultraviolet to orange transition
          float t = temperature / 0.4;
          vec3 warmOrange = vec3(1.3, 0.8, 0.5);
          temperatureColor = mix(warmOrange, uvUltraviolet, t) * (1.0 + temperature * 0.3);
        }

        // PHOTON SPHERE LIGHTING - Brightest ring at 1.5 * Schwarzschild radius
        float photonProximity = 1.0 - abs(vDistance - photonSphere) / 0.3;
        photonProximity = clamp(photonProximity, 0.0, 1.0);
        photonProximity = pow(photonProximity, 3.0);

        // Photon sphere emission boost (ultra-bright)
        float photonEmission = photonProximity * 3.5;
        brightness += photonEmission;

        // Add photon sphere color tint (bright white-blue)
        finalColor = mix(finalColor, vec3(1.0, 0.95, 1.1), photonProximity * 0.6);

        if (enableDoppler) {
          // Relativistic Doppler shift - ENHANCED
          float beta = vVelocity * 0.5;

          // Doppler factor: δ = sqrt((1-β)/(1+β))
          float dopplerFactor = sqrt((1.0 - beta) / (1.0 + beta));

          // Relativistic beaming - AMPLIFIED
          float beamingFactor = 1.0 / pow(dopplerFactor, 3.0);
          brightness *= (0.2 + beamingFactor * 0.8); // Enhanced contrast

          // Enhanced blue-shift/red-shift
          if (beta > 0.0) {
            // Approaching - strong blue shift with brightness boost
            finalColor *= vec3(0.85, 0.92, 1.3) * (1.0 + beta * 0.5);
          } else {
            // Receding - strong red shift with dimming
            finalColor *= vec3(1.3, 0.85, 0.7) * (1.0 - abs(beta) * 0.3);
          }
        }

        // GRAVITATIONAL LENSING BRIGHTNESS - MASSIVELY ENHANCED
        brightness *= (1.0 + vLensingFactor * 4.0); // Increased from 2.0

        // Camera-reactive rim lighting (edge glow when viewed from an angle)
        vec3 normal = normalize(vec3(vPosition.xy, 0.1)); // Approximate disk normal
        float rim = 1.0 - abs(dot(vViewDirection, normal));
        rim = pow(rim, 2.0);
        brightness += rim * 0.8;

        // PARTICLE CORE DEFINITION - Bright center for 3D effect
        float particleCoreGlow = 1.0 - dist * 2.0;
        particleCoreGlow = pow(max(particleCoreGlow, 0.0), 3.0);

        // Inner disk extreme brightness
        float innerBoost = smoothstep(1.2, 0.8, vDistance) * 2.5;
        brightness += innerBoost;

        // Apply temperature-based emission
        finalColor *= temperatureColor;

        // Apply overall brightness
        finalColor *= brightness;

        // Add DEFINED PARTICLE CORE - Makes each particle look 3D and distinct
        vec3 particleCore = mix(
          temperatureColor * 1.5,  // Temperature-based core
          vec3(2.5, 2.3, 2.8),     // Brilliant white center
          coreBrightness * 0.6
        );
        finalColor += particleCore * coreBrightness * 0.8;

        // REDUCED UV CORE BLOOM - Less intense to avoid noise
        vec3 uvCoreGlow = mix(
          vec3(1.5, 1.4, 1.8),  // Softer white-UV
          vec3(0.8, 1.2, 2.2),  // Electric blue
          particleCoreGlow * 0.5
        );
        finalColor += uvCoreGlow * particleCoreGlow * 0.5; // Reduced intensity

        // SUBTLE ENERGY PULSE - Reduced for clarity (not noise)
        float energyPulse1 = sin(time * 3.0 + vDistance * 5.0) * 0.5 + 0.5;
        float energyPulse2 = sin(time * 7.0 - vDistance * 8.0) * 0.5 + 0.5;

        // Simplified pulse for less visual noise
        float combinedPulse = (energyPulse1 * 0.6 + energyPulse2 * 0.4);

        // REDUCED UV pulse emission - subtle enhancement only
        vec3 uvPulseColor = mix(
          vec3(1.2, 0.4, 1.6),  // Softer violet
          vec3(0.6, 1.4, 1.8),  // Softer cyan
          combinedPulse
        );
        finalColor += uvPulseColor * combinedPulse * 0.08 * temperature; // Much reduced

        // SUBTLE GAMMA RAY BURST - Only innermost regions, very reduced
        if (vDistance < 0.95) {
          float gammaIntensity = (0.95 - vDistance) * 1.5;
          vec3 gammaColor = vec3(1.8, 1.7, 2.0); // Softer white
          float gammaBurst = sin(time * 15.0) * 0.5 + 0.5;
          finalColor += gammaColor * gammaIntensity * gammaBurst * 0.15; // Much reduced
        }

        // REDUCED CHERENKOV RADIATION - Subtle accent only
        float cherenkovAngle = atan(vPosition.y, vPosition.x);
        float cherenkovPattern = sin(cherenkovAngle * 8.0 - time * 10.0) * 0.5 + 0.5;
        vec3 cherenkovBlue = vec3(0.4, 0.9, 2.0); // Softer blue
        finalColor += cherenkovBlue * cherenkovPattern * 0.05 * temperature; // Much reduced

        // SUBTLE PARTICLE HALO - Not corona, just soft edge glow
        float halo = smoothstep(0.4, 0.1, dist);
        vec3 haloColor = temperatureColor * 1.2; // Temperature-matched halo
        finalColor += haloColor * halo * temperature * 0.2; // Reduced intensity

        // High dynamic range - allow massive overbright values for extreme energy
        gl_FragColor = vec4(finalColor, alpha * 0.9);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), [enableDopplerShift, enableGravitationalLensing]);

  // Particle Trail Shader - Custom shader for motion trails
  const particleTrailShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
    },
    vertexShader: `
      uniform float time;
      uniform float pixelRatio;
      attribute vec3 color;
      attribute float age;

      varying vec3 vColor;
      varying float vAge;
      varying float vDistance;

      void main() {
        vColor = color;
        vAge = age;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDistance = -mvPosition.z;

        // Trails fade and shrink with age
        float size = (6.0 / vDistance) * pixelRatio * (1.0 - age * 0.7);

        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vColor;
      varying float vAge;
      varying float vDistance;

      void main() {
        // Circular shape
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        // Soft glow with age-based fading
        float alpha = 1.0 - smoothstep(0.15, 0.5, dist);
        alpha = pow(alpha, 1.5);

        // Fade out older trail points
        alpha *= (1.0 - vAge);

        // ULTRAVIOLET SPECTRUM shimmer - high frequency oscillations
        float uvShimmer = sin(time * 8.0 + vAge * 40.0) * 0.3 + 0.7;
        float uvPulse = sin(time * 12.0 - vAge * 30.0) * 0.2 + 0.8;
        alpha *= uvShimmer * uvPulse;

        // ULTRAVIOLET COLOR SHIFT - Top of frequency spectrum
        // Younger trails = white-hot, older = deep violet
        vec3 uvWhite = vec3(1.5, 1.4, 2.0);      // Brilliant white with UV tint
        vec3 uvBlue = vec3(0.4, 0.7, 2.5);       // Electric blue
        vec3 uvViolet = vec3(1.2, 0.3, 2.0);     // Deep violet
        vec3 uvMagenta = vec3(1.8, 0.4, 1.8);    // UV magenta

        // Energy-based color gradient
        float energy = 1.0 - vAge;
        vec3 uvColor;

        if (energy > 0.75) {
          // Ultra-high energy: White-hot
          uvColor = mix(uvWhite, uvBlue, (energy - 0.75) * 4.0);
        } else if (energy > 0.5) {
          // High energy: Electric blue
          uvColor = mix(uvBlue, uvMagenta, (energy - 0.5) * 4.0);
        } else if (energy > 0.25) {
          // Medium energy: UV magenta
          uvColor = mix(uvMagenta, uvViolet, (energy - 0.25) * 4.0);
        } else {
          // Lower energy: Deep violet
          uvColor = mix(uvViolet, vColor * 0.8, energy * 4.0);
        }

        // Combine base color with UV spectrum
        vec3 finalColor = vColor * 0.3 + uvColor * 0.7;
        finalColor *= (0.5 + energy * 0.5);

        // INTENSE CORE GLOW - UV radiation from center
        float coreGlow = 1.0 - dist * 2.0;
        coreGlow = pow(max(coreGlow, 0.0), 3.0);

        // Add brilliant UV core
        finalColor += uvWhite * coreGlow * 0.8 * energy;
        finalColor += uvBlue * coreGlow * 0.5 * energy;

        // Energy pulse rings
        float rings = sin(dist * 20.0 - time * 6.0) * 0.5 + 0.5;
        finalColor += uvMagenta * rings * 0.3 * energy;

        // Chromatic aberration effect (UV dispersion)
        float chromaticShift = dist * 0.1;
        finalColor.r += chromaticShift * energy;
        finalColor.b += chromaticShift * energy * 1.5;

        gl_FragColor = vec4(finalColor, alpha * 0.6);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  // Geometries for all disk components
  const diskGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));
    return geom;
  }, [diskPositions, diskColors]);

  const innerDiskGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(innerDiskPositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(innerDiskColors, 3));
    return geom;
  }, [innerDiskPositions, innerDiskColors]);

  const jetsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(jetColors, 3));
    return geom;
  }, [jetPositions, jetColors]);

  const holographicGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(holographicPositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(holographicColors, 3));
    return geom;
  }, [holographicPositions, holographicColors]);

  const magneticFieldGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(magneticLinePositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(magneticLineColors, 3));
    return geom;
  }, [magneticLinePositions, magneticLineColors]);

  // Particle trail geometry - uses trail positions and ages
  const trailGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(trailPositions.current, 3));
    geom.setAttribute('age', new THREE.BufferAttribute(trailAges.current, 1));

    // Use disk colors for trails (will be updated each frame)
    const trailColors = new Float32Array(trailPositions.current.length);
    for (let i = 0; i < diskColors.length / 3; i++) {
      for (let t = 0; t < TRAIL_LENGTH; t++) {
        const trailIdx = i * TRAIL_LENGTH + t;
        trailColors[trailIdx * 3] = diskColors[i * 3];
        trailColors[trailIdx * 3 + 1] = diskColors[i * 3 + 1];
        trailColors[trailIdx * 3 + 2] = diskColors[i * 3 + 2];
      }
    }
    geom.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    return geom;
  }, [diskColors]);

  // Star trail geometry - orbital paths of stars
  const starTrailGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(starTrailPositions.current, 3));
    geom.setAttribute('age', new THREE.BufferAttribute(starTrailAges.current, 1));
    geom.setAttribute('color', new THREE.BufferAttribute(starTrailColors.current, 3));
    return geom;
  }, []);

  // Star geometry - the orbiting stars themselves
  const starGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    console.log('Star geometry created with', starPositions.length / 3, 'vertices');
    console.log('First star position:', starPositions[0], starPositions[1], starPositions[2]);
    return geom;
  }, [starPositions, starColors]);

  return (
    <group>
      {/* Event Horizon - Black sphere with high detail for smooth lensing */}
      <mesh ref={eventHorizonRef}>
        <sphereGeometry args={[0.75, 128, 128]} />
        <shaderMaterial
          {...eventHorizonShader}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Shadow sphere - deeper black inner core */}
      <mesh>
        <sphereGeometry args={[0.73, 64, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Volumetric Atmospheric Glow - Multiple layers for depth */}
      {/* Outer atmosphere - subtle large glow */}
      <mesh>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshBasicMaterial
          color={enableDopplerShift ? "#6366f1" : "#8b5cf6"}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Mid atmosphere - brighter inner glow */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial
          color={enableGravitationalLensing ? "#a855f7" : "#8b5cf6"}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner atmosphere - intense close glow */}
      <mesh>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Main 3D Volumetric Accretion Disk with Kip Thorne Physics */}
      <points ref={accretionDiskRef} geometry={diskGeometry}>
        <shaderMaterial {...accretionDiskShader} />
      </points>

      {/* Inner super-hot disk layer */}
      <points ref={innerDiskRef} geometry={innerDiskGeometry}>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Polar Jets - Relativistic outflows */}
      <points ref={polarJetsRef} geometry={jetsGeometry}>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* HOLOGRAPHIC PHOTON DISK - Information-theoretic shell */}
      <points ref={holographicDiskRef} geometry={holographicGeometry}>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* MAGNETIC FIELD LINES - Blandford-Znajek threading */}
      <points ref={magneticFieldLinesRef} geometry={magneticFieldGeometry}>
        <pointsMaterial
          size={0.012}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* PARTICLE TRAILS - Motion history with custom shader */}
      <points ref={particleTrailsRef} geometry={trailGeometry}>
        <shaderMaterial {...particleTrailShader} />
      </points>

      {/* STAR ORBITAL TRAILS - Motion paths of orbiting stars */}
      <points ref={starTrailsRef} geometry={starTrailGeometry}>
        <shaderMaterial {...particleTrailShader} />
      </points>

      {/* ORBITING STARS - Gravitational attractors in outer disk */}
      <points ref={orbitingStarsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.8}
          vertexColors
          transparent
          opacity={1.0}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Enhanced Multi-Layer Glow Rings */}
      {/* ISCO (Innermost Stable Circular Orbit) - Ultra-bright */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.76, 0.95, 128]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner hot disk glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1.4, 96]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Middle transition zone */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.2, 96]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer cooler disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 3.2, 80]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Far outer diffuse glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 4.5, 64]} />
        <meshBasicMaterial
          color="#ff2200"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* BOUNDARY VISUALIZATION SPHERES */}
      {/* Outer accretion disk boundary - subtle containment sphere */}
      <mesh>
        <sphereGeometry args={[3.4, 64, 64]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          wireframe={false}
        />
      </mesh>

      {/* Inner photon disk boundary - bright photon sphere ring */}
      <mesh>
        <sphereGeometry args={[1.08, 64, 64]} />
        <meshBasicMaterial
          color="#ffff66"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Photon sphere marker ring - brightest at 1.5 * Schwarzschild radius */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.12, 1.125, 128]} />
        <meshBasicMaterial
          color="#ffee00"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
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

// Camera Controls Component with enhanced 3D exploration
function CameraController({
  autoRotate,
  cameraPreset,
  theme = 'dark'
}: {
  autoRotate: boolean;
  cameraPreset: { position: [number, number, number]; target: [number, number, number] } | null;
  theme?: 'light' | 'dark';
}) {
  const controlsRef = useRef<{ target: THREE.Vector3; update: () => void } | null>(null);
  const { camera } = useThree();

  // Apply camera preset with smooth transition
  useFrame(() => {
    if (cameraPreset && controlsRef.current) {
      const { position, target } = cameraPreset;

      // Smooth camera transition
      camera.position.lerp(new THREE.Vector3(...position), 0.05);
      controlsRef.current.target.lerp(new THREE.Vector3(...target), 0.05);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
        minDistance={1.5}
        maxDistance={20}
        zoomSpeed={1.0}
        panSpeed={1.0}
        rotateSpeed={0.6}
        enableDamping={true}
        dampingFactor={0.08}
        screenSpacePanning={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
      {/* Ambient lighting for better depth perception */}
      <ambientLight intensity={theme === 'dark' ? 0.15 : 0.3} color={theme === 'dark' ? "#6366f1" : "#fbbf24"} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 0.3 : 0.5} color={theme === 'dark' ? "#8b5cf6" : "#f59e0b"} />
      <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.2 : 0.4} color={theme === 'dark' ? "#06b6d4" : "#fbbf24"} />
    </>
  );
}

export const ThreeJsHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showControls, setShowControls] = useState(false); // Start minimized
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<{
    position: [number, number, number];
    target: [number, number, number];
  } | null>(null);

  // Physics toggles
  const [enableDoppler, setEnableDoppler] = useState(true);
  const [enableLensing, setEnableLensing] = useState(true);

  // Visual effects toggle for performance
  const [enableVisualEffects, setEnableVisualEffects] = useState(true);

  // Theme system - based on PST time
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';

    // Get current time in PST
    const now = new Date();
    const pstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    const hour = pstTime.getHours();

    // Light mode: 6am - 6pm PST, Dark mode: 6pm - 6am PST
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Set mounted state to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to document root
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      // Update body background color
      document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#000000';
      document.body.style.color = theme === 'light' ? '#000000' : '#e0e7ff';
    }
  }, [theme]);

  // Update theme based on time
  React.useEffect(() => {
    const checkTime = () => {
      setTheme(getInitialTheme());
    };

    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Camera preset positions - optimized for dramatic viewing angles
  const presets = {
    default: { position: [3, 2, 6] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    top: { position: [0, 10, 0.5] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    side: { position: [8, 0.5, 0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    front: { position: [0, 0, 8] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    isometric: { position: [7, 7, 7] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    closeup: { position: [1.2, 0.8, 2] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    wide: { position: [0, 3, 15] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
    dramatic: { position: [5, 3, 4] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  };

  const handlePreset = (preset: keyof typeof presets) => {
    setCameraPreset(presets[preset]);
    // Clear preset after animation completes
    setTimeout(() => setCameraPreset(null), 2000);
  };

  // Prevent hydration mismatch by only rendering on client
  if (!mounted) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-primary/10" />
    );
  }

  return (
    <>
      {/* Canvas Background - Behind everything */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Canvas
          camera={{ position: [3, 2, 6], fov: 70 }}
          style={{
            background: theme === 'dark' ? 'transparent' : '#ffffff',
            cursor: 'grab',
            pointerEvents: 'auto'
          }}
          className="touch-none"
          dpr={[1, 2]}
        >
          <CameraController autoRotate={autoRotate} cameraPreset={cameraPreset} theme={theme} />
          <BlackHole
            enableDopplerShift={enableDoppler}
            enableGravitationalLensing={enableLensing}
            theme={theme}
          />
          <StarField />
          {enableVisualEffects && (
            <>
              <ShootingStarTrail theme={theme} />
              <NebulaCloud />
            </>
          )}
        </Canvas>
      </div>

      {/* UI Controls Layer - Above everything */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* 3D Camera Controls UI Panel */}
        {showControls && (
          <div className="absolute top-6 left-6 bg-primary/95 backdrop-blur-md border border-accent/40 rounded-xl p-5 space-y-4 font-mono text-sm pointer-events-auto shadow-2xl max-w-xs animate-in fade-in slide-in-from-left-5 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-accent/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <h3 className="text-accent font-semibold text-base tracking-wide">CAMERA CONTROL</h3>
              </div>
              <button
                onClick={() => setShowControls(false)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setShowControls(false);
                }}
                className="text-foreground/50 hover:text-foreground transition-colors text-lg font-bold cursor-pointer touch-manipulation"
                aria-label="Close controls"
              >
                ✕
              </button>
            </div>

          {/* Camera Presets */}
          <div className="space-y-3">
            <h4 className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">View Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePreset('default')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('default');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                🎯 Default
              </button>
              <button
                onClick={() => handlePreset('top')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('top');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                ⬆️ Top View
              </button>
              <button
                onClick={() => handlePreset('side')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('side');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                ↔️ Side View
              </button>
              <button
                onClick={() => handlePreset('front')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('front');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                👁️ Front View
              </button>
              <button
                onClick={() => handlePreset('isometric')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('isometric');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                📐 Isometric
              </button>
              <button
                onClick={() => handlePreset('closeup')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('closeup');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                🔍 Close-up
              </button>
              <button
                onClick={() => handlePreset('dramatic')}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePreset('dramatic');
                }}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                ⚡ Dramatic
              </button>
            </div>
          </div>

          {/* Camera Features */}
          <div className="space-y-3 pt-3 border-t border-accent/20">
            <h4 className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Camera Features</h4>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setAutoRotate(!autoRotate);
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation ${
                autoRotate
                  ? 'bg-accent/30 border-accent text-accent hover:bg-accent/40'
                  : 'bg-primary/60 border-accent/30 text-foreground hover:bg-accent/20 hover:text-accent'
              }`}
            >
              {autoRotate ? '⏸️ Stop Auto-Rotate' : '▶️ Auto-Rotate'}
            </button>
            <button
              onClick={() => handlePreset('wide')}
              onTouchEnd={(e) => {
                e.preventDefault();
                handlePreset('wide');
              }}
              className="w-full px-3 py-2.5 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 font-semibold cursor-pointer touch-manipulation"
            >
              🌌 Wide View
            </button>
          </div>

          {/* Physics Controls - Kip Thorne Relativity */}
          <div className="space-y-3 pt-3 border-t border-accent/20">
            <h4 className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Relativistic Physics</h4>
            <button
              onClick={() => setEnableDoppler(!enableDoppler)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setEnableDoppler(!enableDoppler);
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation ${
                enableDoppler
                  ? 'bg-accent/30 border-accent text-accent hover:bg-accent/40'
                  : 'bg-primary/60 border-accent/30 text-foreground hover:bg-accent/20 hover:text-accent'
              }`}
              title="Relativistic beaming - approaching side appears brighter"
            >
              {enableDoppler ? '✓ Doppler Shift' : '○ Doppler Shift'}
            </button>
            <button
              onClick={() => setEnableLensing(!enableLensing)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setEnableLensing(!enableLensing);
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation ${
                enableLensing
                  ? 'bg-accent/30 border-accent text-accent hover:bg-accent/40'
                  : 'bg-primary/60 border-accent/30 text-foreground hover:bg-accent/20 hover:text-accent'
              }`}
              title="Gravitational lensing - light bending around black hole"
            >
              {enableLensing ? '✓ Lensing (Kip Thorne)' : '○ Lensing (Kip Thorne)'}
            </button>
            <div className="text-xs text-foreground/50 pt-2">
              <p className="leading-relaxed">
                Based on &ldquo;Interstellar&rdquo; physics by Kip Thorne • Includes frame-dragging, Einstein deflection, and relativistic beaming
              </p>
            </div>
          </div>

          {/* Visual Effects */}
          <div className="space-y-3 pt-3 border-t border-accent/20">
            <h4 className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Visual Effects</h4>
            <button
              onClick={() => setEnableVisualEffects(!enableVisualEffects)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setEnableVisualEffects(!enableVisualEffects);
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation ${
                enableVisualEffects
                  ? 'bg-accent/30 border-accent text-accent hover:bg-accent/40'
                  : 'bg-primary/60 border-accent/30 text-foreground hover:bg-accent/20 hover:text-accent'
              }`}
              title="Toggle shooting stars and nebula effects for performance"
            >
              {enableVisualEffects ? '✓ Ambient Effects' : '○ Ambient Effects'}
            </button>
            <div className="text-xs text-foreground/50">
              <p className="leading-relaxed">
                Shooting stars and nebula clouds • Disable for better performance
              </p>
            </div>
          </div>

          {/* Mouse Controls Guide */}
          <div className="space-y-2 pt-3 border-t border-accent/20">
            <h4 className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Mouse Controls</h4>
            <div className="space-y-1.5 text-foreground/70">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-accent font-mono">🖱️ L</span>
                <span>Rotate Camera</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-accent font-mono">🖱️ R</span>
                <span>Pan Camera</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-accent font-mono">🖱️ ⚙️</span>
                <span>Zoom In/Out</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-accent/20">
            <p className="text-xs text-foreground/50 text-center italic">
              Explore the black hole in full 3D
            </p>
          </div>
        </div>
      )}

        {/* Theme Toggle - Top position */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          onTouchEnd={(e) => {
            e.preventDefault();
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
          className="absolute top-6 left-6 bg-primary/95 backdrop-blur-md border border-accent/40 rounded-lg px-4 py-2.5 font-mono text-xs text-foreground hover:bg-accent/30 hover:scale-105 transition-all shadow-lg pointer-events-auto flex items-center gap-2 font-semibold cursor-pointer touch-manipulation"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Camera Toggle - Below Theme Button */}
        {!showControls && (
          <button
            onClick={() => setShowControls(true)}
            onTouchEnd={(e) => {
              e.preventDefault();
              setShowControls(true);
            }}
            className="absolute top-20 left-6 bg-primary/95 backdrop-blur-md border border-accent/40 rounded-lg px-4 py-2.5 font-mono text-sm text-accent hover:bg-accent/30 hover:scale-105 transition-all shadow-lg pointer-events-auto flex items-center gap-2 font-semibold animate-in fade-in slide-in-from-left-5 duration-300 cursor-pointer touch-manipulation"
            title="Open camera controls"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>CAMERA</span>
          </button>
        )}

        {/* Helper text for first-time users - only shows when controls are minimized */}
        {!showControls && (
          <div className="absolute bottom-6 left-6 bg-primary/80 backdrop-blur-md border border-accent/30 rounded-lg px-4 py-2 font-mono text-xs text-foreground/70 pointer-events-none shadow-lg max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-500 delay-1000">
            <span className="text-accent">💡 Tip:</span> Drag to rotate • Right-click to pan • Scroll to zoom
          </div>
        )}
      </div>
    </>
  );
};
