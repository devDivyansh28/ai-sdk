import { experimental_generateVideo as generateVideo } from "ai";
import fs from "node:fs"
import 'dotenv/config'
import { error } from "node:console";

async function main(){
    const result = await generateVideo({
      model: "google/veo-3.1-generate-001",
      prompt: "A serene mountain landscape at sunset with clouds drifting by",
      aspectRatio: "16:9",
      duration: 4,
    });
     
    if(!result.videos[0]){
        console.log("Some Error Occured")
    }else{
        fs.writeFileSync('output-test.mp4',result.videos[0].uint8Array)
        console.log('Video Saved to output-test.mp4 successfully')
    }
}

main().catch(console.error)