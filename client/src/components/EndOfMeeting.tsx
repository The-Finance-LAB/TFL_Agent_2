/*
 * EndOfMeeting — displayed after all messages have been shown
 * Dark Glass Trading Floor: elegant conclusion card
 */

import { motion } from "framer-motion";

export default function EndOfMeeting() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center py-8 px-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-medium">
          end of meeting
        </span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      <div className="glass-card rounded-2xl p-5 max-w-sm text-center">
        <p className="text-xs text-white/30 leading-relaxed">
          <span className="text-white/50 font-semibold">Multi-Agent Financial Analyst System</span>
          <br />
          <span className="font-mono text-[10px] text-white/20">
            Apple 10-K Reports — FY2020 through FY2025
          </span>
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white/60 font-mono">7</div>
            <div className="text-[9px] text-white/20 uppercase tracking-wider">Agents</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold text-white/60 font-mono">6</div>
            <div className="text-[9px] text-white/20 uppercase tracking-wider">Years</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold text-white/60 font-mono">1</div>
            <div className="text-[9px] text-white/20 uppercase tracking-wider">Verdict</div>
          </div>
        </div>
      </div>

      {/* Replay button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        className="mt-5 px-5 py-2 rounded-full text-xs font-semibold tracking-wide
          bg-white/5 text-white/50 border border-white/10
          hover:bg-white/10 hover:text-white/70 transition-all duration-300"
      >
        Replay Roundtable
      </motion.button>
    </motion.div>
  );
}
