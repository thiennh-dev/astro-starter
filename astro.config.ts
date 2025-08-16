import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import expressiveCode from 'astro-expressive-code'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import rehypeDocument from 'rehype-document'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://astro-erudite.vercel.app',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme="${theme.name.split('-')[1]}"]`,
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        overridesByLang: {
          'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
            {
              showLineNumbers: false,
            },
        },
      },
      styleOverrides: {
        codeFontSize: '0.75rem',
        borderColor: 'var(--border)',
        codeFontFamily: 'var(--font-mono)',
        codeBackground:
          'color-mix(in oklab, var(--secondary) 25%, transparent)',
        frames: {
          editorActiveTabForeground: 'var(--muted-foreground)',
          editorActiveTabBackground:
            'color-mix(in oklab, var(--secondary) 25%, transparent)',
          editorActiveTabIndicatorBottomColor: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorTabBorderRadius: '0',
          editorTabBarBackground: 'transparent',
          editorTabBarBorderBottomColor: 'transparent',
          frameBoxShadowCssValue: 'none',
          terminalBackground:
            'color-mix(in oklab, var(--secondary) 25%, transparent)',
          terminalTitlebarBackground: 'transparent',
          terminalTitlebarBorderBottomColor: 'transparent',
          terminalTitlebarForeground: 'var(--muted-foreground)',
        },
        lineNumbers: {
          foreground: 'var(--muted-foreground)',
        },
        uiFontFamily: 'var(--font-sans)',
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeDocument,
        {
          css: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark',
          },
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
  redirects: {
    // v1.0.0 -> v3.0.0
    '/ctfs/pico22/beginners-compilation':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico/beginners-compilation':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/crypto/basic-mod1':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/crypto/basic-mod1-2':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/pwn/basic-file-exploit':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/crypto/pwn/cve-xxxx-xxxx':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/pwn/cve-xxxx-xxxx':
      '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/pico22/pwn/ropfu': '/blog/picoctf-2022-beginners-compilation',
    '/ctfs/byu/osint/osint-compilation': '/blog/byuctf-2022-osint-compilation',
    '/ctfs/utc/prog/port-authority': '/blog/dhhutc-2022-port-authority',
    '/ctfs/pico22/pwn/buffer-overflow-series':
      '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/pwn/buffer-overflow-0': '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/pwn/buffer-overflow-1': '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/crypto/pwn/buffer-overflow-0':
      '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/crypto/pwn/buffer-overflow-1':
      '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/crypto/pwn/buffer-overflow-2':
      '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/pico22/crypto/pwn/buffer-overflow-3':
      '/blog/picoctf-2022-buffer-overflow',
    '/blog/picoctf-2022/buffer-overflow-series':
      '/blog/picoctf-2022-buffer-overflow',
    '/ctfs/sekai/compilation': '/blog/sekaictf-2022-forensics-compilation',
    '/ctfs/shctf/compilation': '/blog/shctf-2022-compilation',
    '/ctfs/shctf/pwn/guardians-of-the-galaxy': '/blog/shctf-2022-compilation',
    '/ctfs/shctf/pwn/vader': '/blog/shctf-2022-compilation',
    '/ctfs/shctf/pwn/warmup-to-the-dark-side': '/blog/shctf-2022-compilation',
    '/ctfs/shctf/crypto/rahools-challenge': '/blog/shctf-2022-compilation',
    '/ctfs/actf/algo/gcd-query': '/blog/actf-2023-gcd-query',
    '/ctfs/idek/osint/nmpz': '/blog/idekctf-2023-nmpz',
    '/ctfs/mhs/prog/matchmaker': '/blog/mhsctf-2023-matchmaker',
    '/ctfs/wolv23/osint/wannaflag': '/blog/wolvctf-2023-wannaflag',

    // v2.0.0 -> v3.0.0
    '/blog/actf-2023/gcd-query': '/blog/actf-2023-gcd-query',
    '/blog/sekaictf-2023/azusawas-gacha-world': '/blog/azusawas-gacha-world',
    '/blog/byuctf-2022/osint-compilation':
      '/blog/byuctf-2022-osint-compilation',
    '/blog/dhhutc-2022/port-authority': '/blog/dhhutc-2022-port-authority',
    '/blog/idekctf-2023/nmpz': '/blog/idekctf-2023-nmpz',
    '/blog/mhsctf-2023/matchmaker': '/blog/mhsctf-2023-matchmaker',
    '/blog/picoctf-2022/beginners-compilation':
      '/blog/picoctf-2022-beginners-compilation',
    '/blog/picoctf-2022/buffer-overflow': '/blog/picoctf-2022-buffer-overflow',
    '/blog/sekaictf-2022/forensics-writeup-compilation':
      '/blog/sekaictf-2022-forensics-compilation',
    '/blog/shctf-2022/compilation': '/blog/shctf-2022-compilation',
    '/blog/wolvctf-2023/wannaflag': '/blog/wolvctf-2023-wannaflag',
  },
})
