                                      // Decide bases on tool input 

// import { ToolLoopAgent, tool } from "ai";
// import { z } from "zod";

// const agent = new ToolLoopAgent({
//   model: "google/gemini-3.1-pro-preview",
//   tools: {
//     processPayment: tool({
//       inputSchema: z.object({
//         amount: z.number(),
//         recipient: z.string(),
//       }),
//       execute: async ({ amount, recipient }) =>
//         processPayment({ amount, recipient }),
//     }),
//   },
//   toolApproval: {
//     processPayment: async ({ amount }, { runtimeContext }) => {
//       if (runtimeContext.role !== "admin") {
//         return { type: "denied", reason: "Only admins can send payments" };
//       }
//       return amount > 1000 ? "user-approval" : undefined;
//     },
//   },
// });

