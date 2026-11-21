// Faint, slowly drifting "source code" behind the intro, built from this
// site's own content. Purely decorative.
const LINES = [
  "const sabin = {",
  '  name: "Sabin Pradhan",',
  '  role: "AI Engineer & Full-Stack Developer",',
  '  based: "Darwin, NT",',
  '  focus: ["RAG", "LLM apps", "grounded answers"],',
  "  study: {",
  '    degree: "Master of IT (Artificial Intelligence)",',
  '    university: "Charles Darwin University",',
  "  },",
  "  projects: [",
  '    { name: "SignBridge", signs: 3215 },',
  '    { name: "Café ordering", stack: ["Next.js", "FastAPI", "Square"] },',
  '    { name: "NDIS provider site", deploy: "Vercel" },',
  '    { name: "Qwen3-14B fine-tune", method: "QLoRA" },',
  "  ],",
  "  stack: {",
  '    ai: ["RAG", "LangChain", "Hugging Face"],',
  '    backend: ["Python", "FastAPI", "TypeScript"],',
  '    data: ["PostgreSQL", "pgvector", "Qdrant"],',
  "  },",
  "};",
  "",
  "export async function answer(question) {",
  "  const sources = await retrieve(question);",
  "  const draft = await llm(question, sources);",
  "  return verify(draft, sources);",
  "}",
  "",
];

function Column({ offset }: { offset: number }) {
  const lines = [...LINES.slice(offset), ...LINES.slice(0, offset)];
  return (
    <pre className="intro-code__col">
      {[...lines, ...lines].join("\n")}
    </pre>
  );
}

export default function IntroCode() {
  return (
    <div aria-hidden className="intro-code">
      <Column offset={0} />
      <Column offset={9} />
      <Column offset={18} />
    </div>
  );
}
