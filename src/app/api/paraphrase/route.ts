const DATA_SOURCE_URL = "https://api.openai.com/v1/chat/completions";
export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: Request, res: Response) {
  const reqBody = await req.json();
  try {
    const res = await fetch(DATA_SOURCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(reqBody),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
