/*
 * ParticipantsSidebar — side panel showing analyst profiles
 * Dark Glass Trading Floor: frosted glass cards with agent-colored accents
 */

import { motion } from "framer-motion";
import { agents } from "@/data/chatData";

interface ParticipantsSidebarProps {
  activeAgentId: string | null;
}

export default function ParticipantsSidebar({ activeAgentId }: ParticipantsSidebarProps) {
  const agentList = Object.values(agents);

  return (
    <div className="hidden lg:flex flex-col w-64 shrink-0 gap-2 p-4 overflow-y-auto">
      <h2 className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-semibold mb-2 px-1">
        Participants
      </h2>

      {agentList.map((agent, i) => {
        const isActive = activeAgentId === agent.id;

        return (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`
              glass-card rounded-xl p-3 transition-all duration-500
              ${isActive ? "ring-1" : "opacity-60 hover:opacity-80"}
            `}
            style={{
              borderColor: isActive ? `${agent.color}40` : undefined,
              boxShadow: isActive ? `0 0 20px ${agent.glowColor}` : undefined,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{
                  background: agent.avatarBg,
                  boxShadow: isActive ? `0 0 12px ${agent.glowColor}` : undefined,
                }}
              >
                {agent.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-xs font-semibold truncate"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {agent.year && (
                    <span
                      className="text-[9px] font-mono"
                      style={{ color: `${agent.color}80` }}
                    >
                      {agent.year}
                    </span>
                  )}
                  <span className="text-[9px] text-white/25">{agent.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Data source badge */}
      <div className="mt-4 glass-card rounded-xl p-3">
        <p className="text-[9px] text-white/25 leading-relaxed">
          <span className="text-white/40 font-semibold">Data Source</span>
          <br />
          Apple Inc. 10-K SEC Filings
          <br />
          FY2020 — FY2025
        </p>
      </div>
    </div>
  );
}
