import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';


export default defineConfig({
    markdown: {
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

    vite: {
        plugins: [tailwindcss()]
    }
});