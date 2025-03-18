"use client";
import React from "react";
import { Spotlight, GridBackground } from "./spotlight-new";

export function SpotlightNewDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <GridBackground />
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          DEBUG <br /> Where coding meets creativity!
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
        Join our community of passionate programmers, explore new challenges, and enhance your coding skills through exciting projects, hackathons, and collaborative learning.
        </p>
      </div>
    </div>
  );
}
