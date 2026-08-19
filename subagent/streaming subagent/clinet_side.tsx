// "use client";

// import { useChat } from "@ai-sdk/react";
// import type { MainAgentMessage } from "@/lib/agents";

// export function Chat() {
//   const { messages } = useChat<MainAgentMessage>();

//   return (
//     <div>
//       {messages.map((message) =>
//         message.parts.map((part, i) => {
//           switch (part.type) {
//             case "text":
//               return <p key={i}>{part.text}</p>;
//             case "tool-research":
//               return (
//                 <div>
//                   {part.state !== "input-streaming" && (
//                     <div>Research: {part.input.task}</div>
//                   )}
//                   {part.state === "output-available" && (
//                     <div>
//                       {part.output.parts.map((nestedPart, i) => {
//                         switch (nestedPart.type) {
//                           case "text":
//                             return <p key={i}>{nestedPart.text}</p>;
//                           default:
//                             return null;
//                         }
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             default:
//               return null;
//           }
//         }),
//       )}
//     </div>
//   );
// }
