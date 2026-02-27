import { defineCollection, z } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  released: z.coerce.date(),
  abstract: z.string().optional(),
  description: z.string().optional(),
});

export const collections = {
  posts: defineCollection({ type: 'content', schema: postSchema }),
};