// import { createMem0 } from "@mem0/vercel-ai-provider";
// import { ToolLoopAgent } from "ai";

// const mem0 = createMem0({
//   provider: "openai",
//   mem0ApiKey: process.env.MEM0_API_KEY,
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const agent = new ToolLoopAgent({
//   model: mem0("gpt-4.1", { user_id: "user-123" }),
// });

// const { text } = await agent.generate({
//   prompt: "Remember that my favorite editor is Neovim",
// });


// Mem0 works across multiple LLM providers  (OpenAI , Anthropic , Google , GRoq , Cohere ). we can also manage memnoris explicitly