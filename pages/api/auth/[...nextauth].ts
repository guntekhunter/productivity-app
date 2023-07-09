import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        `${process.env.GOOGLE_ID}` ??
        "358240887503-i6ca4q6og1plib64clcrjr7u5qt0nva2.apps.googleusercontent.com",
      clientSecret:
        `${process.env.GOOGLE_SECRET}` ?? "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",
    }),
  ],
  secret: process.env.SECRET ?? "962ccba5a239f611ac57e5a718b60918",
});
