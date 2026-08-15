"use client";

/**
 * Project visuals.
 *
 * Two kinds, both drawn in the ledger idiom:
 *   - "shot"  a real screenshot of the running project
 *   - "flow"  a designed diagram of the pipeline the project actually runs,
 *             built from the project's own description. Nothing invented.
 */

export type ProjectVisualSpec =
  | { kind: "shot"; src: string; alt: string; caption: string }
  | {
      kind: "flow";
      input: string;
      steps: string[];
      output: string;
      caption: string;
    };

export default function ProjectVisual({
  visual,
}: {
  visual: ProjectVisualSpec;
}) {
  if (visual.kind === "shot") {
    return (
      <figure>
        <div className="visual-frame">
          <img
            src={visual.src}
            alt={visual.alt}
            width={858}
            height={660}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="visual-caption">{visual.caption}</figcaption>
      </figure>
    );
  }

  const nodes = [
    { label: "in", text: visual.input, tone: "edge" as const },
    ...visual.steps.map((text, i) => ({
      label: String(i + 1).padStart(2, "0"),
      text,
      tone: "step" as const,
    })),
    { label: "out", text: visual.output, tone: "edge" as const },
  ];

  return (
    <figure>
      <div className="visual-frame visual-frame--flow flex flex-col justify-center p-5 md:p-6">
        {/* One continuous spine. The accent is the signal running through it. */}
        <div
          className="flex flex-col gap-4"
          style={{ borderLeft: "2px solid var(--accent)" }}
        >
          {nodes.map((node) => (
            <div key={node.label} className="relative flex items-start gap-3 pl-5">
              <span
                aria-hidden
                className="absolute top-[0.62em] left-0 h-[2px] w-3"
                style={{
                  background:
                    node.tone === "edge"
                      ? "var(--border-strong)"
                      : "var(--accent)",
                }}
              />
              <span
                className="meta-plain shrink-0"
                style={{
                  color:
                    node.tone === "edge" ? "var(--text-dim)" : "var(--accent)",
                }}
              >
                {node.label}
              </span>
              <span
                className="t-label font-mono"
                style={{
                  color:
                    node.tone === "edge" ? "var(--text-dim)" : "var(--text)",
                }}
              >
                {node.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="visual-caption">{visual.caption}</figcaption>
    </figure>
  );
}
