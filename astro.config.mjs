import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';


export default defineConfig({
    markdown: {
        smartypants: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            [rehypeMathjax, {
                output: 'svg',
                tex: {
                    packages: { '[+]': ['physics', 'ams'] },
                },
                loader: {
                    load: ['[tex]/physics']
                }
            },
            ]
        ]
    },

    integrations: [icon(), mdx()],
    vite: {
        plugins: [tailwindcss()]
    }
})