/**
 * The assistant's only knowledge: short, verified notes drawn from the
 * projects' own repositories and this site. It never generates new facts;
 * it retrieves the best-matching note and shows where it came from.
 */

export type Source =
  | { kind: "system"; id: string; label: string }
  | { kind: "link"; href: string; label: string };

export type Note = {
  id: string;
  keywords: string[];
  answer: string;
  sources: Source[];
};

export const SUGGESTED = [
  "What AI systems has Sabin built?",
  "Show me his production engineering experience.",
  "Which project demonstrates AI automation?",
  "What technologies does he work with?",
  "Why should I hire him?",
];

export const NOTES: Note[] = [
  {
    id: "ai-systems",
    keywords: ["systems", "built", "build", "llm", "machine", "learning", "models", "portfolio", "list", "all"],
    answer:
      "Five AI systems, each with its architecture on this page: SignBridge (English to recorded Auslan signs, CDU IT Code Fair 2026), CareerOS (Claude analysis with a deterministic fallback), a housing repair triage pipeline (team project; he built intake, LLM extraction and ranking), Gym Coach AI (RAG over a user's profile) and a Qwen3-14B QLoRA fine-tune on one GPU.",
    sources: [
      { kind: "system", id: "signbridge", label: "SignBridge" },
      { kind: "system", id: "careeros", label: "CareerOS" },
      { kind: "system", id: "triage", label: "Housing triage" },
    ],
  },
  {
    id: "production",
    keywords: ["production", "experience", "professional", "client", "clients", "real", "live", "deployed", "shipped", "freelance", "delivered", "industry", "job"],
    answer:
      "Client work in Darwin: Postie Coffee's website is live, and he built its full ordering stack behind a switch (server-side pricing, Supabase with row-level security, a staff board from New to Ready, order tracking and ESC/POS receipt printing). It stays off until the owner decides on online ordering. He also designed, built and deployed an NDIS provider's website from the client's brief. CareerOS is a deployed MVP, though it has no real users yet.",
    sources: [
      { kind: "system", id: "postie", label: "Postie system" },
      { kind: "link", href: "https://sweet-care-virid.vercel.app/", label: "NDIS site" },
      { kind: "system", id: "careeros", label: "CareerOS" },
    ],
  },
  {
    id: "automation",
    keywords: ["automation", "automate", "automated", "pipeline", "workflow", "agent", "agents", "triage", "process"],
    answer:
      "The housing repair triage pipeline. It reads free-text repair reports and ranks them safety first, then urgency, then earliest report. He built intake, the extraction stage (the only model call: structured output validated with Pydantic, retry once, then flag for a human) and the ranking stage, a pure function that also writes a coordinator explanation and a tenant SMS. CareerOS is another end-to-end pipeline, from input to a saved analysis.",
    sources: [
      { kind: "system", id: "triage", label: "Triage pipeline" },
      { kind: "system", id: "careeros", label: "CareerOS" },
    ],
  },
  {
    id: "tech",
    keywords: ["technologies", "technology", "tech", "stack", "tools", "languages", "frameworks", "python", "typescript", "skills", "use"],
    answer:
      "AI: RAG, LangChain, the Claude and OpenAI APIs, Hugging Face with PEFT and TRL, MediaPipe. Backend: Python, FastAPI, TypeScript, Node.js, with Zod and Pydantic for validation. Data: PostgreSQL, Supabase, pgvector, Qdrant, SQLite. Web: Next.js, React, Tailwind, Vercel and Docker.",
    sources: [{ kind: "link", href: "#lab", label: "Stack card" }],
  },
  {
    id: "hire",
    keywords: ["hire", "why", "should", "strengths", "strength", "good", "fit", "recommend", "stand", "out", "different"],
    answer:
      "The evidence on this site: he ships to real clients (Postie Coffee, an NDIS provider); he builds AI that is checked rather than trusted, with validated outputs, verified quotes and deterministic fallbacks; he tests his work (88 JS tests plus browser suites on SignBridge, 23 on CareerOS); and SignBridge earned recognition at the CDU IT Code Fair 2026. He is studying a Master of IT in AI at CDU and is open to AI engineering roles.",
    sources: [
      { kind: "link", href: "#lab", label: "Lab dashboard" },
      { kind: "system", id: "signbridge", label: "SignBridge" },
      { kind: "link", href: "#contact", label: "Contact" },
    ],
  },
  {
    id: "signbridge",
    keywords: ["signbridge", "auslan", "sign", "signs", "deaf", "accessibility", "mediapipe", "fingerspelling", "code", "fair"],
    answer:
      "SignBridge turns spoken, typed or PDF English into recorded Auslan signs on a 2D figure. It uses 3,215 signs extracted with MediaPipe and fingerspells words with no sign. On 30 test sentences it signed 83.9% of words. For PDFs it picks key points, with an optional Claude rewrite whose facts are re-checked against the PDF. It is an accessibility prototype, not a translator, and hasn't been evaluated with Deaf viewers yet.",
    sources: [
      { kind: "system", id: "signbridge", label: "SignBridge diagram" },
      { kind: "link", href: "https://github.com/Sabinmsp/coding_project_auslan", label: "Code" },
    ],
  },
  {
    id: "postie",
    keywords: ["postie", "coffee", "cafe", "café", "ordering", "orders", "kitchen", "restaurant", "supabase", "printer"],
    answer:
      "Postie Coffee is a Darwin café. Its website is live. The ordering system is built: customers order, the server re-prices every item from the database, orders land in Supabase, and staff move them from New to Accepted, Preparing, Ready and Completed, with tracking links and ESC/POS receipt printing. One switch keeps ordering off until the owner chooses to launch it.",
    sources: [
      { kind: "system", id: "postie", label: "Postie diagram" },
      { kind: "link", href: "https://www.postiecoffee.com.au/", label: "Live site" },
    ],
  },
  {
    id: "careeros",
    keywords: ["careeros", "career", "job", "resume", "employability", "gap", "score", "claude", "fallback"],
    answer:
      "CareerOS compares a student's profile with a real job description and returns a match score with evidence on both sides, ranked missing skills, a recommended project and a seven-day plan. Claude does the analysis under a JSON Schema, Zod re-validates it, and any failure falls back to a deterministic engine, so users never see an error page. It's a deployed MVP with 23 tests and no real users yet.",
    sources: [
      { kind: "system", id: "careeros", label: "CareerOS diagram" },
      { kind: "link", href: "https://github.com/Sabinmsp/careeros", label: "Code" },
    ],
  },
  {
    id: "triage",
    keywords: ["housing", "repair", "maintenance", "tenant", "ranking", "rank", "safety", "team", "teamwork"],
    answer:
      "A team project that ranks NT public housing repair reports, safety first. His stages: intake, extraction (the only model call, which returns quoted facts, never scores) and ranking (a pure sort with a reasoning trace for every job). The rule is: the model reads, code decides.",
    sources: [
      { kind: "system", id: "triage", label: "Triage diagram" },
      { kind: "link", href: "https://github.com/Sabinmsp/try-house", label: "His stages" },
    ],
  },
  {
    id: "qlora",
    keywords: ["qwen", "qlora", "lora", "fine", "tuning", "finetune", "fine-tuning", "gpu", "peft", "trl", "ultrachat", "training", "train"],
    answer:
      "He fine-tuned Qwen3-14B on UltraChat with 4-bit QLoRA: the base model is loaded in 4-bit and frozen, and only small LoRA adapters are trained with PEFT and TRL. That's what fits a 14-billion-parameter model on a single GPU.",
    sources: [{ kind: "system", id: "qlora", label: "QLoRA diagram" }],
  },
  {
    id: "gym",
    keywords: ["gym", "fitness", "coach", "rag", "retrieval", "vector", "embeddings", "qdrant", "ollama"],
    answer:
      "Gym Coach AI is a fitness coach whose RAG layer tailors answers to each user's profile, with vector search in memory or in Qdrant, switchable OpenAI or Ollama embeddings, a response cache and rate limiting. Built with Next.js and TypeScript.",
    sources: [
      { kind: "system", id: "gym", label: "Gym Coach diagram" },
      { kind: "link", href: "https://github.com/Sabinmsp/gym-ai-coach", label: "Code" },
    ],
  },
  {
    id: "education",
    keywords: ["education", "study", "studying", "degree", "university", "master", "masters", "bachelor", "cdu", "qualification"],
    answer:
      "He's studying a Master of Information Technology (Artificial Intelligence) at Charles Darwin University, 2026 to 2027, after a Bachelor of Information Technology at Victoria University in Sydney, 2023 to 2025.",
    sources: [{ kind: "link", href: "#lab", label: "Education card" }],
  },
  {
    id: "award",
    keywords: ["award", "awards", "achievement", "achievements", "recognition", "won", "prize", "competition"],
    answer:
      "SignBridge was recognised at the CDU IT Code Fair 2026.",
    sources: [{ kind: "system", id: "signbridge", label: "SignBridge" }],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "available", "availability", "location", "where", "based", "darwin", "relocate", "linkedin", "github"],
    answer:
      "He's based in Darwin, NT and open to AI engineering roles. Email sabinmsp@gmail.com, or use the form at the bottom of the page. GitHub and LinkedIn are linked there too.",
    sources: [
      { kind: "link", href: "#contact", label: "Contact" },
      { kind: "link", href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/", label: "LinkedIn" },
    ],
  },
  {
    id: "ndis",
    keywords: ["ndis", "provider", "website", "websites", "web", "design", "vercel"],
    answer:
      "He designed and built a Darwin NDIS provider's website from the client's brief and deployed it on Vercel.",
    sources: [{ kind: "link", href: "https://sweet-care-virid.vercel.app/", label: "Live site" }],
  },
  {
    id: "support",
    keywords: ["support", "customer", "ecommerce", "e-commerce", "langchain", "fastapi", "tool", "calling", "capstone"],
    answer:
      "A capstone team project: an e-commerce support agent using FastAPI, LangChain and RAG, with tool calling for order lookups.",
    sources: [{ kind: "link", href: "https://github.com/sidskarkii/Capstone-Final", label: "Code" }],
  },
];

const STOP = new Set(
  "a an the is are was were be been of to in on for and or with what which who how does do did has have his him he me show tell about can could would you your this that there it its i my sabin s".split(" "),
);

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9é\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Scores every note against the question and returns the best, or null. */
export function retrieve(question: string): { note: Note; score: number } | null {
  const q = tokens(question);
  if (!q.length) return null;
  let best: { note: Note; score: number } | null = null;
  for (const note of NOTES) {
    const kw = new Set(note.keywords);
    const body = new Set(tokens(note.answer));
    let score = 0;
    for (const t of q) {
      if (kw.has(t)) score += 3;
      else if ([...kw].some((k) => k.length > 3 && (t.startsWith(k) || k.startsWith(t)))) score += 2;
      else if (body.has(t)) score += 1;
    }
    if (!best || score > best.score) best = { note, score };
  }
  return best && best.score >= 3 ? best : null;
}

export const FALLBACK =
  "I don't have a verified note on that, so I won't guess. Try one of the suggested questions, or ask Sabin directly at sabinmsp@gmail.com.";
