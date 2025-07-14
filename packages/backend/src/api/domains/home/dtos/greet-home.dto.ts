import z from "zod";

export const greetHomeDto = z.object({
  title: z.string(),
});
