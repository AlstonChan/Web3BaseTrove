import {
  isRouteErrorResponse,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./globals.css";
import { config, rainbowKitTheme } from "./lib/wagmiConfig";
import ErrorPage from "./components/ErrorPage";

import type { ReactNode } from "react";
import RootHead from "./components/RootHead";

const queryClient = new QueryClient();

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark h-full" data-theme="dark">
      <RootHead />
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
    <html lang="en" className="dark h-full">
      <RootHead />
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
