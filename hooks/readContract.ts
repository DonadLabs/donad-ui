import { useReadContract } from "wagmi";
import {
    donContract,
} from "../contracts/contracts";

export const useReadDecimals = () => {
  const { data: decimals } = useReadContract({
      address: donContract.address,
      abi: donContract.abi,
      functionName: "decimals",
    });

  return decimals;
};

export const useReadUserHasMinted = (address:`0x${string}` | undefined) => {
  const { data: userHasMinted } = useReadContract({
      address: donContract.address, 
      abi: donContract.abi,
      functionName: "userHasMinted",
      args:[address]
    });

  return userHasMinted;
};
