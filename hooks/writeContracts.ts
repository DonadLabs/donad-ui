import { useWriteContract } from "wagmi";
import {
    donadManagerContract,
    donContract,
} from "../contracts/contracts";

export const useWriteFaucetMinting = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const FaucetMinting = () => {
        return writeContractAsync({
            address: donContract.address,
            abi: donContract.abi,
            functionName: "faucetMinting",
            args: []
        });
    }
    return { hash, FaucetMinting, error };
};

export const useWriteCreateFundraising = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const CreateFundraising = (title: string, description: string, amount: number, deadline: number) => {
        return writeContractAsync({
            address: donadManagerContract.address,
            abi: donadManagerContract.abi,
            functionName: "createFundraising",
            args: [title, description, amount, deadline]
        });
    }
    return { hash, CreateFundraising, error };
};

export const useWriteApproveToken = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const ApproveToken = (amount: bigint) => {
        return writeContractAsync({
            address: donContract.address,
            abi: donContract.abi,
            functionName: "approve",
            args: [donadManagerContract.address, amount]
        });
    }
    return { hash, ApproveToken, error };
};

export const useWriteDonate = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const Donate = (fundraiseId: number, amount: bigint) => {
        return writeContractAsync({
            address: donadManagerContract.address,
            abi: donadManagerContract.abi,
            functionName: "donate",
            args: [fundraiseId, amount]
        });
    }
    return { hash, Donate, error };
};

export const useWriteWithdraw = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const Withdraw = (fundraiseId: number, amount: bigint, remarks: string, withdrawalAddress: string) => {
        return writeContractAsync({
            address: donadManagerContract.address,
            abi: donadManagerContract.abi,
            functionName: "withdrawFundraising",
            args: [fundraiseId, amount, remarks, withdrawalAddress]
        });
    }
    return { hash, Withdraw, error };
};