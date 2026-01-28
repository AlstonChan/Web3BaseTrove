import { useChainId } from "wagmi";
import { useEffect } from "react";

import {
  trove1Address,
  trove2Address,
  troveAddress,
  troveAuctionAddress,
  troveStakeAddress,
} from "~/generated";
import { isSupportedChain, supportedChains } from "~/lib/wagmiConfig";
import { useNotification } from "~/context/NotificationContext";

export interface ContractAddressReturn {
  chainId: number;
  contractAddress: `0x${string}`;
  matched: boolean;
}
export type ContractType = "troveAuction" | "troveToken1" | "troveToken2" | "troveStake" | "trove";

export default function useContractAddress(contract: ContractType): ContractAddressReturn {
  const chainId = useChainId();
  const { showNotification, hideNotification } = useNotification();

  const chain = isSupportedChain(chainId);

  useEffect(() => {
    if (!chain) {
      showNotification(`Chain id ${chainId} not supported`);
    } else {
      hideNotification();
    }
  }, [chain, chainId, showNotification, hideNotification]);

  // If the chain is not supported, return default values
  if (!chain) {
    switch (contract) {
      case "troveAuction":
        return {
          chainId: chainId,
          contractAddress: troveAuctionAddress[supportedChains[0]],
          matched: false,
        };
      case "troveToken1":
        return {
          chainId: chainId,
          contractAddress: trove1Address[supportedChains[0]],
          matched: false,
        };
      case "troveToken2":
        return {
          chainId: chainId,
          contractAddress: trove2Address[supportedChains[0]],
          matched: false,
        };
      case "troveStake":
        return {
          chainId: chainId,
          contractAddress: troveStakeAddress[supportedChains[0]],
          matched: false,
        };
      case "trove":
        return {
          chainId: chainId,
          contractAddress: troveAddress[supportedChains[0]],
          matched: false,
        };
      default:
        throw new Error("Invalid contract type");
    }
  }

  switch (contract) {
    case "troveAuction":
      return { chainId: chain, contractAddress: troveAuctionAddress[chain], matched: true };
    case "troveToken1":
      return { chainId: chain, contractAddress: trove1Address[chain], matched: true };
    case "troveToken2":
      return { chainId: chain, contractAddress: trove2Address[chain], matched: true };
    case "troveStake":
      return { chainId: chain, contractAddress: troveStakeAddress[chain], matched: true };
    case "trove":
      return { chainId: chain, contractAddress: troveAddress[chain], matched: true };
    default:
      throw new Error("Invalid contract type");
  }
}
