/*
 * Home Page — The Apple Brief Analyst Roundtable Messenger Simulation
 * 
 * Design: Dark Glass Trading Floor
 * - Deep navy gradient background with animated grid
 * - Centered messenger frame with frosted glass elements
 * - Messages appear sequentially with 2-second intervals
 * - Typing indicator shows before each message
 * - Spring-physics animations for message entrances
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { messages, agents } from "@/data/chatData";
import ChatBubble from "@/components/ChatBubble";
import ChatHeader from "@/components/ChatHeader";
import TypingIndicator from "@/components/TypingIndicator";
import ParticipantsSidebar from "@/components/ParticipantsSidebar";
import EndOfMeeting from "@/components/EndOfMeeting";

const HERO_BG_URL = "https://private-us-east-1.manuscdn.com/sessionFile/fehM6fXQACpDrCniomZtOm/sandbox/mLv3Guhx4D6ShWaDf8bp8v-img-1_1771425607000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmVoTTZmWFFBQ3BEckNuaW9tWnRPbS9zYW5kYm94L21MdjNHdWh4NEQ2U2hXYURmOGJwOHYtaW1nLTFfMTc3MTQyNTYwNzAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=u7kPxm5dxo-VA7KUCEY-~5Yw8-LQpX0nXAfxn9KmyaebGLBV6KaRQti88mfd5KptXuhEyZUV-8GBtov~XgDw5dQtOkMzs7J6ledtzNwsLWOElC-11jTBg0I1qbwza7sbKzcDplXMoKvns7vF4EyxmLc2CbONeUhcIBLQ1ad1lNM7abUGlQWBpdo2JU~2yng3353hLMHGAIdcilIZfGbL6UIRWkh040poKEoW9Prz~mMUeTd8Gj7NZB-BTPTrzgxSp7jBg4ouIXajGeixJj-KD7coVg2fEZ2hwc6FlQDcQItjo0m5MICey19eKd51wgSFOenQF1T4zSJCcOcVN4PTMQ__";

const MESSAGE_DELAY = 2000; // 2 seconds between messages
const TYPING_DURATION = 1200; // typing indicator shows for 1.2s

export default function Home() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAgentId, setTypingAgentId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  // Auto-scroll when new messages appear
  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isTyping, scrollToBottom]);

  // Message sequencing logic
  useEffect(() => {
    if (!hasStarted) return;
    if (currentIndex >= messages.length) {
      setIsComplete(true);
      return;
    }

    const currentMessage = messages[currentIndex];

    // For separators, show immediately and move on
    if (currentMessage.type === "separator") {
      setVisibleMessages((prev) => [...prev, currentMessage.id]);
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Show typing indicator first
    setIsTyping(true);
    setTypingAgentId(currentMessage.agentId);

    const typingTimer = setTimeout(() => {
      // Hide typing, show message
      setIsTyping(false);
      setTypingAgentId(null);
      setVisibleMessages((prev) => [...prev, currentMessage.id]);

      // Schedule next message
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, MESSAGE_DELAY);

      return () => clearTimeout(nextTimer);
    }, TYPING_DURATION);

    return () => clearTimeout(typingTimer);
  }, [currentIndex, hasStarted]);

  // Get active agent for sidebar highlighting
  const activeAgentId = typingAgentId || (
    visibleMessages.length > 0
      ? messages.find((m) => m.id === visibleMessages[visibleMessages.length - 1])?.agentId || null
      : null
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0B1120 0%, #060A14 50%, #0D0F1A 100%)",
          }}
        />
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${HERO_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Animated grid */}
        <div className="absolute inset-0 animated-grid opacity-50" />
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212, 168, 83, 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex items-stretch justify-center">
        {/* Sidebar - participants */}
        <ParticipantsSidebar activeAgentId={activeAgentId} />

        {/* Chat frame */}
        <div className="flex-1 max-w-2xl flex flex-col min-h-screen">
          {/* Header */}
          <ChatHeader
            messageCount={visibleMessages.filter(id => {
              const msg = messages.find(m => m.id === id);
              return msg && msg.type !== "separator";
            }).length}
            totalMessages={messages.filter(m => m.type !== "separator").length}
            isComplete={isComplete}
          />

          {/* Chat area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto chat-scroll py-4"
          >
            {/* Start screen */}
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full px-6 py-20"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="glass-card rounded-3xl p-8 max-w-md text-center"
                  style={{
                    boxShadow: "0 0 40px rgba(212, 168, 83, 0.08)",
                  }}
                >
                  <h2
                    className="text-2xl font-bold tracking-tight mb-1"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: "#D4A853",
                    }}
                  >
                    THE APPLE BRIEF
                  </h2>
                  <p className="text-xs text-white/30 tracking-widest uppercase mb-6">
                    An Analyst Roundtable
                  </p>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    Conference room, 42nd floor. Six analysts, one question, and a lot of data between them.
                  </p>

                  {/* Agent preview */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {Object.values(agents).map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${agent.color}10`,
                          border: `1px solid ${agent.color}20`,
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                          style={{ background: agent.avatarBg }}
                        >
                          {agent.initials}
                        </div>
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: `${agent.color}CC` }}
                        >
                          {agent.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 168, 83, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setHasStarted(true)}
                    className="px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide
                      transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #D4A853, #B8942E)",
                      color: "#0B1120",
                    }}
                  >
                    Start Roundtable
                  </motion.button>

                  <p className="mt-4 text-[10px] text-white/15 font-mono">
                    Apple 10-K SEC Filings — FY2020–FY2025
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Messages */}
            {hasStarted && (
              <div className="space-y-1">
                <AnimatePresence mode="popLayout">
                  {messages
                    .filter((msg) => visibleMessages.includes(msg.id))
                    .map((msg, index) => (
                      <ChatBubble key={msg.id} message={msg} index={index} />
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && typingAgentId && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingIndicator agentId={typingAgentId} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* End of meeting */}
                <AnimatePresence>
                  {isComplete && <EndOfMeeting />}
                </AnimatePresence>

                <div ref={chatEndRef} className="h-4" />
              </div>
            )}
          </div>

          {/* Bottom bar — fake input (decorative) */}
          <div className="glass-header px-4 py-3 flex items-center gap-3">
            <div className="flex-1 glass-card rounded-full px-4 py-2 flex items-center">
              <span className="text-xs text-white/20">
                {isComplete
                  ? "Meeting has concluded"
                  : hasStarted
                  ? "Analysts are discussing..."
                  : "Waiting for roundtable to begin..."}
              </span>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: isComplete
                  ? "rgba(255,255,255,0.05)"
                  : "linear-gradient(135deg, #D4A853, #B8942E)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isComplete ? "rgba(255,255,255,0.2)" : "#0B1120"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right spacer for symmetry on large screens */}
        <div className="hidden lg:block w-64 shrink-0" />
      </div>
    </div>
  );
}
