"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TShirtModelProps {
  color?: string;
  printText?: string;
  printImage?: string;
  scale?: number;
  rotation?: [number, number, number];
  floating?: boolean;
  textColor?: string;
}

export function TShirtModel({
  color = "#ffffff",
  printText,
  printImage,
  scale = 1,
  rotation = [0, 0, 0],
  floating = true,
  textColor,
}: TShirtModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Determine text color based on shirt color if not provided
  const computedTextColor = useMemo(() => {
    if (textColor) return textColor;
    // Simple luminance check
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16) || 0;
    const g = parseInt(hex.substr(2, 2), 16) || 0;
    const b = parseInt(hex.substr(4, 2), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#1a1a1a" : "#ffffff";
  }, [color, textColor]);

  // Create T-shirt geometry with realistic shape
  const tshirtGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Main body - improved shape
    shape.moveTo(-1.2, -1.8);
    shape.lineTo(-1.2, 0.2);
    // Left sleeve
    shape.lineTo(-2.2, 0.8);
    shape.lineTo(-2.4, 0.4);
    shape.lineTo(-1.5, -0.1);
    // Collar left
    shape.lineTo(-1.2, 0.5);
    shape.quadraticCurveTo(-0.6, 1.2, 0, 1.0);
    shape.quadraticCurveTo(0.6, 1.2, 1.2, 0.5);
    // Right sleeve
    shape.lineTo(1.5, -0.1);
    shape.lineTo(2.4, 0.4);
    shape.lineTo(2.2, 0.8);
    shape.lineTo(1.2, 0.2);
    // Back to bottom
    shape.lineTo(1.2, -1.8);
    shape.lineTo(-1.2, -1.8);

    const extrudeSettings = {
      steps: 2,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Floating animation
  useFrame((state) => {
    if (groupRef.current && floating) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      <mesh ref={meshRef} geometry={tshirtGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.85}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Print area - front of shirt */}
      {printText && (
        <Text
          position={[0, -0.3, 0.12]}
          fontSize={0.22}
          maxWidth={2}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          anchorX="center"
          anchorY="middle"
          color={computedTextColor}
        >
          {printText}
        </Text>
      )}

      {/* Fabric texture overlay - subtle effect */}
      <mesh position={[0, -0.4, 0.085]} scale={[2.2, 2.8, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <meshStandardMaterial
          transparent
          opacity={0.015}
          color="#000000"
          roughness={1}
        />
      </mesh>
    </group>
  );
}
