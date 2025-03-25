'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const coreMembers = [
  {
    name: "Ashish Baghel",
    role: "President",
    contact: "+91-84354 95134",
    image: "/assets/AshishDebugTeam.jpg",
  },
  {
    name: "Devashish Mishra",
    role: "Tech Head",
    contact: "+91-93018 65976",
    image: "/assets/DevashishDebugTeam2.jpg",
  },
  {
    name: "Dhruv Bharadwaj",
    role: "Tech Head",
    contact: "+917828583404",
    image: "/assets/DhruvDebugTeam.jpg",
  },
  {
    name: "Akanksha Jha",
    role: "Event Head",
    contact: "+91-98108 17060",
    image: "/assets/AkanshaDebugTeam.jpg",
  },
  {
    name: "Nalin Dalal",
    role: "Open Source Head",
    contact: "+91-74406 20675",
    image: "/assets/NalinDebugTeam.jpg",
  },
  {
    name: "Muskan Soni",
    role: "Marketing Head",
    contact: "+91-83198 81957",
    image: "/assets/MuskanDebugImg.png",
  },
];

export default function About() {
  return (
    <div className="relative z-20 px-6 py-16 lg:px-16 xl:px-24 bg-[#0F0F17] text-white">
      {/* About Debug Club */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-[#B784F9] mb-4">About Debug Club</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Debug Programming Club is a thriving community of passionate developers, 
          innovators, and problem solvers. We aim to build real-world projects, 
          conduct coding challenges, and foster collaboration among tech enthusiasts. 
        </p>
      </motion.div>

      {/* Core Team Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-semibold text-center text-[#B784F9] mb-8">
          Meet Our Core Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreMembers.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-[#1A1A2E] p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-xl font-semibold text-white">{member.name}</h4>
              <p className="text-[#B784F9]">{member.role}</p>
             
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
