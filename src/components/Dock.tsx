import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Instagram,
  Mail,
  Trash2,
  AlertTriangle
} from "lucide-react";

const DockIcon = ({ children, label, color = "bg-gray-100" }: { children: React.ReactNode, label: string, color?: string }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="relative group flex flex-col items-center gap-2"
    >
      <DockItem mouseX={mouseX} color={color}>
        {children}
      </DockItem>
      {/* Tooltip on hover */}
      <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium bg-black/80 text-white px-2 py-1 rounded">
        {label}
      </span>
      {/* Active dot indicator simulation */}
      <div className="w-1 h-1 bg-black/30 rounded-full mt-1 opacity-0 group-hover:opacity-100" />
    </motion.div>
  );
};

const DockItem = ({ mouseX, children, color }: { mouseX: any, children: React.ReactNode, color: string }) => {
  let ref = React.useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={`aspect-square rounded-xl ${color} flex items-center justify-center shadow-lg cursor-pointer overflow-hidden border border-white/20`}
    >
      {children}
    </motion.div>
  );
};

// Adobe Icon Component
const AdobeIcon = ({ letter, color }: { letter: string, color: string }) => (
  <div className={`w-full h-full ${color} flex items-center justify-center text-[#00051D]`}>
    <span className="font-bold text-[150%] leading-none tracking-tighter" style={{ fontFamily: 'sans-serif' }}>{letter}</span>
  </div>
);

export const Dock = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 origin-bottom scale-75 md:scale-100">
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        {/* Adobe Ae */}
        <DockIcon label="After Effects" color="bg-[#00051D]">
          <div className="w-full h-full bg-[#00051D] flex items-center justify-center border-[3px] border-[#00051D] text-[#D291FF]">
            <span className="font-bold text-lg">Ae</span>
          </div>
        </DockIcon>

        {/* Adobe Ps */}
        <DockIcon label="Photoshop" color="bg-[#001E36]">
          <div className="w-full h-full bg-[#001E36] flex items-center justify-center border-[3px] border-[#001E36] text-[#31A8FF]">
            <span className="font-bold text-lg">Ps</span>
          </div>
        </DockIcon>

        {/* Adobe Ai */}
        <DockIcon label="Illustrator" color="bg-[#330000]">
          <div className="w-full h-full bg-[#330000] flex items-center justify-center border-[3px] border-[#330000] text-[#FF9A00]">
            <span className="font-bold text-lg">Ai</span>
          </div>
        </DockIcon>

        <div className="w-[1px] h-8 bg-black/10 mx-1" />

        {/* Warning / Notes */}
        <DockIcon label="Notes" color="bg-yellow-100">
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
            <AlertTriangle className="w-1/2 h-1/2 text-white fill-white/50" />
          </div>
        </DockIcon>

        {/* Instagram */}
        <DockIcon label="Instagram" color="bg-white">
          <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center">
            <Instagram className="w-2/3 h-2/3 text-white" />
          </div>
        </DockIcon>

        {/* Mail */}
        <DockIcon label="Mail" color="bg-blue-100">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <Mail className="w-1/2 h-1/2 text-white" />
          </div>
        </DockIcon>

        <div className="w-[1px] h-8 bg-black/10 mx-1" />

        {/* Trash */}
        <DockIcon label="Trash" color="bg-gray-200">
          <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
            <Trash2 className="w-1/2 h-1/2 text-gray-500" />
          </div>
        </DockIcon>
      </div>
    </div>
  );
};
