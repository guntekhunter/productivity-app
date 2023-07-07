const DATA_SOURCE_URL = "https://api.openai.com/v1/chat/completions";

export const POST = async (req: Request, res: Response) => {
  const reqBody = await req.json();
  try {
    const res = await fetch(DATA_SOURCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PARAPHRASE_API_KEY}`,
      },
      body: JSON.stringify(reqBody),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
