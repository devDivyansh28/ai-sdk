import {
  experimental_generateSpeech as generateSpeech,
  experimental_transcribe as transcribe,
} from "ai";
import { gateway } from "@ai-sdk/gateway";
import { writeFile } from "node:fs/promises";
import "dotenv/config";

async function main() {
  const text = "Hii how are you...what's going on your end ?";

  // Text to speech
  const speech = await generateSpeech({
    model: gateway.speechModel("xai/grok-tts"),
    text,
    voice: "eve",
    outputFormat: "mp3",
  });
  await writeFile("speech.mp3", speech.audio.uint8Array);
  console.log("Saved speech.mp3");

  // Speech to text: transcribe the audio we just generated
  const transcript = await transcribe({
    model: gateway.transcriptionModel("xai/grok-stt"),
    audio: speech.audio.uint8Array,
  });
  console.log("Transcript:", transcript.text);
}

main().catch(console.error);
