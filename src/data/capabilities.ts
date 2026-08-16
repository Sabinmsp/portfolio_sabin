/**
 * Capability groups.
 *
 * Every entry is used in at least one of the three projects listed on this
 * page. Things that exist only as a plan are deliberately absent: CareerOS
 * names Qdrant and Redis under "deliberately not built", and only Qdrant
 * appears here because Gym AI Coach ships a working adapter for it.
 */
export type CapabilityGroup = {
  key: string;
  title: string;
  items: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    key: "01",
    title: "AI systems",
    items: [
      "RAG pipelines",
      "Embeddings",
      "Vector search",
      "Structured outputs",
      "Local models",
      "Agent control loops",
    ],
  },
  {
    key: "02",
    title: "Backend",
    items: [
      "Python",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Postgres",
      "Schema validation",
    ],
  },
  {
    key: "03",
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    key: "04",
    title: "Tooling",
    items: ["Docker", "Git", "Vitest", "Vercel"],
  },
];

/** The through line a reviewer should take away from the projects. */
export const buildPrinciples: { title: string; body: string }[] = [
  {
    title: "Validate at the boundary",
    body: "Model output is parsed against a schema or an allowlist before anything downstream sees it. Structured output settings shape the reply; the validator is what decides whether it is used.",
  },
  {
    title: "Always have a path that works",
    body: "Each project runs without its model provider. A deterministic scorer, a template responder, or a mock brain answers instead, and the interface says which one did.",
  },
  {
    title: "Make the pipeline inspectable",
    body: "Retrieved chunks, stage timings, and whether the answer came from the model or the fallback are surfaced rather than hidden, because that is what makes a failure debuggable.",
  },
];
