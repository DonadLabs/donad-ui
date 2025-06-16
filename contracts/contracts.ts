import DONABI from "../abi/DON-abi.json"; // Import ABI dari file JSON
import type { Address } from "viem";

export const donContract = {
  address: "0xC8897AEb22C494f8Aa427Bf5ba41737Bc29449BC" as Address,
  abi: DONABI,
} as const;