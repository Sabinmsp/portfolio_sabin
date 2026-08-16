import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social preview card. Uses next/og, which ships with Next.js, so this adds
 * no dependency. Rendered at build time and reused for Twitter too.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, AI and Software Engineer`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9a9aa4",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 99,
                background: "#5fae7e",
              }}
            />
            {site.name} / {site.role}
          </div>

          <div
            style={{
              marginTop: 44,
              fontSize: 74,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            I build AI systems that hold up when the model does not.
          </div>

          <div
            style={{
              marginTop: 32,
              width: 160,
              height: 6,
              background: "#5fae7e",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 28,
            color: "#9a9aa4",
            borderTop: "1px solid #26262b",
            paddingTop: 28,
          }}
        >
          {["RAG", "LLM apps", "Python", "FastAPI", "Next.js"].map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
