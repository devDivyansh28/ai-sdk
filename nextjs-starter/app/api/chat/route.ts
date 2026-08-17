import {
    streamText,
    UIMessage,
    convertToModelMessages,
    createUIMessageStreamResponse,
    toUIMessageStream,
    tool,
} from "ai";
import {z} from "zod";

import 'dotenv/config'

export async function POST(req: Request) {

    const {messages} : {messages : UIMessage[]} = await req.json();

    const result = streamText({
      model: "openai/gpt-5-nano",
      messages: await convertToModelMessages(messages),
      tools: {
        weather: tool({
          description: "Get the weather in a location (fahrenheit)",
          inputSchema: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }) => {
            const temperature = Math.round(Math.random() * (90 - 32) + 32);
            return {
              location,
              temperature,
            };
          },
        }),
      },
    });

    console.log(result)
   
    return createUIMessageStreamResponse({
        stream : toUIMessageStream({stream : result.stream})
    })
}