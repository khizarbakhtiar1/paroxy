import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface FounderContext {
  startupName?: string;
  industry?: string;
  stage?: string;
  businessModel?: string;
  targetMarket?: string;
  challenges?: string[];
  goals?: string[];
  recentActivity?: string[];
}

export async function generateAIResponse(
  messages: AIMessage[],
  context?: FounderContext
): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(context);

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate AI response");
  }
}

function buildSystemPrompt(context?: FounderContext): string {
  let prompt = `You are PAROXY AI, an intelligent Founder Twin assistant designed to help solo entrepreneurs and founders succeed. You have deep knowledge in:

- Legal compliance and document generation
- Financial management and fundraising
- Marketing and customer acquisition
- Product development and MVP building
- Team building and co-founder relations
- Mental health and founder wellness
- Strategic decision making

You are proactive, insightful, and always provide actionable advice tailored to the founder's specific situation.`;

  if (context) {
    prompt += `\n\nCURRENT FOUNDER CONTEXT:`;
    
    if (context.startupName) prompt += `\n- Startup: ${context.startupName}`;
    if (context.industry) prompt += `\n- Industry: ${context.industry}`;
    if (context.stage) prompt += `\n- Stage: ${context.stage}`;
    if (context.businessModel) prompt += `\n- Business Model: ${context.businessModel}`;
    if (context.targetMarket) prompt += `\n- Target Market: ${context.targetMarket}`;
    
    if (context.challenges && context.challenges.length > 0) {
      prompt += `\n- Current Challenges: ${context.challenges.join(", ")}`;
    }
    
    if (context.goals && context.goals.length > 0) {
      prompt += `\n- Goals: ${context.goals.join(", ")}`;
    }
    
    if (context.recentActivity && context.recentActivity.length > 0) {
      prompt += `\n- Recent Activity: ${context.recentActivity.join(", ")}`;
    }
  }

  prompt += `\n\nAlways provide specific, actionable advice. Use emojis sparingly and only when appropriate. Be encouraging but realistic.`;

  return prompt;
}

export async function generateInsights(context: FounderContext): Promise<string[]> {
  try {
    const prompt = `Based on this founder's context, generate 3 specific, actionable insights:

${JSON.stringify(context, null, 2)}

Return insights as a JSON array of strings. Each insight should be concise (1-2 sentences) and actionable.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI business advisor generating actionable insights for founders.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || "[]";
    
    try {
      return JSON.parse(content);
    } catch {
      // Fallback if response is not valid JSON
      return [content];
    }
  } catch (error) {
    console.error("Insight generation error:", error);
    return ["Unable to generate insights at this time."];
  }
}

export async function analyzeDocument(
  documentType: string,
  content: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a legal document analyzer. Analyze the following ${documentType} and provide:
1. Key points and clauses
2. Potential risks or concerns
3. Suggestions for improvement
4. Compliance considerations`,
        },
        { role: "user", content },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || "Unable to analyze document.";
  } catch (error) {
    console.error("Document analysis error:", error);
    throw new Error("Failed to analyze document");
  }
}

export async function generateLegalDocument(
  documentType: string,
  params: Record<string, unknown>
): Promise<string> {
  try {
    const prompt = `Generate a professional ${documentType} with the following parameters:

${JSON.stringify(params, null, 2)}

Provide a complete, legally sound document that includes all necessary clauses and sections.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert legal document generator. Create comprehensive, professional legal documents.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    });

    return response.choices[0]?.message?.content || "Unable to generate document.";
  } catch (error) {
    console.error("Document generation error:", error);
    throw new Error("Failed to generate legal document");
  }
}

export async function analyzeCashFlow(
  transactions: Array<{ amount: number; type: string; date: string }>
): Promise<{
  insights: string[];
  recommendations: string[];
  runway: string;
}> {
  try {
    const prompt = `Analyze these financial transactions and provide:
1. Key insights about spending patterns
2. Recommendations for optimization
3. Estimated cash runway

Transactions:
${JSON.stringify(transactions, null, 2)}

Return as JSON: { insights: string[], recommendations: string[], runway: string }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a financial analyst specializing in startup finances.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    
    try {
      return JSON.parse(content);
    } catch {
      return {
        insights: ["Unable to analyze cash flow"],
        recommendations: [],
        runway: "Unknown",
      };
    }
  } catch (error) {
    console.error("Cash flow analysis error:", error);
    throw new Error("Failed to analyze cash flow");
  }
}

export async function generateMarketingContent(
  type: "social" | "email" | "blog",
  topic: string,
  context: FounderContext
): Promise<string> {
  try {
    const prompt = `Generate ${type} content about: ${topic}

Context: ${JSON.stringify(context, null, 2)}

Make it engaging, professional, and aligned with the startup's goals.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a marketing content creator. Create compelling ${type} content.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "Unable to generate content.";
  } catch (error) {
    console.error("Content generation error:", error);
    throw new Error("Failed to generate marketing content");
  }
}

