/*
 * Chat Data — The Apple Brief Analyst Roundtable
 * Dark Glass Trading Floor design: each agent has a signature glow color
 */

export interface Agent {
  id: string;
  name: string;
  role: string;
  year?: string;
  color: string;
  glowColor: string;
  initials: string;
  avatarBg: string;
}

export interface ChatMessage {
  id: number;
  agentId: string;
  text: string;
  type: "question" | "analysis" | "summary" | "separator";
}

export const agents: Record<string, Agent> = {
  chief: {
    id: "chief",
    name: "Chief Analyst",
    role: "Lead",
    color: "#D4A853",
    glowColor: "rgba(212, 168, 83, 0.3)",
    initials: "CA",
    avatarBg: "linear-gradient(135deg, #D4A853, #B8942E)",
  },
  marcus: {
    id: "marcus",
    name: "Marcus",
    role: "The Veteran",
    year: "FY2020",
    color: "#8B9DC3",
    glowColor: "rgba(139, 157, 195, 0.3)",
    initials: "M",
    avatarBg: "linear-gradient(135deg, #8B9DC3, #6B7DAA)",
  },
  priya: {
    id: "priya",
    name: "Priya",
    role: "Growth Evangelist",
    year: "FY2021",
    color: "#C4687A",
    glowColor: "rgba(196, 104, 122, 0.3)",
    initials: "P",
    avatarBg: "linear-gradient(135deg, #C4687A, #A84D5F)",
  },
  james: {
    id: "james",
    name: "James",
    role: "The Contrarian",
    year: "FY2022",
    color: "#4A9E8E",
    glowColor: "rgba(74, 158, 142, 0.3)",
    initials: "J",
    avatarBg: "linear-gradient(135deg, #4A9E8E, #3A7E72)",
  },
  sofia: {
    id: "sofia",
    name: "Sofia",
    role: "Macro Thinker",
    year: "FY2023",
    color: "#E8A87C",
    glowColor: "rgba(232, 168, 124, 0.3)",
    initials: "S",
    avatarBg: "linear-gradient(135deg, #E8A87C, #D08A5E)",
  },
  derek: {
    id: "derek",
    name: "Derek",
    role: "The Quant",
    year: "FY2024",
    color: "#6B8DB2",
    glowColor: "rgba(107, 141, 178, 0.3)",
    initials: "D",
    avatarBg: "linear-gradient(135deg, #6B8DB2, #4F7196)",
  },
  anika: {
    id: "anika",
    name: "Anika",
    role: "The Closer",
    year: "FY2025",
    color: "#8B7EC8",
    glowColor: "rgba(139, 126, 200, 0.3)",
    initials: "A",
    avatarBg: "linear-gradient(135deg, #8B7EC8, #6F62AC)",
  },
};

export const messages: ChatMessage[] = [
  {
    id: 1,
    agentId: "chief",
    text: "What can we conclude about Apple's revenue growth in international markets versus the US domestic market?",
    type: "question",
  },
  {
    id: 2,
    agentId: "separator",
    text: "",
    type: "separator",
  },
  {
    id: 3,
    agentId: "marcus",
    text: "Look, the Americas pulled in $124.6 billion versus international markets at $149.9 billion — that's a 55-45 split favoring overseas. International grew 6.4% while Americas managed just 6.6%, so basically dead heat on growth rates.",
    type: "analysis",
  },
  {
    id: 4,
    agentId: "priya",
    text: "Marcus, hold on — that's where the story gets absolutely electric! Americas hit $153.3 billion in my year, jumping from your $124.6 billion, which works out to roughly a 23% surge. But here's the kicker — international markets exploded to $212.5 billion from your $149.9 billion, that's a blazing 42% growth rate that just obliterated the domestic momentum.",
    type: "analysis",
  },
  {
    id: 5,
    agentId: "james",
    text: "Priya, that's exactly where the wheels come off the bus. Americas hit $169.7 billion in my year, barely crawling up from your $153.3 billion — that's just an 11% bump. Meanwhile, international markets actually contracted to $224.7 billion from your $212.5 billion peak, which nobody's talking about because everyone's fixated on the growth narrative.",
    type: "analysis",
  },
  {
    id: 6,
    agentId: "sofia",
    text: "James, you have to zoom out here — this isn't just an Apple story, this is a China story. Americas dropped to $162.6 billion in my year from your $169.7 billion, but the real headline is international markets collapsing to $220.7 billion, which means we're looking at a synchronized global slowdown hitting Apple's most critical growth engines simultaneously.",
    type: "analysis",
  },
  {
    id: 7,
    agentId: "derek",
    text: "Sofia, you're absolutely right about the synchronized slowdown, but if you run the numbers on my FY2024 data, the Americas actually staged a modest recovery to $167.0 billion from your $162.6 billion — that's a 2.7% uptick. Meanwhile, international markets continued their descent, hitting just $224.0 billion, which means we're looking at a three-year CAGR of negative 1.8% for overseas markets since Priya's peak.",
    type: "analysis",
  },
  {
    id: 8,
    agentId: "anika",
    text: "Here's what none of us are saying out loud — Derek's three-year CAGR is actually the setup for the real story. Americas hit $178.4 billion in my year, jumping from Derek's $167.0 billion, which means we're looking at a 6.8% surge that completely flips Sofia's domestic decline narrative. Meanwhile, international markets — and I'm talking Europe, Greater China, Japan, and Rest of Asia Pacific combined — pulled in $237.8 billion, which works out to roughly a 57-43 split favoring overseas, and that international total grew 6.4% year-over-year, so the real question becomes whether we're finally seeing synchronized recovery across both theaters.",
    type: "analysis",
  },
  {
    id: 9,
    agentId: "separator",
    text: "",
    type: "separator",
  },
  {
    id: 10,
    agentId: "chief",
    text: "Alright, team, let's cut through the noise. Anika's 6.8% growth in the Americas alongside her 6.4% international growth definitively signals the end of that domestic decline, and remember James' warning about the international contraction trend? That inflection point has passed. The key trend here is synchronized growth, albeit fragile, returning across both theaters. We need to recalibrate our models immediately, because next year's numbers will determine whether this is a blip or a sustained recovery.",
    type: "summary",
  },
];
