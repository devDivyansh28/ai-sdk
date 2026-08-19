import { generateText, Output } from "ai";
import { z } from "zod";

async function implementFeature(featureRequest: string) {
  // Orchestrator: Plan the implementation
  const { output: implementationPlan } = await generateText({
    model: "google/gemini-3.1-pro-preview",
    output: Output.object({
      schema: z.object({
        files: z.array(
          z.object({
            purpose: z.string(),
            filePath: z.string(),
            changeType: z.enum(["create", "modify", "delete"]),
          }),
        ),
        estimatedComplexity: z.enum(["low", "medium", "high"]),
      }),
    }),
    instructions:
      "You are a senior software architect planning feature implementations.",
    prompt: `Analyze this feature request and create an implementation plan:
    ${featureRequest}`,
  });

  // Workers: Execute the planned changes
  const fileChanges = await Promise.all(
    implementationPlan.files.map(async (file) => {
      // Each worker is specialized for the type of change
      const workerSystemPrompt = {
        create:
          "You are an expert at implementing new files following best practices and project patterns.",
        modify:
          "You are an expert at modifying existing code while maintaining consistency and avoiding regressions.",
        delete:
          "You are an expert at safely removing code while ensuring no breaking changes.",
      }[file.changeType];

      const { output: change } = await generateText({
        model: "google/gemini-3.1-pro-preview",
        output: Output.object({
          schema: z.object({
            explanation: z.string(),
            code: z.string(),
          }),
        }),
        instructions: workerSystemPrompt,
        prompt: `Implement the changes for ${file.filePath} to support:
        ${file.purpose}

        Consider the overall feature context:
        ${featureRequest}`,
      });

      return {
        file,
        implementation: change,
      };
    }),
  );

  return {
    plan: implementationPlan,
    changes: fileChanges,
  };
}
