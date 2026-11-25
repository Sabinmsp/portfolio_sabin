/**
 * The projects shown as folders. Every line comes from the project's own
 * repository. Keep each line short.
 */

export type Project = {
  id: string;
  name: string;
  /** One short line. Keep it short. */
  line: string;
  tag: string;
  /** Leave out for private work: the folder then just opens, with no link. */
  href?: string;
  /** A real screenshot, or a typographic cover when there is none. */
  img?: string;
  cover?: { word: string; sub: string };
  color: string;
};

export const projects: Project[] = [
  { id: "signbridge", name: "SignBridge", line: "English to Auslan signs", tag: "Code Fair 2026", href: "https://github.com/Sabinmsp/coding_project_auslan", img: "/projects/signbridge.jpg", color: "#c8f560" },
  { id: "agent-office", name: "Agent Office", line: "A team of AI agents at work", tag: "AI agents", href: "https://github.com/Sabinmsp/Ai-Agents-Office", img: "/projects/agent-office.jpg", color: "#8fa8ff" },
  { id: "qx", name: "QX Lead Finder", line: "Lead finder + MCP server", tag: "MCP · client", img: "/projects/qx.jpg", color: "#ffb040" },
  { id: "postie", name: "Postie Coffee", line: "Café website + ordering", tag: "Client · live", href: "https://www.postiecoffee.com.au/", img: "/projects/postie.jpg", color: "#f5c542" },
  { id: "ndis", name: "NDIS Provider", line: "Client website", tag: "Client · live", href: "https://sweet-care-virid.vercel.app/", img: "/projects/ndis.jpg", color: "#7ad9c5" },
  { id: "gym", name: "Gym Coach AI", line: "RAG fitness coach", tag: "Build", href: "https://github.com/Sabinmsp/gym-ai-coach", img: "/projects/gym.jpg", color: "#ff8a65" },
  { id: "qlora", name: "Qwen3-14B", line: "QLoRA on one GPU", tag: "Experiment", href: "https://github.com/Sabinmsp", img: "/projects/qlora.jpg", color: "#b98cff" },
  { id: "support", name: "Support Agent", line: "RAG agent with tools", tag: "Team", href: "https://github.com/sidskarkii/Capstone-Final", img: "/projects/support.jpg", color: "#5cc8ff" },
];

/** The command palette lists these. */
export const systems = projects.map((p) => ({ id: p.id, name: p.name, tagline: p.line }));

export const LINKS = {
  resume: "/Sabin_Pradhan-Resume.pdf",
  github: "https://github.com/Sabinmsp",
  linkedin: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
  email: "sabinmsp@gmail.com",
};

/** Ask other parts of the page to open a system or ask a question. */
export const openSystem = (id: string) =>
  window.dispatchEvent(new CustomEvent("lab:open-system", { detail: id }));
export const askAssistant = (q: string) =>
  window.dispatchEvent(new CustomEvent("lab:ask", { detail: q }));
