"use client";

import * as React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { useSectionObserver } from "@/hooks/use-section-observer";
import * as THREE from "three";

function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const cursorPosition = useCursorPosition();

  useFrame(() => {
    if (!groupRef.current) return;

    // Subtle idle animation
    const time = Date.now() * 0.001;
    groupRef.current.position.y = Math.sin(time) * 0.05;

    // Eye tracking
    const targetX = cursorPosition.normalizedX * 0.15;
    const targetY = cursorPosition.normalizedY * 0.1;

    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x,
        -0.15 + targetX,
        0.1
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y,
        0.1 + targetY,
        0.1
      );
    }

    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x,
        0.15 + targetX,
        0.1
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y,
        0.1 + targetY,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f0d9b5" />
      </mesh>

      {/* Left Eye White */}
      <mesh position={[-0.15, 0.1, 0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Left Eye Pupil */}
      <mesh ref={leftEyeRef} position={[-0.15, 0.1, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Eye White */}
      <mesh position={[0.15, 0.1, 0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Right Eye Pupil */}
      <mesh ref={rightEyeRef} position={[0.15, 0.1, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, -0.15, 0.45]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, 5]} intensity={0.4} />
      <AvatarModel />
    </>
  );
}

export function Avatar3D() {
  const { message } = useSectionObserver();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>

      {/* Speech Bubble */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 w-64">
        <div className="relative bg-card border rounded-xl p-4 shadow-lg">
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t rotate-45" />
          <p className="text-sm text-center relative z-10">{message}</p>
        </div>
      </div>
    </div>
  );
}
