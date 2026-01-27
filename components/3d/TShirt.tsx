"use client";

import React, { useRef, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";
import { Decal, useTexture, Center } from "@react-three/drei";

interface TShirtProps {
    color?: string;
    texture?: string; // URL to a texture image
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    opacity?: number;
}

export function TShirt({
    color = "#ffffff",
    texture,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    opacity = 1,
    children,
}: TShirtProps & { children?: React.ReactNode }) {
    const fbx = useLoader(FBXLoader, "/tshirt3d.fbx");

    const scene = useMemo(() => {
        const clone = fbx.clone(true); // Deep clone
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // key capability: apply our custom material
                // We preserve the map if the FBX has one, or just overwrite color
                // But for this use case, we want to force the color prop.
                mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(color),
                    roughness: 0.6,
                    metalness: 0.1,
                    side: THREE.DoubleSide,
                });
            }
        });
        return clone;
    }, [fbx, color, opacity]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Center>
                <primitive object={scene} />
            </Center>
            {children}
        </group>
    );
}

// Preload assets
useLoader.preload(FBXLoader, "/tshirt3d.fbx");
