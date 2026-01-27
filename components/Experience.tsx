"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { TShirt } from "@/components/3d/TShirt";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export type AppMode = "loading" | "scroll-hero" | "main";

interface ExperienceProps {
    appMode: AppMode;
    scrollStage: number;
    scrollProgress: number; // 0 to 1 within the current stage, or overall? Let's say 0-1 per stage or global
}

function SceneContent({ appMode, scrollStage, scrollProgress }: ExperienceProps) {
    const shirtGroup = useRef<THREE.Group>(null);
    const { camera } = useThree();

    // Stages configuration (mirrors ScrollHero definition)
    const STAGES = [
        { color: "#ffffff", text: "" }, // Loading/Stage 0
        { color: "#ffffff", text: "THREADFORM" },
        { color: "#1a1a1a", text: "WE DESIGN" },
        { color: "#ffffff", text: "BUILT FOR" },
        { color: "#2d3436", text: "PRINTED" },
        { color: "#8b2635", text: "ORIGINAL" },
    ];

    const currentConfig = STAGES[scrollStage] || STAGES[0];
    const nextConfig = STAGES[Math.min(scrollStage + 1, STAGES.length - 1)];

    useFrame((state, delta) => {
        if (!shirtGroup.current) return;

        // --- LOADING MODE ---
        if (appMode === "loading") {
            // Continuous spin + bob (Wait, LoadingScreen now just passes through props, logic moved here)
            shirtGroup.current.rotation.y += delta * 0.5;
            shirtGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
            // Camera fixed
            camera.position.lerp(new THREE.Vector3(0, 0, 4.5), 0.1);
        }

        // --- SCROLL HERO MODE ---
        else if (appMode === "scroll-hero") {
            // Target rotation based on stage.  
            // We want the text to be visible. 
            // Stage 0 (Front): 0
            // Stage 1 (We Design): maybe slight angle? 
            // The user said "BUILT FOR" (Stage 2) is revolving. 
            // Let's make sure it stabilizes at a readable angle.
            // If Text is attached to the shirt, it follows shirt rotation.
            // Let's force specific rotations for readability.

            const ROTATIONS = [0, -0.2, 0, 0.2, 0]; // array of rotations per stage
            const baseRot = ROTATIONS[scrollStage] || 0;
            const targetRotY = baseRot + (Math.sin(state.clock.elapsedTime * 0.5) * 0.05); // slight idle breathing, not full spin

            // Smoothly interpolate rotation
            shirtGroup.current.rotation.y = THREE.MathUtils.lerp(shirtGroup.current.rotation.y, targetRotY, 0.1);

            // Bobbing reduced
            shirtGroup.current.position.y = THREE.MathUtils.lerp(shirtGroup.current.position.y, 0, 0.1);
            shirtGroup.current.position.x = THREE.MathUtils.lerp(shirtGroup.current.position.x, 0, 0.1);

            // Camera slightly zooms in/out based on stage
            const targetObs = scrollStage % 2 === 0 ? 4.5 : 3.8;
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetObs, 0.05);
        }

        // --- MAIN COMMERCE MODE (The "Bridge" outcome) ---
        else if (appMode === "main") {
            // Move to sidebar (right) and shrink slightly
            // Assuming desktop layout. Mobile might need different values (responsive useThree logic needed really)
            shirtGroup.current.position.x = THREE.MathUtils.lerp(shirtGroup.current.position.x, 2.5, 0.04);
            shirtGroup.current.position.y = THREE.MathUtils.lerp(shirtGroup.current.position.y, 0.5, 0.04);
            shirtGroup.current.rotation.y += 0.005; // Gentle spin
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.04);
        }
    });

    // Calculate Color
    // We can lerp colors if we want, or just switch
    // For now let's switch, but the TShirt component handles transition if implemented (it uses new Material every render in my previous code... wait, useMemo dependency was on color. That might cause re-compile glitch. Better to update material ref directly. 
    // But for now, let's just pass the color.)

    // Decide active color
    let activeColor = currentConfig.color;
    if (appMode === "loading") activeColor = "#ffffff"; // Or cycle?

    return (
        <>
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="studio" />

            {appMode === "loading" && (
                <group ref={shirtGroup}>
                    <TShirt color={activeColor} scale={0.03}>
                        <Text
                            position={[0, 0.2, 0.51]}
                            rotation={[0, 0, 0]}
                            fontSize={0.15}
                            color={currentConfig.color === "#ffffff" ? "#1a1a1a" : "#ffffff"}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {currentConfig.text}
                        </Text>
                    </TShirt>
                </group>
            )}

            <ContactShadows resolution={1024} scale={10} blur={1.5} opacity={0.4} far={10} color="#333" />
        </>
    );
}

export function Experience(props: ExperienceProps) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Use pointer-events-none so we can click through to the DOM, 
           but we need to enable pointer events on the 3D model if we want interactivity later.
           Ideally: z-0, and DOM content is z-10. 
           If DOM content has transparent backgrounds, we see canvas. 
           If DOM content covers canvas, we don't.
       */}
            <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
                <SceneContent {...props} />
            </Canvas>
        </div>
    );
}
