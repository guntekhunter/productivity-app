import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  isUser: z.boolean(),
  text: z.string(),
});

// array validator to rimember previoues message
export const MessageArraaySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
