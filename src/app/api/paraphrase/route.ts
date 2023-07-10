const DATA_SOURCE_URL = "https://api.openai.com/v1/chat/completions";

export const config = {
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    // allows a single file
    "/lib/utilities.js",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/function-bind/**",
  ],
};

export const POST = async (req: Request, res: Response) => {
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
};
