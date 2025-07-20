import z from 'zod';

const socialLinkObject = z.object({
  type: z.string(),
  link: z.string().url(),
});


export const registerCreatorDto = z.object({
  name: z.string(),
  image: z.instanceof(File),
  description: z.string(),
  email: z.string(),
  socialLinks: z.string() // 1. Harapkan sebuah string.
    .transform((str, ctx) => { // 2. Gunakan .transform() untuk mem-parsingnya.
      try {
        return JSON.parse(str);
      } catch (e) {
        ctx.addIssue({ code: 'custom', message: 'Format JSON tidak valid.' });
        return z.NEVER;
      }
    })
    .pipe(z.array(socialLinkObject)),
  locationAddress: z.string(),
  walletAddress: z.string()
})