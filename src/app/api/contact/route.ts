import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    const msg = await db.contactMessage.create({
      data: {
        name: String(body.name).slice(0, 200),
        email: String(body.email).slice(0, 200),
        phone: body.phone ? String(body.phone).slice(0, 50) : null,
        subject: body.subject ? String(body.subject).slice(0, 200) : null,
        message: String(body.message).slice(0, 5000),
      },
    });

    return NextResponse.json({ ok: true, id: msg.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
