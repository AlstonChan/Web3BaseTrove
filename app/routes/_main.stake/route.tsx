// Remix Modules
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Stake | Trove" }];
};

export default function Mint() {
  return <div>Stake</div>;
}