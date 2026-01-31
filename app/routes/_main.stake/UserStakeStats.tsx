// External Modules
import { useConnection } from "wagmi";
import { formatUnits } from "viem";

// Internal Modules
import { useReadTrove1Allowance, useReadTrove1BalanceOf, useReadTrove1Decimals } from "~/generated";
import useContractAddress from "~/hooks/useContractAddress";

// Components
import Stats from "~/components/Stats";

export default function UserStakeStats() {
  const account = useConnection();
  const { contractAddress } = useContractAddress("troveStake");

  const { data: trv1Allowance } = useReadTrove1Allowance({
    args: account.address && [account.address, contractAddress],
  });
  const { data: trv1Amount } = useReadTrove1BalanceOf({
    args: account.address ? [account.address] : undefined,
  });
  const { data: trv1Decimals } = useReadTrove1Decimals({});

  const eligibleStake =
    trv1Amount && trv1Allowance && trv1Decimals
      ? trv1Allowance > trv1Amount
        ? formatUnits(trv1Amount, trv1Decimals)
        : formatUnits(trv1Allowance, trv1Decimals)
      : "0";

  return (
    <div
      className="mx-auto mb-2 flex max-w-(--breakpoint-lg) flex-col gap-2 rounded-2xl sm:flex-row
        sm:gap-3"
    >
      <Stats
        title="Owned TRV1"
        value={trv1Amount && trv1Decimals ? formatUnits(trv1Amount, trv1Decimals) : "0"}
        className="w-full sm:w-1/2"
      />
      <Stats title="Eligible Stake" value={eligibleStake} className="w-full sm:w-1/2" />
    </div>
  );
}
