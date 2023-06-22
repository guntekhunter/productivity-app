const DATA_SOURCE_URL = "https://openai80.p.rapidapi.com/chat/completions";

export const POST = async (req: Request, res: Response) => {
  const reqBody = await req.json();
  console.log(reqBody);
  try {
    const res = await fetch(DATA_SOURCE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "fe6991a66amsh8d3677e1d9be96cp174527jsn4fc7b048c72a",
        "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        "Accept-Encoding": "gzip, compress, deflate",
      },
      body: JSON.stringify(reqBody),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
