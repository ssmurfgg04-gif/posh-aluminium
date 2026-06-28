import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.projectType) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, projectType" },
        { status: 400 }
      );
    }

    const quote = await db.quoteRequest.create({
      data: {
        name: String(body.name).slice(0, 200),
        email: String(body.email).slice(0, 200),
        phone: String(body.phone).slice(0, 50),
        projectType: String(body.projectType).slice(0, 50),
        products: String(body.products ?? "[]").slice(0, 2000),
        budget: body.budget ? String(body.budget).slice(0, 50) : null,
        measurements: body.measurements ? String(body.measurements).slice(0, 2000) : null,
        message: body.message ? String(body.message).slice(0, 5000) : "",
      },
    });

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const quotes = await db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ quotes });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
