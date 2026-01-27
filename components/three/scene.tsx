"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  enableOrbit?: boolean;
  backgroundColor?: string;
}

export function Scene({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  cameraFov = 50,
  enableOrbit = false,
  backgroundColor,
}: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ background: backgroundColor || "transparent" }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={cameraFov}
          />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1.2}
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.6}
          />
          <directionalLight position={[0, 5, 5]} intensity={0.6} />
          {children}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={4}
          />
          <Environment preset="studio" />
          {enableOrbit && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
