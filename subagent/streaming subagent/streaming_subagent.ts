import { ToolLoopAgent, toUIMessageStream, tool , readUIMessageStream, InferAgentUIMessage } from "ai";
import { z } from "zod";

// Define a subagent for research tasks
const researchSubagent = new ToolLoopAgent({
  model: "google/gemini-3.1-pro-preview",
  instructions: `You are a research agent. Complete the task autonomously.

IMPORTANT: When you have finished, write a clear summary of your findings as your final response.
This summary will be returned to the main agent, so include all relevant information.`,
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
  toModelOutput: ({ output: message }) => {
    // Extract just the final text as a summary
    const lastTextPart = message?.parts.findLast((p) => p.type === "text");
    return {
      type: "text",
      value: lastTextPart?.text ?? "Task completed.",
    };
  },
});
// Controlling Context window of main agent...so we can control what output must be returned by subagent to feed the main agent so that's it'c context window may remain clean....so for this we can use toModelOutput

// Main agent uses the research tool
const mainAgent = new ToolLoopAgent({
  model: "google/gemini-3.1-pro-preview",
  instructions: "You are a helpful assistant that can delegate research tasks.",
  tools: {
    research: researchTool,
  },
});

// Export the main agent message type for the chat UI
export type MainAgentMessage = InferAgentUIMessage<typeof mainAgent>;
