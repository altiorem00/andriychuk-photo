import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "msapplication-TileColor",
          content: "#da532c",
        },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-32x32.png",
        },
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
  ssr: false,
  css: ["assets/styles/global.scss"],
  buildModules: ["@pinia/nuxt"],
});
