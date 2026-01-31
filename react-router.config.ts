import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Cloudflare workers does not support prerendering
  // @see https://github.com/remix-run/react-router/issues/13226
  // async prerender() {
  //   return ["/"];
  // },
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
