import { useReadContract } from "wagmi";
import {
    donContract,donadManagerContract
} from "../contracts/contracts";

type Campaign = {
  id: BigInt
  title: string
  description: string
  location: string
  category: string
  verified: boolean
  fundraiser: string
  accumulatedAmount: BigInt // or bigint if from contract
  targetAmount: BigInt
  targetDate: BigInt
  totalWithdrawAmount: BigInt
  donorsCount: BigInt
}

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

export const useReadGetFundraisings = () :Campaign[] => {
  const { data: fundraisings } = useReadContract({
      address: donadManagerContract.address, 
      abi: donadManagerContract.abi,
      functionName: "getFundraisings",
    }) as {data: Campaign[]};

  return fundraisings ?? [];
};

export const useReadGetFundraisingDetail = (id: number) :Campaign => {
  const { data: fundraiseDetails } = useReadContract({
      address: donadManagerContract.address, 
      abi: donadManagerContract.abi,
      functionName: "getFundraiseDetails",
      args:[id]
    }) as {data: Campaign};

  return fundraiseDetails;
};