import DONABI from "../abi/DON-abi.json"; // Import ABI dari file JSON
import DonadManagerABI from "../abi/Donad-Manager-abi.json"; // Import ABI dari file JSON
import type { Address } from "viem";

export const donContract = {
  address: "0xC8897AEb22C494f8Aa427Bf5ba41737Bc29449BC" as Address,
  abi: DONABI,
} as const;

export const donadManagerContract = {
  address: "0x5890deC57407a0E37b15c2C351115fa3827dF277" as Address,
  abi: DonadManagerABI,
} as const;
