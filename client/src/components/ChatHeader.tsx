/*
 * ChatHeader — frosted glass header for the messenger frame
 * Dark Glass Trading Floor: shows title, participant count, and status
 */

import { motion } from "framer-motion";
import { agents } from "@/data/chatData";

interface ChatHeaderProps {
  messageCount: number;
  totalMessages: number;
  isComplete: boolean;
}

function AppleIcon() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: "linear-gradient(135deg, #D4A853, #B8942E)",
        boxShadow: "0 0 16px rgba(212, 168, 83, 0.3)",
      }}
    >
      <svg width="20" height="24" viewBox="0 0 814 1000" fill="#0B1120">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.6-105.6-208.4-105.6-328.6 0-193.3 125.7-296 249.3-296 65.7 0 120.5 43.1 161.7 43.1 39.2 0 100.4-45.8 175.1-45.8 28.3 0 130 2.6 197.1 98.7zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.3 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.6 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103-30.4 139.5-71.3z"/>
      </svg>
    </div>
  );
}

export default function ChatHeader({ messageCount, totalMessages, isComplete }: ChatHeaderProps) {
  const agentList = Object.values(agents);
  const progress = totalMessages > 0 ? (messageCount / totalMessages) * 100 : 0;

  return (
    <div className="glass-header sticky top-0 z-20 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Apple icon */}
        <div className="relative">
          <AppleIcon />
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B1120]" />
        </div>

        {/* Title + info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-white tracking-tight">
            THE APPLE BRIEF
          </h1>
          <p className="text-[10px] text-white/40 font-medium tracking-wide">
            {isComplete ? (
              "Meeting concluded"
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live — 42nd floor conference room
              </span>
            )}
          </p>
        </div>

        {/* Participant avatars */}
        <div className="flex -space-x-1.5">
          {agentList.slice(0, 5).map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.random() * 0.3 }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-[#0B1120]"
              style={{ background: agent.avatarBg }}
              title={agent.name}
            >
              {agent.initials}
            </motion.div>
          ))}
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white/50 bg-white/10 border border-[#0B1120]">
            +2
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #D4A853, #C4687A, #4A9E8E, #8B7EC8)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
