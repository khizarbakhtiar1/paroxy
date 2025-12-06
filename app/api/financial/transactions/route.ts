import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startup = await prisma.startup.findFirst({
      where: { founderId: session.user.id },
    });

    if (!startup) {
      return NextResponse.json({ transactions: [] });
    }

    const transactions = await prisma.financialTransaction.findMany({
      where: { startupId: startup.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Get transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
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

    const { type, amount, category, description, date } = await req.json();

    if (!type || !amount || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Create transaction
    const transaction = await prisma.financialTransaction.create({
      data: {
        type,
        amount,
        category,
        description,
        date: date ? new Date(date) : new Date(),
        startupId: startup.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    console.error("Create transaction error:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

