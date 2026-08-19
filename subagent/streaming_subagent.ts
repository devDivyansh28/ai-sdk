import { ToolLoopAgent, toUIMessageStream, tool , readUIMessageStream } from "ai";
import { z } from "zod";

// Define a subagent for research tasks
const researchSubagent = new ToolLoopAgent({
  model: "google/gemini-3.1-pro-preview",
  instructions: `You are a research agent.
Summarize your findings in your final response.`,
  tools: {
    // read: readFileTool,
    // search: searchTool,
  },
});

// Create a tool that delegates to the subagent
const researchTool = tool({
  description: "Research a topic or question in depth.",
  inputSchema: z.object({
    task: z.string().describe("The research task to complete"),
  }),
  execute: async function* ({ task }, { abortSignal }) {
    // Start the subagent with streaming
    const result = await researchSubagent.stream({
      prompt: task,
      abortSignal,
    });

    // Each iteration yields a complete, accumulated UIMessage
    for await (const message of readUIMessageStream({
      stream: toUIMessageStream({ stream: result.stream }),
    })) {
      yield message;
    }
  },
});

// Main agent uses the research tool
const mainAgent = new ToolLoopAgent({
  model: "google/gemini-3.1-pro-preview",
  instructions: "You are a helpful assistant that can delegate research tasks.",
  tools: {
    research: researchTool,
  },
});
