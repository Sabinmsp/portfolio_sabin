const ITEMS = [
  "RAG pipelines",
  "LLM apps",
  "FastAPI",
  "Next.js",
  "LangChain",
  "Qdrant",
  "pgvector",
  "QLoRA fine-tuning",
  "Square payments",
  "Python",
  "TypeScript",
];

/** A slow, endless band of skills. Pauses when hovered. */
export default function Marquee() {
  const track = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="marquee__item">{item}</span>
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label={ITEMS.join(", ")}>
      {track(false)}
      {track(true)}
    </div>
  );
}
