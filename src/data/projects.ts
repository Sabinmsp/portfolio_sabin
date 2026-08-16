import type { ProjectVisualSpec } from "@/components/ProjectVisual";

/**
 * Project records.
 *
 * Every claim here is traceable to the project's own repository. Stack entries
 * are dependencies that actually appear in that project's manifest, and the
 * engineering notes describe code that exists. Nothing aspirational.
 */
export type ProjectItem = {
  year: string;
  title: string;
  /** One line: what problem the project addresses. */
  problem: string;
  /** The technically interesting part, for a reviewer skimming for signal. */
  engineering: string;
  stack: string[];
  /** Expandable specifics. Kept short; each line is a discussable fact. */
  details: string[];
  links: { live?: string; github?: string };
  visual: ProjectVisualSpec;
};

export const projects: ProjectItem[] = [
  {
    year: "2026",
    title: "CareerOS",
    problem:
      "Students get told they are not ready for a role without being told which evidence is missing.",
    engineering:
      "The score is computed deterministically before any model runs: tier weighted coverage over requirements pulled from the posting, with quoted evidence on both sides. Claude then runs under a hand written JSON Schema and Zod re-validates the reply. If it refuses, truncates, or drifts from the schema, the deterministic pass answers instead, so the product runs with no API key at all.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Postgres",
      "Claude API",
      "Zod",
      "Vitest",
      "Docker",
    ],
    details: [
      "Zod validates the request, then re-validates the model's reply. Structured outputs constrain the shape; Zod is what the code actually trusts.",
      "Weighted coverage scoring, critical 3, important 2, optional 1, so every point traces back to a named skill and a line in each document.",
      "Each analysis is persisted as JSONB with its source, ai or fallback, and the UI labels which one answered.",
      "The system prompt forbids inventing experience and requires near verbatim evidence, but the schema check and the fallback are what enforce it.",
      "Unit tests cover the requirement extraction and scoring logic.",
    ],
    links: {
      live: "https://careeros-lemon.vercel.app",
      github: "https://github.com/Sabinmsp/careeros",
    },
    visual: {
      kind: "flow",
      input: "profile + job description",
      steps: [
        "validate the request with Zod",
        "deterministic weighted scoring",
        "Claude, constrained by JSON Schema",
        "re-validate, or fall back",
      ],
      output: "gaps, a project, a seven-day plan",
      caption: "POST /api/analyze, end to end.",
    },
  },
  {
    year: "2026",
    title: "Gym AI Coach",
    problem:
      "Fitness answers from a language model are confident whether or not they are grounded in anything.",
    engineering:
      "A full retrieval pipeline behind one endpoint: rate limit, profile load, cache lookup, top k cosine retrieval, a strict grounding prompt, then generation. Every stage emits a name, a duration, and a status, and a debug panel in the UI replays them alongside the retrieved chunks, so retrieval is inspectable rather than a black box. With no API key configured it still answers, quoting only what it retrieved.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "RAG",
      "OpenAI API",
      "Qdrant",
    ],
    details: [
      "Top k cosine retrieval over a curated corpus, embeddings L2 normalised.",
      "Vector store and profile store sit behind factories: in memory by default, Qdrant and Supabase when environment variables are present.",
      "LRU cache keyed on the normalised question plus a profile hash, with a 30 minute TTL.",
      "Fixed window rate limit, 15 requests per minute per client.",
      "Falls back to a template responder that quotes retrieved chunks only, so it degrades instead of hallucinating.",
    ],
    links: { github: "https://github.com/Sabinmsp/gym-ai-coach" },
    visual: {
      kind: "flow",
      input: "a fitness question",
      steps: [
        "rate limit, then cache lookup",
        "top k cosine retrieval",
        "grounded generation",
        "stage timings to the debug panel",
      ],
      output: "an answer tied to its chunks",
      caption: "POST /api/ask, every stage timed.",
    },
  },
  {
    year: "2026",
    title: "AI RC Car Simulator",
    problem:
      "Letting a language model drive something has an obvious failure mode: the model emits an unsafe or malformed action.",
    engineering:
      "A controller layer sits between the model and the vehicle. A local model returns strict JSON, the backend extracts and normalises it, and only four allowlisted high level actions can reach the simulator. The model never touches raw motor values, the tick loop is capped, and if Ollama is unreachable a deterministic mock brain takes over so the loop keeps running.",
    stack: ["Python", "FastAPI", "WebSockets", "Ollama"],
    details: [
      "Per tick: camera state goes to the model, a JSON decision comes back, it is validated, applied, and broadcast over the WebSocket.",
      "An ALLOWED_ACTIONS allowlist rejects anything the model invents; unknown actions are coerced, not executed.",
      "Runs a local model through Ollama, so no request leaves the machine.",
      "A tick cap bounds the search loop rather than trusting the model to stop.",
    ],
    links: { github: "https://github.com/Sabinmsp/ai_rc_car_simulator" },
    visual: {
      kind: "flow",
      input: "a natural language command",
      steps: [
        "camera state to the local LLM",
        "strict JSON decision back",
        "allowlist validates the action",
      ],
      output: "a safe action over the WebSocket",
      caption: "Control loop, model kept behind a gate.",
    },
  },
];
