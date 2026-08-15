import {streamText} from "ai";
import 'dotenv/config'

async function main(){
    const result = streamText({
      model: "openai/gpt-5-mini",
      prompt: "Invent a holiday and describe its traditions ",
    });
    

    for await (const textPart of result.textStream){
       process.stdout.write(textPart);
    }

    console.log();
    console.log('Token Usage:' , await result.usage);
    console.log('Finish Reason' , await result.finishReason)
}

main().catch(console.error)


// // For Structured Output you can use : 
// import { generateObject } from 'ai';
// import { z } from 'zod';
 
// const { object } = await generateObject({
//   model: 'anthropic/claude-sonnet-5',
//   schema: z.object({
//     name: z.string(),
//     age: z.number(),
//     city: z.string(),
//   }),
//   prompt: 'Extract: John is 30 years old and lives in NYC.',
// });
 
// console.log(object); // { name: 'John', age: 30, city: 'NYC' }