import { useReadContract } from "wagmi";
import {
  donContract, donadManagerContract
} from "../contracts/contracts";

type Campaign = {
  id: bigint
  title: string
  description: string
  location: string
  category: string
  verified: boolean
  fundraiser: string
  accumulatedAmount: bigint
  targetAmount: bigint
  targetDate: bigint
  totalWithdrawAmount: bigint
  donorsCount: bigint
}

type DonationHistory = {
  fundraiseId: BigInt
  donor: string
  amount: BigInt
  timestamp: BigInt
}

type Withdrawal = {
  fundraiseId: BigInt,
  amount: BigInt,
  remarks: string;
  withdrawalAddress: string,
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

export const useReadUserHasMinted = (address: `0x${string}` | undefined) => {
  const { data: userHasMinted } = useReadContract({
    address: donContract.address,
    abi: donContract.abi,
    functionName: "userHasMinted",
    args: [address]
  });

  return userHasMinted;
};

// NEW: Read user's DON token balance
export const useReadTokenBalance = (address: `0x${string}` | undefined) => {
  const { data: balance } = useReadContract({
    address: donContract.address,
    abi: donContract.abi,
    functionName: "balanceOf",
    args: [address]
  });

  return balance as bigint | undefined;
};

// NEW: Read user's allowance for DonadManager
export const useReadTokenAllowance = (owner: `0x${string}` | undefined) => {
  const { data: allowance } = useReadContract({
    address: donContract.address,
    abi: donContract.abi,
    functionName: "allowance",
    args: [owner, donadManagerContract.address]
  });

  return allowance as bigint | undefined;
};

export const useReadGetFundraisings = (): Campaign[] => {
  const { data: fundraisings } = useReadContract({
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "getFundraisings",
  }) as { data: Campaign[] };

  return fundraisings ?? [];
};

export const useReadGetFundraisingDetail = (id: number): Campaign => {
  const { data: fundraiseDetails } = useReadContract({
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "getFundraiseDetails",
    args: [id]
  }) as { data: Campaign };

  return fundraiseDetails;
};

// NEW: Read user's total donation amount
export const useReadUserTotalDonation = (address: `0x${string}` | undefined) => {
  const { data: totalDonation } = useReadContract({
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "userTotalDonationAmount",
    args: [address]
  });

  return totalDonation as bigint | undefined;
};

export const useReadGetDonationHistories = (id: number): DonationHistory[] => {
  const { data: donationHistories } = useReadContract({
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "getDonationHistories",
    args: [id]
  }) as { data: DonationHistory[] };

  return donationHistories;
};

export const useReadGetWithdrawals = (id: number): Withdrawal[] => {
  const { data: withdrawals } = useReadContract({
    address: donadManagerContract.address,
    abi: donadManagerContract.abi,
    functionName: "getWithdrawals",
    args: [id]
  }) as { data: Withdrawal[] };

  return withdrawals;
};