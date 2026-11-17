import { NextResponse } from "next/server";
import { getTopStatsSummary } from "@/lib/topstats";

export const revalidate = 300;

export async function GET() {
  try {
    return NextResponse.json(await getTopStatsSummary());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load TopStats.gg data" }, { status: 502 });
  }
}
