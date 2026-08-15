import { generateText, stepCountIs, tool } from "ai";
import { z } from "zod";

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5",
  stopWhen: stepCountIs(5),
  tools: {
    getWeather: tool({
      description: "Get the current weather for a location",
      inputSchema: z.object({
        location: z.string().describe("City name, e.g. San Francisco"),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
        condition: "sunny",
      }),
    }),
  },
  prompt: "What's the weather in Tokyo?",
});

console.log(text);
