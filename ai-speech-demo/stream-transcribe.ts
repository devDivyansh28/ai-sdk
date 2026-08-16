// import { experimental_streamTranscribe as streamTranscribe } from "ai";
// import { gateway } from "@ai-sdk/gateway";

// const result = streamTranscribe({
//   model: gateway.transcriptionModel("openai/gpt-realtime-whisper"),
//   audio: / ReadableStream<Uint8Array | string>
//   inputAudioFormat: { type: "audio/pcm", rate: 24000 },
// });

// for await (const part of result.fullStream) {
//   if (part.type === "transcript-delta") {
//     process.stdout.write(part.delta);
//   }

//   if (part.type === "transcript-final") {
//     console.log("final:", part.text);
//   }
// }

// console.log(await result.text);
