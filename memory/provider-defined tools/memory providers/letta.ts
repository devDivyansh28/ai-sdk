import { lettaCloud } from "@letta-ai/vercel-ai-sdk-provider";
import { ToolLoopAgent } from "ai";

const agent = new ToolLoopAgent({
  model: lettaCloud(),
  tools: {
    core_memory_append: lettaCloud.tool("core_memory_append"),
    memory_insert: lettaCloud.tool("memory_insert"),
    memory_replace: lettaCloud.tool("memory_replace"),
  },
  providerOptions: {
    letta: {
      agent: { id: "your-agent-id" },
    },
  },
});

const stream = agent.stream({
  prompt: "What do you remember about me?",
});
