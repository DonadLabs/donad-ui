import { BaseError, useWriteContract} from "wagmi";
import {
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
