import { NextRequest, NextResponse } from "next/server";
import { redis, SIGNUPS_KEY } from "@/lib/redis";
import { games } from "@/lib/games";

const gameIds = new Set(games.map((g) => g.id));

export async function GET() {
  const signups = (await redis.hgetall<Record<string, string>>(
    SIGNUPS_KEY
  )) || {};
  return NextResponse.json({ signups });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const gameId = body?.gameId;
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!gameId || !gameIds.has(gameId)) {
    return NextResponse.json({ error: "Unknown game." }, { status: 400 });
  }
  if (!name || name.length > 60) {
    return NextResponse.json(
      { error: "Please enter a valid name." },
      { status: 400 }
    );
  }

  await redis.hset(SIGNUPS_KEY, { [gameId]: name });
  const signups =
    (await redis.hgetall<Record<string, string>>(SIGNUPS_KEY)) || {};
  return NextResponse.json({ signups });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const gameId = body?.gameId;

  if (!gameId || !gameIds.has(gameId)) {
    return NextResponse.json({ error: "Unknown game." }, { status: 400 });
  }

  await redis.hdel(SIGNUPS_KEY, gameId);
  const signups =
    (await redis.hgetall<Record<string, string>>(SIGNUPS_KEY)) || {};
  return NextResponse.json({ signups });
}
