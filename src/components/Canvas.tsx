import React, { useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import backgroundPortrait from '../assets/cheetahh.webp';

// Types
export interface Project {
  id: string;
  label: string;
  image: string;
  x: number; // Percentage from center X (0 is center, -50 is left edge)
  y: number; // Percentage from center Y (0 is center, -50 is top edge)
  size: "sm" | "md" | "lg";
  rotation: number;
}

const ProjectTile = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing group"
      style={{
        left: `calc(50% + ${project.x}%)`,
        top: `calc(50% + ${project.y}%)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: Math.random() * 0.5,
      }}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileDrag={{ scale: 1.15, zIndex: 200, cursor: "grabbing" }}
      onTap={() => onOpen(project)}
    >
      <div
        className={`relative overflow-hidden rounded-md shadow-lg transition-shadow duration-300 group-hover:shadow-2xl bg-neutral-200
        ${project.size === "sm"
            ? "w-20 h-20 md:w-24 md:h-24"
            : project.size === "md"
              ? "w-32 h-32 md:w-40 md:h-40"
              : "w-48 h-48 md:w-56 md:h-56"
          }`}
      >
        <img
          src={project.image}
          alt={project.label}
          className="w-full h-full object-cover pointer-events-none"
        />
        {/* Subtle inner border/highlight */}
        <div className="absolute inset-0 border border-white/10 rounded-md pointer-events-none" />
      </div>

      <motion.span
        className="text-[10px] md:text-xs font-medium tracking-wide text-neutral-800/80 group-hover:text-black bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 pointer-events-none select-none"
        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
      >
        {project.label}
      </motion.span>
    </motion.div>
  );
};

interface CanvasProps {
  projects: Project[];
  onOpenProject: (p: Project) => void;
}

export const Canvas = ({ projects, onOpenProject }: CanvasProps) => {
  const constraintsRef = useRef(null);

  return (
    <div className="w-full h-full overflow-hidden relative bg-[#F4F4F2]">
      {/* SVG Filter Definition for Prism/Chromatic Aberration */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="prism-blur">
          {/* 1. Blur the source slightly (3.5px as requested) */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />

          {/* 2. Split Channels */}
          {/* Red Channel */}
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          {/* Green Channel */}
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          {/* Blue Channel */}
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />

          {/* 3. Offset Channels to create prism effect */}
          <feOffset in="red" dx="4" dy="0" result="red_offset" />
          <feOffset in="blue" dx="-4" dy="0" result="blue_offset" />

          {/* 4. Blend them back together using Screen mode */}
          <feBlend mode="screen" in="red_offset" in2="green" result="blend1" />
          <feBlend mode="screen" in="blend1" in2="blue_offset" result="out" />
        </filter>
      </svg>

      {/* Blurred Portrait Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="relative w-[75vh] h-[95vh] opacity-50">
          {/* We use a specific style to match the reference: blurred edges, recognizable silhouette */}
          <img
            src={backgroundPortrait}
            alt="Portrait"
            className="w-full h-full object-cover"
            style={{
              // Apply the custom SVG filter
              filter: "contrast(1) brightness(0.9) saturate(0.6) blur(0.1px)",
            }}
          />

        </div>
      </div>

      {/* Project Space */}
      <div
        ref={constraintsRef}
        className="w-full h-full z-10 relative"
      >
        <div
          className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
          {projects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        layoutId={`project-${project.id}`}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-4xl h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        <div className="flex-1 bg-neutral-100 flex items-center justify-center p-8">
          <img src={project.image} className="max-w-full max-h-full shadow-lg rounded" alt={project.label} />
        </div>
        <div className="w-full md:w-80 bg-white p-8 border-l border-neutral-100 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{project.label}</h2>
          <div className="h-1 w-12 bg-black/10 mb-6" />
          <p className="text-neutral-500 text-sm leading-relaxed mb-4">
            This is a placeholder description for the project. In a real portfolio, this would contain details about the role, the client, and the outcome of the work.
          </p>
          <div className="mt-auto">
            <span className="text-xs font-mono text-neutral-400">2024 / VISUAL DESIGN</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
