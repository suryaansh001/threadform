"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
    children: React.ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    fov?: number;
}

export function Scene({
    children,
    className,
    cameraPosition = [0, 0, 4.5],
    fov = 45
}: SceneProps) {
    return (
        <div className={className}>
            <Canvas
                shadows
                gl={{ antialias: true, preserveDrawingBuffer: true }}
                dpr={[1, 2]} // Optimize pixel ratio for performance
            >
                <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />

                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />

                {/* Studio lighting environment */}
                <Environment preset="studio" />

                <Suspense fallback={null}>
                    {children}
                </Suspense>

                <ContactShadows
                    resolution={1024}
                    scale={10}
                    blur={1.5}
                    opacity={0.4}
                    far={10}
                    color="#333"
                />
            </Canvas>
        </div>
    );
}
