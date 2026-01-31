// Remix Modules
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

// External Modules
import { motion } from "motion/react";

// Internal Modules
import { headlineVariants } from "~/lib/utils";

// Components
import { LampContainer } from "~/components/Lamp";
import StakeForm from "./StakeForm";
import StakeStatistics from "./StakeStatistics";
import StakeMultiplier from "./StakeMultiplier";
import Tokenomics from "./Tokenomics";
import HowItWorks from "./HowItWorks";
import StakeLiquidity from "./StakeLiquidity";
import StakeApproval from "./StakeApproval";
import UserStakeStats from "./UserStakeStats";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  return { canonical: url.href };
}
export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  return [
    { title: "Stake | Trove" },
    {
      name: "description",
      content:
        "Stake your TRV1 token to mint TRV2 token. Liquid staking with time and amount multiplier to boost your stakes.",
    },
    { tagName: "link", rel: "canonical", href: loaderData?.canonical },
    { property: "og:url", content: loaderData?.canonical },
    { name: "twitter:url", content: loaderData?.canonical },
  ];
};

export default function Mint() {
  return (
    <div className="mb-14">
      <motion.section
        variants={headlineVariants}
        initial="hidden"
        animate="visible"
        className="flex-1"
      >
        <h1
          className="mx-auto mt-10 mb-1 max-w-72 text-center text-2xl leading-relaxed! font-semibold
            min-[460px]:max-w-none sm:text-4xl lg:text-5xl lg:leading-snug"
        >
          Stake TRV1 Token
        </h1>
        <p className="mx-auto mb-12 text-center">Get TRV2 token every day when you stake</p>
        <UserStakeStats />
        <article className="bg-dark-blue mx-auto max-w-(--breakpoint-lg) rounded-2xl">
          <StakeForm />
        </article>
        <StakeApproval />
        {/* Stake Statistics section */}
        <StakeStatistics />
        {/* Stake multiplier section */}
        <StakeMultiplier />
        {/* Stake liquidity section */}
        <StakeLiquidity />
        {/* Tokenomics section */}
        <Tokenomics />
        <LampContainer>
          {/* How does it work section */}
          <HowItWorks />
        </LampContainer>
      </motion.section>
    </div>
  );
}
