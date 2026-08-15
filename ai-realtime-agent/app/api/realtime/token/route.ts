import {gateway} from "@ai-sdk/gateway"

export async function POST(){
    const { token, url } = await gateway.experimental_realtime.getToken({
      model: "xai/grok-voice-think-fast-2.0",
    });

    return Response.json({token , url , tools : []})
}