import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docOfGlframework',
  title: "docs of my glframework",
  description: "关于我的纸张引擎的文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        // text: 'Examples',
        // items: [
        //   { text: 'Markdown Examples', link: '/markdown-examples' },
        //   { text: 'Runtime API Examples', link: '/api-examples' }
        // ]
        items: [
           {text: '介绍', link: '/introduce'}
        ],
      },
      {
        text: '基础',
        items: [
          { text: '创建一个三角形', link: '/base/triangle'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/euuen' }
    ]
  }
})
