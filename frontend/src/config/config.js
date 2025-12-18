import idl from "./idl/nf_tauction_araqueenweb.json";
import { PublicKey } from "@solana/web3.js";

// Gunakan Program ID hasil deploy di devnet
export const PROGRAM_ID = new PublicKey("BAbuPk5uTdqLxeV4psAyoSL9g7Hx2cbjMsu8qeoUW9HA");

// Endpoint Solana
export const RPC_ENDPOINT = "https://api.devnet.solana.com";

export const IDL = idl;
