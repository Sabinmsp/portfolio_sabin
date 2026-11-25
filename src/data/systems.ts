/**
 * Every system shown on the site. Each node and claim here comes from the
 * project's own repository (README, source or test reports). If something is
 * built but not deployed, `status` says so.
 */

export type SystemNode = {
  id: string;
  label: string;
  /** Short line shown under the label. */
  kind: string;
  /** Position on the diagram, in percent of the canvas. */
  x: number;
  y: number;
  /** What the node does and why it was built that way. */
  detail: string;
  tech?: string[];
  /** Marks the stages Sabin built in a team project. */
  mine?: boolean;
};

export type SystemEdge = { from: string; to: string; label?: string };

export type System = {
  id: string;
  name: string;
  tagline: string;
  /** Plain-English status, never stronger than the truth. */
  status: string;
  statusTone: "live" | "built" | "prototype" | "team";
  summary: string;
  facts: { value: string; label: string }[];
  nodes: SystemNode[];
  edges: SystemEdge[];
  /** Order the auto-tour walks the nodes in. */
  tour: string[];
  links: { label: string; href: string }[];
  media?: { src: string; alt: string; width: number; height: number };
  note?: string;
};

export const systems: System[] = [
  {
    id: "signbridge",
    name: "SignBridge",
    tagline: "Spoken, typed or PDF English into recorded Auslan signs",
    status: "Prototype · CDU IT Code Fair 2026",
    statusTone: "prototype",
    summary:
      "Speak, type or drop in a PDF and recorded Auslan signs play in sequence on a 2D figure. Words without a sign are fingerspelled and labelled. For a PDF, the app picks out key points with page numbers first.",
    facts: [
      { value: "3,215", label: "Auslan signs extracted with MediaPipe" },
      { value: "83.9%", label: "of words signed across 30 test sentences" },
      { value: "88", label: "JS tests, plus Python and browser suites" },
    ],
    nodes: [
      { id: "in", label: "Input", kind: "voice · text · PDF", x: 7, y: 50, detail: "Three ways in: press Speak, type a sentence, or drop in a PDF. Everything after this point works the same way.", tech: ["Web Speech API", "pdf.js"] },
      { id: "points", label: "Key points", kind: "offline summariser", x: 27, y: 22, detail: "For a PDF, text is read per page in the browser and an offline summariser picks out key points with their page numbers. The visitor chooses which point to sign.", tech: ["pdf.js", "JavaScript"] },
      { id: "claude", label: "Plain-English rewrite", kind: "optional · Claude", x: 47, y: 22, detail: "An optional Claude rewrite of the key points into plain English. Every fact in the rewrite is re-checked against the PDF before it is used.", tech: ["Claude API", "Python"] },
      { id: "plan", label: "Sign planner", kind: "rule-based order", x: 47, y: 72, detail: "Turns English into a sign plan using a simplified, rule-based order. It is an accessibility prototype, not a translator, and the order has not been reviewed by Deaf signers.", tech: ["planner.js"] },
      { id: "lib", label: "Sign library", kind: "3,215 signs", x: 70, y: 36, detail: "3,215 signs with two recorded takes each, extracted to motion files with MediaPipe. Automated checks validate every sign; flagged signs are re-extracted from their second take.", tech: ["MediaPipe", "OpenCV", "NumPy"] },
      { id: "spell", label: "Fingerspelling", kind: "26 letter clips", x: 70, y: 76, detail: "Any word without a sign is fingerspelled from 26 letter clips and labelled on screen, so nothing is silently skipped.", tech: ["JavaScript"] },
      { id: "fig", label: "2D figure", kind: "playback", x: 92, y: 55, detail: "Signs play in sequence on a 2D figure, with the current word shown above it. Right and left hands are colour-coded.", tech: ["Canvas", "JavaScript"] },
    ],
    edges: [
      { from: "in", to: "points", label: "PDF" },
      { from: "points", to: "claude" },
      { from: "claude", to: "plan" },
      { from: "points", to: "plan" },
      { from: "in", to: "plan", label: "voice / text" },
      { from: "plan", to: "lib" },
      { from: "plan", to: "spell" },
      { from: "lib", to: "fig" },
      { from: "spell", to: "fig" },
    ],
    tour: ["in", "points", "claude", "plan", "lib", "spell", "fig"],
    links: [{ label: "Code", href: "https://github.com/Sabinmsp/coding_project_auslan" }],
    media: { src: "/projects/signbridge.jpg", alt: "SignBridge fingerspelling the word NAME on its 2D figure", width: 1200, height: 833 },
    note: "Accessibility prototype, not an Auslan translator. Nothing has yet been evaluated with Deaf viewers.",
  },
  {
    id: "postie",
    name: "Postie Coffee",
    tagline: "A Darwin café's website, plus a full ordering and kitchen system",
    status: "Website live · ordering built, switched off",
    statusTone: "live",
    summary:
      "The café's public website is live. Behind one environment switch sits a complete ordering stack: customer ordering, server-side pricing, a live staff board that moves orders from New to Ready, order tracking and receipt printing. It stays off until the owner decides on online ordering.",
    facts: [
      { value: "6", label: "order states, New to Completed" },
      { value: "2", label: "rate limits per order: IP and phone" },
      { value: "1", label: "switch turns ordering on or off" },
    ],
    nodes: [
      { id: "menu", label: "Customer ordering", kind: "menu · cart", x: 7, y: 50, detail: "Customers pick items from the menu and send an order with a name and phone number. Menu data is separate from the UI, so the public menu and ordering share it.", tech: ["Next.js 15", "React 19", "Tailwind"] },
      { id: "api", label: "Order API", kind: "validate · limit", x: 28, y: 50, detail: "Refuses orders while ordering is switched off. Rate-limits by IP and by phone, caps body size, and validates the order with Zod before touching the database.", tech: ["Route handler", "Zod"] },
      { id: "price", label: "Server pricing", kind: "never trust the client", x: 48, y: 20, detail: "Prices come from the database, not the browser. Duplicate lines are merged, unavailable items are refused, and totals are computed on the server with a sensible cap.", tech: ["TypeScript"] },
      { id: "db", label: "Supabase", kind: "Postgres · RLS", x: 48, y: 80, detail: "orders and order_items tables with check constraints and row-level security. The public can read the menu; only staff can read orders; writes go through the server.", tech: ["Supabase", "Postgres"] },
      { id: "board", label: "Staff board", kind: "New → Ready", x: 72, y: 50, detail: "Staff accept, prepare and complete orders across columns: New, Accepted, Preparing, Ready, Completed. Realtime updates are the fast path, with polling as a backstop so no order is missed.", tech: ["Supabase Realtime", "React"] },
      { id: "track", label: "Order tracking", kind: "private link", x: 93, y: 22, detail: "Each order gets a random tracking token, so customers can follow their order's status without an account.", tech: ["UUID token"] },
      { id: "print", label: "Receipt printer", kind: "ESC/POS", x: 93, y: 78, detail: "Kitchen dockets print as ESC/POS: over USB serial from the staff board, or over the shop network from the counter till.", tech: ["Web Serial", "ESC/POS", "node:net"] },
    ],
    edges: [
      { from: "menu", to: "api", label: "POST order" },
      { from: "api", to: "price" },
      { from: "price", to: "db" },
      { from: "api", to: "db", label: "insert" },
      { from: "db", to: "board", label: "realtime" },
      { from: "board", to: "track", label: "status" },
      { from: "board", to: "print" },
    ],
    tour: ["menu", "api", "price", "db", "board", "track", "print"],
    links: [{ label: "Live site", href: "https://www.postiecoffee.com.au/" }],
    note: "The live site is the menu, hours and location. Online ordering is built and tested but stays off until the café owner chooses to turn it on.",
  },
  {
    id: "careeros",
    name: "CareerOS",
    tagline: "Compares a student's evidence against a real job description",
    status: "Deployed MVP · no real users yet",
    statusTone: "built",
    summary:
      "Takes a student profile and a job description and returns a match score with evidence on both sides, ranked missing skills, one recommended project and a seven-day plan. If the model fails in any way, a deterministic engine still returns a complete, honest answer.",
    facts: [
      { value: "23", label: "tests over scoring and extraction" },
      { value: "2", label: "engines: Claude, plus a deterministic fallback" },
      { value: "0", label: "invented experience: answers cite the user's own text" },
    ],
    nodes: [
      { id: "input", label: "Profile + job ad", kind: "user input", x: 7, y: 50, detail: "A student profile and a target job description. Both are validated with Zod; bad input returns field-level errors.", tech: ["Next.js", "Zod"] },
      { id: "det", label: "Deterministic pass", kind: "weighted coverage", x: 29, y: 25, detail: "Extracts requirements from a curated skill lexicon, splits must-have from nice-to-have, and scores weighted coverage. Every point traces to a line in the posting and a line in the profile.", tech: ["TypeScript"] },
      { id: "llm", label: "Claude analysis", kind: "structured output", x: 50, y: 25, detail: "Claude gets the profile, the job ad and the deterministic pass as a reference it may override. Its reply is constrained to a JSON Schema.", tech: ["Anthropic API", "JSON Schema"] },
      { id: "check", label: "Re-validate", kind: "Zod is what we trust", x: 50, y: 75, detail: "The model's reply is validated again with Zod. A refusal, truncation, parse failure or schema violation all fail the same way.", tech: ["Zod"] },
      { id: "fallback", label: "Fallback", kind: "never an error page", x: 29, y: 75, detail: "On any failure, the deterministic engine returns a complete, schema-valid analysis with real evidence, marked with a 'Deterministic fallback' badge.", tech: ["TypeScript"] },
      { id: "store", label: "Postgres", kind: "Neon · JSONB", x: 72, y: 50, detail: "Profiles and analyses are saved, with a record of whether the AI or the fallback produced each result.", tech: ["Neon", "Postgres"] },
      { id: "dash", label: "Dashboard", kind: "score · gaps · plan", x: 93, y: 50, detail: "Match score, evidence, ranked missing skills, a recommended project and a seven-day plan. It never claims the student will be hired.", tech: ["React", "SVG"] },
    ],
    edges: [
      { from: "input", to: "det" },
      { from: "det", to: "llm", label: "reference" },
      { from: "llm", to: "check" },
      { from: "check", to: "fallback", label: "on failure" },
      { from: "check", to: "store", label: "valid" },
      { from: "fallback", to: "store" },
      { from: "store", to: "dash" },
    ],
    tour: ["input", "det", "llm", "check", "fallback", "store", "dash"],
    links: [{ label: "Code", href: "https://github.com/Sabinmsp/careeros" }],
    note: "A production-style deployed MVP. It has no real users or measured outcomes yet.",
  },
  {
    id: "triage",
    name: "Housing Repair Triage",
    tagline: "Ranks NT public housing repair reports, safety first, with reasons",
    status: "Team project · I built intake, extraction and ranking",
    statusTone: "team",
    summary:
      "Reads free-text repair reports from tenants and ranks them: safety first, then urgency, then earliest report. The model only reads; code decides. Every queue position comes with an explanation for the coordinator and an SMS for the tenant.",
    facts: [
      { value: "1", label: "model call in the whole pipeline" },
      { value: "3", label: "stages I built: intake, extraction, ranking" },
      { value: "0", label: "numbers or ranks produced by the model" },
    ],
    nodes: [
      { id: "intake", label: "Intake", kind: "stage 1", x: 7, y: 50, mine: true, detail: "Wraps each raw report, stamps an id and the original report time, and stores it behind a repository interface. A file with a missing field is skipped and listed, never guessed.", tech: ["Python", "SQLite"] },
      { id: "extract", label: "Extraction", kind: "stage 2 · the only LLM call", x: 27, y: 50, mine: true, detail: "The model sees the report and fault names only, never tiers or points. It returns facts with quoted spans as structured output, validated with Pydantic. Retry once, then flag for a human.", tech: ["LLM structured output", "Pydantic"] },
      { id: "verify", label: "Quote check", kind: "teammates", x: 47, y: 22, detail: "Checks every quoted span really appears in the tenant's text.", tech: ["Python"] },
      { id: "eval", label: "Evaluation", kind: "teammates", x: 47, y: 78, detail: "Assigns a tier from the tier table, an urgency tally and a safety level.", tech: ["Python"] },
      { id: "rank", label: "Ranking", kind: "stage 6 · pure function", x: 68, y: 50, mine: true, detail: "A pure sort: safety first, then urgency, then earliest report. Jobs with no tier and no safety trigger go to a review band instead of being guessed. Builds a reasoning trace for every job.", tech: ["Python", "Hypothesis tests"] },
      { id: "coord", label: "Coordinator view", kind: "explained queue", x: 91, y: 25, mine: true, detail: "Renders each job's reasoning trace: the matched fault, verified quotes, tier, safety reason and position.", tech: ["Templates"] },
      { id: "sms", label: "Tenant SMS", kind: "plain reason", x: 91, y: 75, mine: true, detail: "A plain-language message to the tenant, rendered from the same trace, so the tenant and coordinator see the same reason.", tech: ["Templates"] },
    ],
    edges: [
      { from: "intake", to: "extract" },
      { from: "extract", to: "verify" },
      { from: "extract", to: "eval" },
      { from: "verify", to: "rank" },
      { from: "eval", to: "rank" },
      { from: "rank", to: "coord" },
      { from: "rank", to: "sms" },
    ],
    tour: ["intake", "extract", "verify", "eval", "rank", "coord", "sms"],
    links: [
      { label: "My stages", href: "https://github.com/Sabinmsp/try-house" },
      { label: "Full pipeline", href: "https://github.com/Sabinmsp/ai_project_housing" },
    ],
    note: "Model reads, code decides: nothing the model returns is a number, tier or rank.",
  },
  {
    id: "qlora",
    name: "Qwen3-14B Fine-Tuning",
    tagline: "A 14-billion-parameter model fine-tuned on a single GPU",
    status: "Experiment",
    statusTone: "built",
    summary:
      "Fine-tuned Qwen3-14B on UltraChat with 4-bit QLoRA: the base model is loaded in 4-bit and frozen, and only small LoRA adapters are trained, which is what lets a 14B model fit on one GPU.",
    facts: [
      { value: "14B", label: "parameter base model" },
      { value: "4-bit", label: "quantised, frozen base" },
      { value: "1", label: "GPU for training" },
    ],
    nodes: [
      { id: "base", label: "Qwen3-14B", kind: "base model", x: 8, y: 50, detail: "The pretrained 14-billion-parameter base model. Its weights are never updated.", tech: ["Hugging Face"] },
      { id: "quant", label: "4-bit quantisation", kind: "QLoRA", x: 30, y: 50, detail: "The base is loaded in 4-bit precision and frozen, cutting memory enough to fit a 14B model on a single GPU.", tech: ["QLoRA"] },
      { id: "data", label: "UltraChat", kind: "training data", x: 30, y: 16, detail: "Multi-turn conversations used as the supervised fine-tuning dataset.", tech: ["Hugging Face Datasets"] },
      { id: "lora", label: "LoRA adapters", kind: "the only trained weights", x: 54, y: 50, detail: "Small low-rank adapter matrices are added to the frozen model. Only these are trained.", tech: ["PEFT"] },
      { id: "train", label: "Supervised fine-tuning", kind: "trainer", x: 54, y: 84, detail: "The training loop runs supervised fine-tuning over UltraChat, updating the adapters only.", tech: ["TRL"] },
      { id: "infer", label: "Base + adapter", kind: "inference", x: 85, y: 50, detail: "For inference the trained adapter is used together with the base model, so the result is the original model plus a small, swappable set of weights.", tech: ["PEFT"] },
    ],
    edges: [
      { from: "base", to: "quant" },
      { from: "data", to: "lora", label: "examples" },
      { from: "quant", to: "lora", label: "frozen" },
      { from: "train", to: "lora", label: "updates" },
      { from: "lora", to: "infer" },
    ],
    tour: ["base", "quant", "data", "lora", "train", "infer"],
    links: [],
  },
  {
    id: "gym",
    name: "Gym Coach AI",
    tagline: "A fitness coach whose answers are tailored to each user's profile",
    status: "Built",
    statusTone: "built",
    summary:
      "A RAG layer tailors answers to each user's profile, with vector search (in-memory or Qdrant), switchable OpenAI or Ollama embeddings, a response cache and rate limiting. Next.js and TypeScript.",
    facts: [
      { value: "2", label: "vector stores: in-memory or Qdrant" },
      { value: "3", label: "embedding options, with a hashed fallback" },
      { value: "1", label: "cache in front of the model" },
    ],
    nodes: [
      { id: "q", label: "Question + profile", kind: "user", x: 8, y: 50, detail: "The user's question, together with their fitness profile.", tech: ["Next.js"] },
      { id: "guard", label: "Rate limit + cache", kind: "API route", x: 28, y: 50, detail: "Requests are rate limited, and repeated questions are answered from a response cache.", tech: ["TypeScript"] },
      { id: "emb", label: "Embeddings", kind: "OpenAI · Ollama · hashed", x: 50, y: 24, detail: "Text is embedded with OpenAI or Ollama, switchable by config, with a hashed fallback so it still runs without either.", tech: ["OpenAI", "Ollama"] },
      { id: "vec", label: "Vector search", kind: "in-memory · Qdrant", x: 50, y: 76, detail: "Finds the most relevant entries, in memory or in Qdrant.", tech: ["Qdrant"] },
      { id: "llm", label: "LLM answer", kind: "grounded in context", x: 74, y: 50, detail: "The model answers using the retrieved context and the user's profile.", tech: ["LLM API"] },
      { id: "out", label: "Coach reply", kind: "tailored", x: 93, y: 50, detail: "The tailored answer is returned and cached.", tech: ["React"] },
    ],
    edges: [
      { from: "q", to: "guard" },
      { from: "guard", to: "emb" },
      { from: "emb", to: "vec" },
      { from: "vec", to: "llm", label: "context" },
      { from: "llm", to: "out" },
    ],
    tour: ["q", "guard", "emb", "vec", "llm", "out"],
    links: [{ label: "Code", href: "https://github.com/Sabinmsp/gym-ai-coach" }],
  },
];

/** Work that doesn't get a full diagram. */
export const otherWork = [
  {
    name: "Website for an NDIS Provider",
    detail: "Designed and built a Darwin NDIS provider's website from the client's brief and deployed it on Vercel.",
    tag: "Client · live",
    href: "https://sweet-care-virid.vercel.app/",
    linkLabel: "Live site",
  },
  {
    name: "Customer Support Agent",
    detail: "Capstone team project: an e-commerce support agent using FastAPI, LangChain and RAG, with tool calling for order lookups.",
    tag: "Team project",
    href: "https://github.com/sidskarkii/Capstone-Final",
    linkLabel: "Code",
  },
];

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
