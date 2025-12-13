import React, { useState } from "react";
import { Canvas, Project, ProjectModal } from "./components/Canvas";
import { Dock } from "./components/Dock";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock Data - Carefully arranged to match the "scattered but focused" layout
const PROJECTS: Project[] = [
  // Center Cluster - Denser
  { id: "1", label: "STAGE VISUALS", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80", x: -8, y: -25, size: "lg", rotation: 0 },
  { id: "2", label: "RYK", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500&q=80", x: -12, y: 5, size: "sm", rotation: 0 },
  { id: "3", label: "COLLAGE ANIMATIONS", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80", x: 12, y: 8, size: "md", rotation: 0 },
  { id: "4", label: "MAFIJA VINYL", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&q=80", x: -5, y: 12, size: "sm", rotation: 0 },
  { id: "5", label: "WTF", image: "https://images.unsplash.com/photo-1576158676605-e817c0c16fcc?w=500&q=80", x: 18, y: -18, size: "sm", rotation: 0 },

  // Left Side - Scattered
  { id: "6", label: "RAMÓWKA", image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&q=80", x: -25, y: -35, size: "sm", rotation: 0 },
  { id: "7", label: "LOVE SONG SAD", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80", x: -15, y: -45, size: "sm", rotation: 0 },
  { id: "8", label: "I NIE PUSZCZĘ", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80", x: -35, y: -15, size: "sm", rotation: 0 },
  { id: "9", label: "SZEPT", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80", x: -32, y: 5, size: "md", rotation: 0 },
  { id: "10", label: "TO NIE POP", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=80", x: -22, y: -5, size: "sm", rotation: 0 },
  { id: "11", label: "TOUR", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80", x: -40, y: 10, size: "sm", rotation: 0 },
  { id: "12", label: "KACPERCZYK 2024", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80", x: -30, y: 18, size: "md", rotation: 0 },

  // Right Side - Scattered
  { id: "13", label: "EFEMMERA", image: "https://images.unsplash.com/photo-1520032525096-7bd04a94b561?w=500&q=80", x: 15, y: -38, size: "sm", rotation: 0 },
  { id: "14", label: "KAJECIK", image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=500&q=80", x: 25, y: -42, size: "sm", rotation: 0 },
  { id: "15", label: "INTERLUDIUM", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80", x: 35, y: -10, size: "sm", rotation: 0 },
  { id: "16", label: "TRASA", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&q=80", x: 42, y: 0, size: "sm", rotation: 0 },
  { id: "17", label: "SOLAR BIAŁAS", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&q=80", x: 35, y: 10, size: "sm", rotation: 0 },
  { id: "18", label: "CHANEL", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", x: 40, y: 28, size: "sm", rotation: 0 },
  { id: "19", label: "SBM FF24", image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&q=80", x: 50, y: 15, size: "sm", rotation: 0 },

  // Bottom / Miscellaneous
  { id: "20", label: "ALBOALBO", image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=500&q=80", x: -18, y: 18, size: "sm", rotation: 0 },
  { id: "21", label: "FANTASMAGORIE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", x: -10, y: 28, size: "sm", rotation: 0 },
  { id: "22", label: "MERCH", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80", x: 2, y: 22, size: "sm", rotation: 0 },
  { id: "23", label: "NEWONCE", image: "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?w=500&q=80", x: 25, y: 20, size: "md", rotation: 0 },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="w-screen h-screen overflow-hidden font-sans bg-[#F4F4F2] text-black">
      {/* Canvas Layer */}
      <Canvas projects={PROJECTS} onOpenProject={setSelectedProject} />

      {/* Interface Layer - Fixed elements */}

      {/* About / Info Toggle - Minimal editorial style */}
      <div className="fixed top-8 left-8 z-40">
        <button
          onClick={() => setShowInfo(true)}
          className="group flex items-center gap-3 px-5 py-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full transition-all duration-300 shadow-sm border border-white/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-neutral-800 group-hover:text-black">INFO</span>
        </button>
      </div>

      {/* Dock */}
      <Dock />

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
              >
                <X size={20} />
              </button>

              <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">Ashwani Pratap Singh</h2>
              <p className="text-neutral-500 mb-6 font-medium tracking-wide text-sm uppercase">Design · Product · AI</p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                I build floating digital universes and interactive experiences.
                Currently exploring the intersection of spatial design and creative tools.
              </p>

              <div className="flex justify-center gap-4">
                <button className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-neutral-800 transition-colors">
                  Contact
                </button>
                <button className="px-6 py-2 border border-neutral-200 rounded-full text-sm hover:border-black transition-colors">
                  Twitter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
