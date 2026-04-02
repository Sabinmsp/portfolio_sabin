import { NextRequest, NextResponse } from "next/server";

/** Must match Vercel / .env.local exactly (server-only, never NEXT_PUBLIC_). */
const ENV_ACCESS_KEY = "WEB3FORMS_ACCESS_KEY";

const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

const MAX = {
  name: 120,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Web3Forms may return `message` at top level or under `body`. */
function extractWeb3Message(raw: Record<string, unknown>): string | undefined {
  if (typeof raw.message === "string") return raw.message;
  const body = raw.body;
  if (body && typeof body === "object" && body !== null && "message" in body) {
    const m = (body as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  return undefined;
}

function isWeb3Success(raw: Record<string, unknown>): boolean {
  return raw.success === true;
}

export async function POST(req: NextRequest) {
  const accessKey = process.env[ENV_ACCESS_KEY]?.trim();

  if (!accessKey) {
    console.error(
      `[contact] Missing env: ${ENV_ACCESS_KEY} is not set (check Vercel Project → Settings → Environment Variables)`
    );
    return NextResponse.json(
      {
        success: false,
        message: `Server misconfiguration: ${ENV_ACCESS_KEY} is not set. Add it in Vercel and redeploy.`,
      },
      { status: 503 }
    );
  }

  console.log(`[contact] ${ENV_ACCESS_KEY} is configured (secret not logged)`);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const honey = typeof b._honey === "string" ? b._honey : "";
  if (honey.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || name.length > MAX.name) {
    return NextResponse.json({ success: false, message: "Please enter a valid name." }, { status: 400 });
  }
  if (!email || email.length > MAX.email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });
  }
  if (!subject || subject.length > MAX.subject) {
    return NextResponse.json({ success: false, message: "Please enter a subject." }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX.message) {
    return NextResponse.json(
      { success: false, message: "Message must be between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const web3Payload = {
    access_key: accessKey,
    name,
    email,
    subject,
    message,
  };

  let upstream: Response;
  try {
    upstream = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(web3Payload),
    });
  } catch (err) {
    console.error("[contact] Fetch to Web3Forms failed:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, message: "Failed to reach mail service." },
      { status: 502 }
    );
  }

  const responseText = await upstream.text();
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(responseText) as Record<string, unknown>;
  } catch {
    console.error("[contact] Web3Forms non-JSON response", {
      httpStatus: upstream.status,
      contentType: upstream.headers.get("content-type"),
      preview: responseText.slice(0, 200),
    });
    return NextResponse.json(
      {
        success: false,
        message: "Mail service returned an unexpected response.",
        web3forms: { rawPreview: responseText.slice(0, 500) },
      },
      { status: 502 }
    );
  }

  console.log("[contact] Web3Forms response", {
    httpStatus: upstream.status,
    ok: upstream.ok,
    successField: raw.success,
    keys: Object.keys(raw),
  });

  if (upstream.ok && isWeb3Success(raw)) {
    return NextResponse.json({ success: true });
  }

  const msg = extractWeb3Message(raw) ?? "Failed to send message.";
  const statusOut = upstream.status >= 400 ? upstream.status : 502;

  return NextResponse.json(
    {
      success: false,
      message: msg,
      web3forms: raw,
    },
    { status: statusOut }
  );
}
