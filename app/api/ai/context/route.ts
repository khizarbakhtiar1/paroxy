import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { generateInsights } from "@/lib/ai/openai";

export async function GET(_req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's startup
    const startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
      include: { aiContext: true },
    });

    if (!startup) {
      return NextResponse.json({ error: "No startup found" }, { status: 404 });
    }

    return NextResponse.json({ context: startup.aiContext });
  } catch (error) {
    console.error("Get AI context error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI context" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Get or create startup
    let startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
    });

    if (!startup) {
      startup = await prisma.startup.create({
        data: {
          name: data.startupName || "My Startup",
          founderId: session.user.id,
          industry: data.industry,
          stage: data.stage || "IDEA",
        },
      });
    }

    // Create or update AI context
    const aiContext = await prisma.aIContext.upsert({
      where: { startupId: startup.id },
      update: {
        businessModel: data.businessModel,
        targetMarket: data.targetMarket,
        competitors: JSON.stringify(data.competitors || []),
        challenges: JSON.stringify(data.challenges || []),
        goals: JSON.stringify(data.goals || []),
        preferences: data.preferences ? JSON.stringify(data.preferences) : null,
      },
      create: {
        startupId: startup.id,
        businessModel: data.businessModel,
        targetMarket: data.targetMarket,
        competitors: JSON.stringify(data.competitors || []),
        challenges: JSON.stringify(data.challenges || []),
        goals: JSON.stringify(data.goals || []),
        preferences: data.preferences ? JSON.stringify(data.preferences) : null,
      },
    });

    return NextResponse.json({ context: aiContext });
  } catch (error) {
    console.error("Update AI context error:", error);
    return NextResponse.json(
      { error: "Failed to update AI context" },
      { status: 500 }
    );
  }
}

export async function PUT(_req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
      include: { aiContext: true },
    });

    if (!startup || !startup.aiContext) {
      return NextResponse.json(
        { error: "No AI context found" },
        { status: 404 }
      );
    }

    // Generate new insights
    const insights = await generateInsights({
      startupName: startup.name,
      industry: startup.industry || undefined,
      stage: startup.stage,
      businessModel: startup.aiContext.businessModel || undefined,
      targetMarket: startup.aiContext.targetMarket || undefined,
      challenges: JSON.parse(startup.aiContext.challenges || "[]") as string[],
      goals: JSON.parse(startup.aiContext.goals || "[]") as string[],
    });

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Generate insights error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}

