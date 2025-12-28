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

// Black Hole with Event Horizon and 3D Volumetric Accretion Disk
function BlackHole() {
  const eventHorizonRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Points>(null);
  const innerDiskRef = useRef<THREE.Points>(null);
  const polarJetsRef = useRef<THREE.Points>(null);

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
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create 3D volumetric disk with realistic thickness distribution
      const radius = 0.9 + Math.random() * 2.5; // Disk radius from 0.9 to 3.4
      const angle = Math.random() * Math.PI * 2;

      // 3D thickness with density falloff (Gaussian distribution)
      // Inner disk is thinner, outer disk has more vertical structure
      const maxThickness = 0.08 + (radius - 0.9) / 2.5 * 0.25; // Increases with radius
      const thicknessRandom = (Math.random() - 0.5) * 2; // -1 to 1
      // Use power law for density concentration toward midplane
      const verticalDist = Math.sign(thicknessRandom) * Math.pow(Math.abs(thicknessRandom), 0.7);
      const thickness = verticalDist * maxThickness;

      diskPositions[i3] = Math.cos(angle) * radius;
      diskPositions[i3 + 1] = Math.sin(angle) * radius;
      diskPositions[i3 + 2] = thickness;

      // Store particle data for complex physics simulation
      diskData.push({
        radius,
        angle,
        verticalPhase: Math.random() * Math.PI * 2, // For vertical oscillations
        turbulence: Math.random(), // Turbulent motion seed
        speed: 0.015 / Math.sqrt(radius) // Keplerian speed
      });

      // Advanced temperature and color model
      // Temperature based on radius AND vertical height (cooler away from midplane)
      const temp = 1.0 - (radius - 0.9) / 2.5;
      const verticalCooling = 1.0 - Math.abs(thickness) / maxThickness * 0.4;
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

  // Polar jets - relativistic particles shooting from poles
  const { jetPositions, jetColors, jetData } = useMemo(() => {
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

    return { jetPositions, jetColors, jetData };
  }, []);

  // Animate 3D accretion disk with full physics simulation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Event horizon shader animation with camera position updates
    if (eventHorizonRef.current) {
      const material = eventHorizonRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.cameraPosition.value.copy(state.camera.position);
      }
    }

    // Main 3D volumetric accretion disk with complex physics
    if (accretionDiskRef.current) {
      const posAttr = accretionDiskRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        const data = diskData[i];
        if (!data) continue;

        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        const radius = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);

        // Keplerian orbital speed with relativistic frame-dragging
        const baseSpeed = data.speed;
        // Frame-dragging: inner disk rotates faster due to spacetime dragging
        const frameDrag = 0.003 / (radius * radius + 0.1);
        const speed = baseSpeed + frameDrag;
        const newAngle = angle + speed;

        // Update orbital position
        let newX = Math.cos(newAngle) * radius;
        let newY = Math.sin(newAngle) * radius;

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

        let newZ = z + verticalOscillation + verticalWave + mriTurbulence;

        // Spiral density waves - creates arm structure
        const spiralWave = Math.sin(angle * 3 - radius * 2 + time * 0.5) * 0.02;
        const spiralRadius = radius * (1.0 + spiralWave);

        newX = Math.cos(newAngle) * spiralRadius + turbX;
        newY = Math.sin(newAngle) * spiralRadius + turbY;

        // Update positions
        positions[i3] = newX;
        positions[i3 + 1] = newY;
        positions[i3 + 2] = newZ;
      }

      posAttr.needsUpdate = true;
    }

    // Inner super-hot disk layer - faster rotation
    if (innerDiskRef.current) {
      const posAttr = innerDiskRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const radius = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);

        // Very fast rotation near event horizon
        const speed = 0.025 / Math.sqrt(radius + 0.05);
        const newAngle = angle + speed;

        // Intense turbulence near ISCO (innermost stable circular orbit)
        const turbulence = Math.sin(time * 5 + i * 0.1) * 0.01;

        positions[i] = Math.cos(newAngle) * (radius + turbulence);
        positions[i + 1] = Math.sin(newAngle) * (radius + turbulence);
        positions[i + 2] = z + Math.sin(time * 6 + i * 0.2) * 0.008;
      }

      posAttr.needsUpdate = true;
    }

    // Polar jets - particles streaming out from poles
    if (polarJetsRef.current) {
      const posAttr = polarJetsRef.current.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        const data = jetData[i];
        if (!data) continue;

        const direction = i < jetData.length / 2 ? 1 : -1;

        // Move particles upward along jet
        let height = data.height + data.speed;

        // Reset particles that reach the end
        if (height > 4) {
          height = 0;
        }

        data.height = height;

        // Jet widens as it extends (collimation then expansion)
        const collimation = height < 1 ? height : 1;
        const expansion = height > 1 ? (height - 1) * 0.15 : 0;
        const jetRadius = 0.05 * collimation + expansion;

        // Helical structure from magnetic fields
        const helixAngle = data.angle + height * 2;
        const helixRadius = jetRadius * (1 + Math.sin(time * 2 + height * 5) * 0.3);

        positions[i3] = Math.cos(helixAngle) * helixRadius;
        positions[i3 + 1] = Math.sin(helixAngle) * helixRadius;
        positions[i3 + 2] = (0.8 + height) * direction;
      }

      posAttr.needsUpdate = true;
    }
  });

  // Enhanced event horizon shader with gravitational lensing
  const eventHorizonShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      cameraPosition: { value: new THREE.Vector3(0, 0, 5) }
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
      uniform vec3 cameraPosition;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDistortion;

      void main() {
        // Calculate view direction
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);

        // Fresnel effect for edge glow (stronger at glancing angles)
        float fresnel = 1.0 - abs(dot(viewDir, vNormal));
        fresnel = pow(fresnel, 2.5);

        // Gravitational lensing ring - appears at edge
        float lensingRing = smoothstep(0.4, 0.6, fresnel) - smoothstep(0.6, 0.8, fresnel);
        lensingRing *= 1.5;

        // Color shifting based on angle and time
        float angleShift = atan(vPosition.y, vPosition.x) / 3.14159;
        float timeShift = sin(time * 0.3) * 0.5 + 0.5;

        // Multi-color gravitational lensing effect
        vec3 lensingColor1 = vec3(0.5, 0.3, 0.9); // Purple
        vec3 lensingColor2 = vec3(0.2, 0.6, 1.0); // Cyan
        vec3 lensingColor3 = vec3(0.9, 0.4, 0.7); // Magenta

        // Mix colors based on position and time
        vec3 colorA = mix(lensingColor1, lensingColor2, sin(angleShift + time * 0.2) * 0.5 + 0.5);
        vec3 colorB = mix(lensingColor2, lensingColor3, cos(angleShift - time * 0.15) * 0.5 + 0.5);
        vec3 edgeColor = mix(colorA, colorB, timeShift);

        // Enhanced edge glow with lensing
        float edgeGlow = pow(fresnel, 1.8) * 0.4;

        // Photon sphere visualization (bright ring just outside event horizon)
        float photonSphere = smoothstep(0.55, 0.65, fresnel) * smoothstep(0.75, 0.65, fresnel);
        photonSphere *= (sin(time * 2.0 + angleShift * 10.0) * 0.3 + 0.7);

        // Almost pure black core with increasing brightness at edges
        vec3 coreColor = vec3(0.005, 0.003, 0.01);

        // Build final color with layers
        vec3 finalColor = coreColor;
        finalColor += edgeColor * edgeGlow;
        finalColor += edgeColor * lensingRing * 1.2;
        finalColor += vec3(1.0, 0.9, 0.8) * photonSphere * 0.8; // Bright photon sphere

        // Add subtle noise/static near event horizon
        float noise = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233)) + time) * 43758.5453);
        finalColor += noise * 0.02 * fresnel;

        // Hawking radiation subtle glow
        float hawkingGlow = pow(fresnel, 4.0) * 0.15 * (sin(time * 3.0) * 0.5 + 0.5);
        finalColor += vec3(0.8, 0.9, 1.0) * hawkingGlow;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
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

      {/* Main 3D Volumetric Accretion Disk */}
      <points ref={accretionDiskRef} geometry={diskGeometry}>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
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

      {/* Inner glow ring - enhanced */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.76, 1.2, 64]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Middle glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.0, 64]} />
        <meshBasicMaterial
          color="#ff5500"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 3.2, 64]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={0.06}
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
  cameraPreset
}: {
  autoRotate: boolean;
  cameraPreset: { position: [number, number, number]; target: [number, number, number] } | null;
}) {
  const controlsRef = useRef<any>(null);
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
      <ambientLight intensity={0.15} color="#6366f1" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#06b6d4" />
    </>
  );
}

export const ThreeJsHero: React.FC = () => {
  const [showControls, setShowControls] = useState(false); // Start minimized
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<{
    position: [number, number, number];
    target: [number, number, number];
  } | null>(null);

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

  return (
    <div className="absolute inset-0 -z-10">
      {/* 3D Camera Controls UI Panel */}
      {showControls && (
        <div className="absolute top-6 left-6 z-10 bg-primary/95 backdrop-blur-md border border-accent/40 rounded-xl p-5 space-y-4 font-mono text-sm pointer-events-auto shadow-2xl max-w-xs animate-in fade-in slide-in-from-left-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-accent/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <h3 className="text-accent font-semibold text-base tracking-wide">CAMERA CONTROL</h3>
            </div>
            <button
              onClick={() => setShowControls(false)}
              className="text-foreground/50 hover:text-foreground transition-colors text-lg font-bold"
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
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                🎯 Default
              </button>
              <button
                onClick={() => handlePreset('top')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                ⬆️ Top View
              </button>
              <button
                onClick={() => handlePreset('side')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                ↔️ Side View
              </button>
              <button
                onClick={() => handlePreset('front')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                👁️ Front View
              </button>
              <button
                onClick={() => handlePreset('isometric')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                📐 Isometric
              </button>
              <button
                onClick={() => handlePreset('closeup')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
              >
                🔍 Close-up
              </button>
              <button
                onClick={() => handlePreset('dramatic')}
                className="px-3 py-2 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95"
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
              className={`w-full px-3 py-2.5 border rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${
                autoRotate
                  ? 'bg-accent/30 border-accent text-accent hover:bg-accent/40'
                  : 'bg-primary/60 border-accent/30 text-foreground hover:bg-accent/20 hover:text-accent'
              }`}
            >
              {autoRotate ? '⏸️ Stop Auto-Rotate' : '▶️ Auto-Rotate'}
            </button>
            <button
              onClick={() => handlePreset('wide')}
              className="w-full px-3 py-2.5 bg-primary/60 hover:bg-accent/20 border border-accent/30 rounded-lg text-xs text-foreground hover:text-accent transition-all hover:scale-105 active:scale-95 font-semibold"
            >
              🌌 Wide View
            </button>
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

      {/* Minimized Toggle Button */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="absolute top-6 left-6 z-10 bg-primary/95 backdrop-blur-md border border-accent/40 rounded-lg px-4 py-2.5 font-mono text-sm text-accent hover:bg-accent/30 hover:scale-105 transition-all shadow-lg pointer-events-auto flex items-center gap-2 font-semibold animate-in fade-in slide-in-from-left-5 duration-300"
          title="Open camera controls"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>CAMERA</span>
        </button>
      )}

      {/* Helper text for first-time users - only shows when controls are minimized */}
      {!showControls && (
        <div className="absolute bottom-6 left-6 z-10 bg-primary/80 backdrop-blur-md border border-accent/30 rounded-lg px-4 py-2 font-mono text-xs text-foreground/70 pointer-events-none shadow-lg max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-500 delay-1000">
          <span className="text-accent">💡 Tip:</span> Drag to rotate • Right-click to pan • Scroll to zoom
        </div>
      )}

      <Canvas
        camera={{ position: [3, 2, 6], fov: 70 }}
        style={{ background: 'transparent', cursor: 'grab' }}
        className="touch-none"
        dpr={[1, 2]}
      >
        <CameraController autoRotate={autoRotate} cameraPreset={cameraPreset} />
        <BlackHole />
        <StarField />
        <ShootingStarTrail />
        <NebulaCloud />
      </Canvas>
    </div>
  );
};
