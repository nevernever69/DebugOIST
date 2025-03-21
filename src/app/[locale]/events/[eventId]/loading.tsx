"use client"
import React from "react";
import { motion } from "framer-motion";

export default function HexagonLoaderWithText() {
    // Variants for glitch text layers.
    const glitchVariants = {
        animate: {
            x: [0, -3, 3, -3, 0],
            transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
        },
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #0f0f0f, #000)" }}
                animate={{ opacity: [0.9, 0.8, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating Hexagon Spinner */}
            <motion.svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                className="relative z-10"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ff" />
                        <stop offset="100%" stopColor="#f0f" />
                    </linearGradient>
                </defs>
                <motion.polygon
                    points="90,50 70,15.36 30,15.36 10,50 30,84.64 70,84.64"
                    fill="none"
                    stroke="url(#hexGradient)"
                    strokeWidth="2"
                    animate={{ strokeWidth: [2, 4, 2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.svg>

            {/* Glitch Neon Text */}
            <div className="relative z-10 mt-10">
                <div className="relative">
                    {/* Base text layer */}
                    <motion.h1
                        className="text-3xl md:text-5xl font-extrabold tracking-wider text-white"
                        animate={{ opacity: [1, 0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        LOADING...
                    </motion.h1>
                    {/* Glitch red layer */}
                    <motion.h1
                        className="absolute inset-0 text-3xl md:text-5xl font-extrabold tracking-wider text-red-500"
                        variants={glitchVariants}
                        animate="animate"
                        transition={{ delay: 0.1 }}
                    >
                        LOADING...
                    </motion.h1>
                    {/* Glitch blue layer */}
                    <motion.h1
                        className="absolute inset-0 text-3xl md:text-5xl font-extrabold tracking-wider text-blue-500"
                        variants={glitchVariants}
                        animate="animate"
                        transition={{ delay: 0.2 }}
                    >
                        LOADING...
                    </motion.h1>
                </div>
            </div>
        </div>
    );
}
