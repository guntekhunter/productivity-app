import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(payload: any) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          controller.enqueue(encoder.encode(data));
        }
      };

      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        };
        console.log(
          `Error: recieved non-200 status code, ${JSON.stringify(data)}`
        );
        controller.close();
        return;
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  let counter = 0;
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk);
      if (data === "[DONE]") {
        controller.terminate();
        return;
      }
      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || "";
        if (counter < 2 && (text.match(/\n/) || []).length) {
          return;
        }
        const payload = { text: text };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
        );
        counter++;
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return readableStream.pipeThrough(transformStream);
}
