import { defineCollection, z } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  title_zh: z.string().optional(),
  released: z.coerce.date().optional(),
  abstract: z.string().optional(),
  description: z.string().optional(),
  lang: z.string().optional(),
});

export const collections = {
  posts: defineCollection({ type: 'content', schema: postSchema }),
};