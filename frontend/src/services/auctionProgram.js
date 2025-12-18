import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { IDL, PROGRAM_ID, RPC_ENDPOINT } from "../config";

// Membuat provider Anchor
export function getProvider(wallet) {
  const connection = new web3.Connection(RPC_ENDPOINT, "confirmed");

  return new AnchorProvider(
    connection,
    wallet,   // wallet adapter (Phantom, Solflare, dll)
    AnchorProvider.defaultOptions()
  );
}

// Membuat Program client (Anchor)
export function getProgram(wallet) {
  const provider = getProvider(wallet);
  return new Program(IDL, PROGRAM_ID, provider);
}
