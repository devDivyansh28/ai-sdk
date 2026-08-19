// "use client";

// import { useChat } from "@ai-sdk/react";
// import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai";

// export default function Chat() {
//   const { messages, addToolApprovalResponse } = useChat({
//     sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
//   });

//   return messages.map((message) =>
//     message.parts.map((part) => {
//       if (part.type !== "tool-runCommand") {
//         return null;
//       }

//       if (part.state === "approval-requested" && !part.approval.isAutomatic) {
//         return (
//           <div key={part.toolCallId}>
//             <button
//               onClick={() =>
//                 addToolApprovalResponse({
//                   id: part.approval.id,
//                   approved: true,
//                 })
//               }
//             >
//               Approve
//             </button>
//             <button
//               onClick={() =>
//                 addToolApprovalResponse({
//                   id: part.approval.id,
//                   approved: false,
//                 })
//               }
//             >
//               Deny
//             </button>
//           </div>
//         );
//       }
//     }),
//   );
// }



// Security Considerations


// Trust model

// In the standard useChat pattern, the server rebuilds the conversation from the messages the client sends each turn. The server does not persist conversation state between requests. This means the message history is client-controlled input.

// Tool approvals reconstructed from this history are re-validated before execution: the tool input is checked against the tool's schema, and the approval policy is re-evaluated. However, without additional protection, a client that crafts a valid-looking approval for a schema-conforming input can bypass the human-in-the-loop step.

// If your tools perform sensitive operations (modifying data, spending money, calling external APIs, accessing private resources), use experimental_toolApprovalSecret to cryptographically bind approvals to the server that issued them.


// const result = await streamText({
//   model: "google/gemini-3.1-pro-preview",
//   tools: { deleteFile, runQuery },
//   toolApproval: { deleteFile: "user-approval", runQuery: "user-approval" },
//   experimental_toolApprovalSecret: process.env.TOOL_APPROVAL_SECRET,
//   messages,
// });

// Also remember that subagent tools can not use the tool approval request...