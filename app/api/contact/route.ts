import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { error: "Missing Formspree endpoint." },
      { status: 500 }
    );
  }

  const payload = await request.json();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Submission failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Submission failed." },
      { status: 500 }
    );
  }
}
