import { generateText , generateImage} from "ai";

import fs from "node:fs";
import "dotenv/config";
import { error } from "node:console";

// async function main(){
//   // nano banana models use generateText function and return uint8array and image generation models use only generate image function
//   const result = await generateText({
//     model: "google/gemini-3.1-flash-lite",
//     prompt: "A serene mountain landscape at sunset with a calm lake reflection",
//   });

//   // Nano Banana models return images in result.files with uint8Array
//   const imageFiles = result.files.filter((f) => f.mediaType?.startsWith("image/"));

//   if (imageFiles.length > 0){
//     const extension = imageFiles[0]?.mediaType?.split('/')[1] || 'png';
//     fs.writeFileSync(`output.${extension}`, imageFiles[0]!.uint8Array);
//     console.log(`Image saved to output.${extension}`);
//   }
// }

// main().catch(console.error);


async function main(){

     const result = await generateImage({
       model: "bfl/flux-2-flex",
       prompt: "A vibrant coral reef with tropical fish",
       aspectRatio: "4:3",
     });
    
     console.log(result)
     // Image-only models return images in result.images with base64
     const image = result.images[0];
     const buffer = Buffer.from(image!.base64, "base64");
     fs.writeFileSync("outputflux.png", buffer);
}

main().catch(console.error)