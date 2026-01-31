import { useConnection } from "wagmi";

import { useReadTroveStakeStakeStatus } from "~/generated";
import StakeCard from "./StakeCard";
import LoadingPage from "~/components/LoadingPage";

export default function AllStakes() {
  const account = useConnection();
  const address = account.address;

  const { data: stakeDetails } = useReadTroveStakeStakeStatus({
    args: address ? [address] : undefined,
  });

  return (
    <article className="pt-2">
      {stakeDetails ? (
        address && stakeDetails.length > 0 ? (
          <div className="grid auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stakeDetails.map((stake, index) => (
              <StakeCard
                key={index}
                address={address}
                index={index}
                active={stake.active}
                amount={stake.amount}
                start={stake.start}
                claimed={stake.claimed}
              />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-xl">No stake record found</p>
        )
      ) : (
        <LoadingPage />
      )}
    </article>
  );
}
