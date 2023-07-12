import { OpenAIStream } from "../../../../utils/OpenAIStream";

const DATA_SOURCE_URL = "https://api.openai.com/v1/chat/completions";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "edge";
export const preferredRegion = "auto";

export const POST = async (req: Request, res: Response) => {
  const reqBody = await req.json();
  try {
    const stream = await OpenAIStream(reqBody);
    return new Response(stream);
  } catch (error) {
    console.log(error);
  }
};
