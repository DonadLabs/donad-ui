import { useReadContract } from "wagmi";
import {
    donContract,
} from "../contracts/contracts";

export const useReadDecimals = () => {
  const { data: decimals } = useReadContract({
      address: donContract.address, // ERC20 token address
      abi: donContract.abi,
      functionName: "decimals",
    });

  return decimals;
};
