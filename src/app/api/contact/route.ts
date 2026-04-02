import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const MAX = {
  name: 120,
  email: 254,
  topic: 200,
  message: 5000,
} as const;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Contact is not configured on the server." },
      { status: 503 }
    );
  }

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
  const topic = typeof b.topic === "string" ? b.topic.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || name.length > MAX.name) {
    return NextResponse.json({ success: false, message: "Please enter a valid name." }, { status: 400 });
  }
  if (!email || email.length > MAX.email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });
  }
  if (!topic || topic.length > MAX.topic) {
    return NextResponse.json({ success: false, message: "Please enter a subject." }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX.message) {
    return NextResponse.json(
      { success: false, message: "Message must be between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("subject", `Portfolio contact: ${topic}`);
  formData.append("message", message);

  try {
    const res = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
    const data = (await res.json()) as { success?: boolean; message?: string };

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    const msg =
      data.message && data.message.length < 160 ? data.message : "Could not send message. Try again later.";
    return NextResponse.json({ success: false, message: msg }, { status: 502 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Network error while contacting the mail service." },
      { status: 502 }
    );
  }
}
