/*
 * TypingIndicator — frosted glass pill with animated dots
 * Dark Glass Trading Floor: subtle glass effect with agent-colored glow
 */

import { agents } from "@/data/chatData";

interface TypingIndicatorProps {
  agentId: string;
}

export default function TypingIndicator({ agentId }: TypingIndicatorProps) {
  const agent = agents[agentId];
  if (!agent) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-2">
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg"
        style={{ background: agent.avatarBg }}
      >
        {agent.initials}
      </div>

      {/* Typing pill */}
      <div
        className="glass-card rounded-2xl px-4 py-3 flex items-center gap-1.5"
        style={{
          borderColor: `${agent.color}20`,
          boxShadow: `0 0 12px ${agent.glowColor}`,
        }}
      >
        <span
          className="typing-dot w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: agent.color }}
        />
        <span
          className="typing-dot w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: agent.color }}
        />
        <span
          className="typing-dot w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: agent.color }}
        />
      </div>
    </div>
  );
}
