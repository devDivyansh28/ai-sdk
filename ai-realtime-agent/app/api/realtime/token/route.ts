import {gateway} from "@ai-sdk/gateway"

export async function POST(){
    const { token, url } = await gateway.experimental_realtime.getToken({
      model: 'openai/gpt-realtime-mini',
    });

    return Response.json({token , url , tools : []})
}