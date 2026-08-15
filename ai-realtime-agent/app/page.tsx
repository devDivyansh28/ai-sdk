"use client";
import router from "next/router";

import { experimental_useRealtime as useRealtime } from "@ai-sdk/react";
import { gateway } from "@ai-sdk/gateway";
import { useMemo } from "react";

export default function Page() {

  const model = useMemo(
    () => gateway.experimental_realtime("openai/gpt-realtime-mini"),
    [],
  );

  const {
    status,
    isCapturing,
    connect,
    disconnect,
    startAudioCapture,
    stopAudioCapture,
  } = useRealtime({
    model,
    api: { token: "/api/realtime/token" },
    // sessionConfig: {
    //   voice: "Eve",
    //   // turnDetection: { type: "server-vad" },
    // },
  });

  const toggleMic = async () => {
    if (isCapturing) {
      stopAudioCapture();
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    startAudioCapture(stream);
  };

  return (
    <main style={{ padding: 24 }}>
     <pre>
  {JSON.stringify(
    {
      status,
      isCapturing,
    },
    null,
    2,
  )}
</pre>
      <button onClick={status === "connected" ? disconnect : connect}>
        {status === "connected" ? "Disconnect" : "Connect"}
      </button>
      {status === "connected" && (
        <button onClick={toggleMic}>
          {isCapturing ? "Stop mic" : "Start mic"}
        </button>
      )}
    </main>
  );
}
