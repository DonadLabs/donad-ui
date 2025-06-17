import { BaseError, useWriteContract} from "wagmi";
import {
    donadManagerContract,
    donContract,
} from "../contracts/contracts";



export const useWriteFaucetMinting = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const FaucetMinting = () => {
        return writeContractAsync({
            address: donContract.address, // ERC20 token address
            abi: donContract.abi,
            functionName: "faucetMinting",
            args: []
        });
    }
    return {hash, FaucetMinting, error};
};

export const useWriteCreateFundraising = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const CreateFundraising = (title:string, description:string, amount:number, deadline:number) => {
        return writeContractAsync({
            address: donadManagerContract.address, // ERC20 token address
            abi: donadManagerContract.abi,
            functionName: "createFundraising",
            args: [title, description, amount, deadline]
        });
    }
    return {hash, CreateFundraising, error};
};
