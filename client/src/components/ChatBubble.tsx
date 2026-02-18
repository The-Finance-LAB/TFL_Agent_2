/*
 * ChatBubble — frosted glass message card with agent-specific glow
 * Dark Glass Trading Floor: each message has a colored left border glow,
 * financial figures are highlighted in monospace gold
 */

import { motion } from "framer-motion";
import { agents, type ChatMessage } from "@/data/chatData";

interface ChatBubbleProps {
  message: ChatMessage;
  index: number;
}

function highlightFinancials(text: string, color: string): React.ReactNode[] {
  const pattern = /(\$[\d,.]+\s*(?:billion|million|trillion)?|[\d.]+%|CAGR|FY\d{4}|55-45|57-43|YoY)/gi;
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    // Check if this part matches the pattern (split alternates between non-match and match)
    const check = new RegExp(pattern.source, "i");
    if (check.test(part)) {
      return (
        <span
          key={i}
          className="font-mono font-medium"
          style={{ color, textShadow: `0 0 8px ${color}40` }}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatBubble({ message, index }: ChatBubbleProps) {
  const agent = agents[message.agentId];

  if (message.type === "separator") {
    const isFirst = message.id === 2;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center py-4 px-8"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-medium">
            {isFirst ? "roundtable begins" : "closing remarks"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </motion.div>
    );
  }

  if (!agent) return null;

  const isChief = message.agentId === "chief";
  const accentColor = isChief ? "#D4A853" : agent.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      }}
      className="flex items-start gap-3 px-4 py-1.5"
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg"
        style={{
          background: agent.avatarBg,
          boxShadow: `0 0 16px ${agent.glowColor}`,
        }}
      >
        {agent.initials}
      </motion.div>

      {/* Message card */}
      <div className="flex-1 min-w-0 max-w-[85%]">
        {/* Name + role + year */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-sm font-semibold"
            style={{ color: agent.color }}
          >
            {agent.name}
          </span>
          {agent.year && (
            <span
              className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${agent.color}15`,
                color: agent.color,
                border: `1px solid ${agent.color}25`,
              }}
            >
              {agent.year}
            </span>
          )}
          {agent.role && (
            <span className="text-[10px] text-white/30 font-medium tracking-wide uppercase">
              {agent.role}
            </span>
          )}
        </div>

        {/* Glass message body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className={`
            glass-card rounded-2xl rounded-tl-sm px-4 py-3 relative overflow-hidden
            ${isChief ? "border-l-2" : "border-l-2"}
          `}
          style={{
            borderLeftColor: accentColor,
            boxShadow: `
              0 0 20px ${agent.glowColor},
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
          }}
        >
          {/* Subtle gradient overlay on chief messages */}
          {isChief && (
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, transparent)`,
              }}
            />
          )}

          <p className="text-[13px] leading-relaxed text-white/85 relative z-10">
            {highlightFinancials(message.text, accentColor)}
          </p>
        </motion.div>

        {/* Timestamp */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-[10px] text-white/20">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 16 10"
            fill="none"
            className="text-white/20"
          >
            <path
              d="M1 5.5L4.5 9L11 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 5.5L8.5 9L15 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
