import { useConnection } from "wagmi";
import { formatUnits } from "viem";

import {
  useReadTrove1,
  useReadTrove1BalanceOf,
  useReadTrove2BalanceOf,
  useReadTrove2,
  useReadTroveStakeAccountActiveStakes,
  useReadTroveStakeClaimableRewards,
} from "~/generated";
import Stats from "~/components/Stats";

export default function CardsSection() {
  const account = useConnection();

  // Read data from the smart contract
  const { data: trv1Decimal } = useReadTrove1({ functionName: "decimals" });
  const { data: trv2Decimal } = useReadTrove2({ functionName: "decimals" });
  const { data: trv1Amount } = useReadTrove1BalanceOf({
    args: account.address ? [account.address] : undefined,
  });
  const { data: trv2Amount } = useReadTrove2BalanceOf({
    args: account.address ? [account.address] : undefined,
  });

  const { data: trvStakeActiveStakes } = useReadTroveStakeAccountActiveStakes({
    args: account.address && [account.address],
  });
  const { data: trvStakeClaimableRewards } = useReadTroveStakeClaimableRewards({
    args: account.address && [account.address],
  });

  const trv1Balance =
    trv1Amount && trv1Decimal ? Number(formatUnits(trv1Amount, trv1Decimal)).toLocaleString() : "0";
  const trv2Balance =
    trv2Amount && trv2Decimal ? Number(formatUnits(trv2Amount, trv2Decimal)).toLocaleString() : "0";
  const activeStakes = trvStakeActiveStakes
    ? Number(formatUnits(trvStakeActiveStakes, 18)).toLocaleString()
    : 0;
  const claimableRewards = trvStakeClaimableRewards
    ? Number(formatUnits(trvStakeClaimableRewards, 18)).toLocaleString()
    : 0;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Stats
          title="TRV1 balance"
          value={trv1Balance}
          desc="TRV1"
          className="bg-accent-dark-blue w-full sm:w-1/2 md:w-full"
          large
        />
        <Stats
          title="TRV2 balance"
          value={trv2Balance}
          desc="TRV2"
          className="bg-accent-dark-blue w-full sm:w-1/2 md:w-full"
          large
        />
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Stats
          title="Total active stakes"
          value={activeStakes}
          desc="TRV1"
          className="bg-accent-dark-blue w-full sm:w-1/2 md:w-full"
          large
        />
        <Stats
          title="Total Claimable Rewards"
          value={claimableRewards}
          desc="TRV2"
          className="bg-accent-dark-blue w-full sm:w-1/2 md:w-full"
          large
        />
      </div>
    </>
  );
}
