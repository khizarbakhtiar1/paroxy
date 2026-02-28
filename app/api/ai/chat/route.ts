import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { generateAIResponse, AIMessage } from "@/lib/ai/openai";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Get user's startup and AI context
    const startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
      include: { aiContext: true },
    });

    const context = startup?.aiContext
      ? {
          startupName: startup.name,
          industry: startup.industry || undefined,
          stage: startup.stage,
          businessModel: startup.aiContext.businessModel || undefined,
          targetMarket: startup.aiContext.targetMarket || undefined,
          challenges: JSON.parse(startup.aiContext.challenges || "[]") as string[],
          goals: JSON.parse(startup.aiContext.goals || "[]") as string[],
        }
      : undefined;

    // Generate AI response
    const response = await generateAIResponse(messages as AIMessage[], context);

    // Save conversation
    await prisma.aIConversation.create({
      data: {
        userId: session.user.id,
        messages: JSON.stringify([
          ...messages,
          { role: "assistant", content: response },
        ]),
        context: context ? JSON.stringify(context) : null,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

