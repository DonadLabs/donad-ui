import { useReadContract, useReadContracts } from "wagmi";
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

type DonationHistory = {
  fundraiseId: BigInt
  donor: string
  amount: BigInt
  timestamp: BigInt
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

export const useReadGetFundraisings = (ids: number[]) :Campaign[] => {
  const getFundraiseDetailsContract = {
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "getFundraiseDetails",
  } as const;

  const readContracts: any[] = ids.map((id) => ({
    ...getFundraiseDetailsContract,
    args: [id] as const,
  }));

  const { data: fundraisingsData } = useReadContracts({
    contracts: readContracts,
  });

  const fundraisings: Campaign[] = fundraisingsData?.map(fundraising => fundraising?.result as Campaign) ?? [];
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

export const useReadGetDonationHistories = (id: number) :DonationHistory[] => {
  const { data: donationHistories } = useReadContract({
      address: donadManagerContract.address, 
      abi: donadManagerContract.abi,
      functionName: "getDonationHistories",
      args:[id]
    }) as {data: DonationHistory[]};

  return donationHistories;
};