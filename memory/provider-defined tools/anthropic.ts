import { anthropic } from "@ai-sdk/anthropic";
import { ToolLoopAgent } from "ai";

const memory = anthropic.tools.memory_20250818({
  execute: async (action) => {
    // `action` contains `command`, `path`, and other fields
    // depending on the command (view, create, str_replace,
    // insert, delete, rename).
    // Implement your storage backend here.
    // Return the result as a string.
  },
});

const agent = new ToolLoopAgent({
  model: "anthropic/claude-haiku-4.5",
  tools: { memory },
});

const result = await agent.generate({
  prompt: "Remember that my favorite editor is Neovim",
});
