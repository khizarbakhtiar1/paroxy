import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { generateLegalDocument } from "@/lib/ai/openai";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentType, params } = await req.json();

    if (!documentType) {
      return NextResponse.json(
        { error: "Document type is required" },
        { status: 400 }
      );
    }

    // Get or create startup
    let startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
    });

    if (!startup) {
      startup = await prisma.startup.create({
        data: {
          name: "My Startup",
          founderId: session.user.id,
        },
      });
    }

    // Generate document content using AI
    const content = await generateLegalDocument(documentType, params);

    // Create document in database
    const document = await prisma.legalDocument.create({
      data: {
        title: `${documentType.replace(/_/g, " ")} - ${new Date().toLocaleDateString()}`,
        type: documentType,
        content,
        status: "DRAFT",
        jurisdiction: params.jurisdiction || "United States",
        startupId: startup.id,
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ id: document.id, content });
  } catch (error) {
    console.error("Document generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}

