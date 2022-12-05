import { Transaction, TransactionWitnessSet } from "@emurgo/cardano-serialization-lib-asmjs";
import Buffer from "buffer";

export async function signTx(walletApi, tx, witnessSet, partialSign = false) {
  const txCbor = Buffer.from(tx.to_bytes(), "utf8").toString("hex");

  const txVkeyWitnessesBytes = await walletApi.signTx(txCbor, partialSign);

  const txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnessesBytes, "hex"));
  witnessSet.set_vkeys(txVkeyWitnesses.vkeys());

  const signedTransaction = Transaction.new(tx.body(), witnessSet, tx.auxiliary_data());
  return signedTransaction;
}

export async function submitTx(walletApi, txCbor) {
  return await walletApi.submitTx(txCbor);
}
