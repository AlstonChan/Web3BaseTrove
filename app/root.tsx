// Remix Modules
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";

// External Modules
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Internal Modules
import "./globals.css";
import { config, rainbowKitTheme } from "./lib/wagmiConfig";
import ErrorPage from "./components/ErrorPage";

import type { ReactNode } from "react";

const queryClient = new QueryClient();

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Essential tag */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#020817" />

        {/* social meta tags */}
        {/* <!-- Primary Meta Tags --> */}
        <title>Web3 Trove</title>
        <meta name="title" content="Web3 Trove" />
        <meta
          name="description"
          content="Unlock the treasure: mint, stake, and win exclusive NFTs with Trove"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web3 Trove" />
        <meta
          property="og:description"
          content="Unlock the treasure: mint, stake, and win exclusive NFTs with Trove"
        />
        <meta property="og:image" content="/meta.png" />

        {/* <!-- X (Twitter) --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Web3 Trove" />
        <meta
          property="twitter:description"
          content="Unlock the treasure: mint, stake, and win exclusive NFTs with Trove"
        />
        <meta property="twitter:image" content="/meta.png" />

        {/* page specific tag */}
        <Meta />
        <Links />
      </head>
      <body className="bg-background font-poppins flex h-full min-h-dvh flex-col">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={rainbowKitTheme}>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);
  return (
    <html lang="en" className="dark">
      <head>
        {/* Essential tag */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#020817" />

        {/* page specific tag */}
        <Meta />
        <Links />
      </head>
      <body className="bg-background font-poppins flex h-full min-h-dvh flex-col">
        {isRouteErrorResponse(error) ? (
          <ErrorPage code={error.status} title={error.statusText} message={error.data as string} />
        ) : error instanceof Error ? (
          <ErrorPage code={500} title={error.name} message={error.message} />
        ) : (
          <ErrorPage code={500} title={"Unknown Error"} message={null} />
        )}
        <Scripts />
      </body>
    </html>
  );
}
