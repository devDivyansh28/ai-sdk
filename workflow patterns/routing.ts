import { generateText, Output } from "ai";
import { z } from "zod";

async function handleCustomerQuery(query: string) {
  const model = "google/gemini-3.1-pro-preview";

  // First step: Classify the query type
  const { output: classification } = await generateText({
    model,
    output: Output.object({
      schema: z.object({
        reasoning: z.string(),
        type: z.enum(["general", "refund", "technical"]),
        complexity: z.enum(["simple", "complex"]),
      }),
    }),
    prompt: `Classify this customer query:
    ${query}

    Determine:
    1. Query type (general, refund, or technical)
    2. Complexity (simple or complex)
    3. Brief reasoning for classification`,
  });

  // Route based on classification
  // Set model and system prompt based on query type and complexity
  const { text: response } = await generateText({
    model:
      classification.complexity === "simple"
        ? "openai/gpt-4o-mini"
        : "openai/o4-mini",
    instructions: {
      general:
        "You are an expert customer service agent handling general inquiries.",
      refund:
        "You are a customer service agent specializing in refund requests. Follow company policy and collect necessary information.",
      technical:
        "You are a technical support specialist with deep product knowledge. Focus on clear step-by-step troubleshooting.",
    }[classification.type],
    prompt: query,
  });

  return { response, classification };
}
