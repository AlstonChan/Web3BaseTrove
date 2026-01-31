import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // React Router support for prerendering is for simple usages only.
  // @see https://github.com/remix-run/react-router/issues/13226
  // async prerender() {
  //   return ["/"];
  // },
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
