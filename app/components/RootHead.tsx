import { Links, Meta } from "react-router";

export interface RootHeadProps {
  /**
   * Optional children elements to be included within the head tag.
   */
  children?: React.ReactNode;
}

/**
 * RootHead component that sets up the HTML head section with essential meta tags,
 * favicon links, and social media meta tags.
 */
export default function RootHead({ children }: RootHeadProps) {
  return (
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

      {children}

      {/* page specific tag */}
      <Meta />
      <Links />
    </head>
  );
}
