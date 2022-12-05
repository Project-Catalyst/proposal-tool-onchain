import {
  Address,
  AuxiliaryData,
  BigNum,
  encode_json_str_to_metadatum,
  GeneralTransactionMetadata,
  LinearFee,
  Transaction,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutput,
  TransactionUnspentOutputs,
  TransactionWitnessSet,
  Value,
} from "@emurgo/cardano-serialization-lib-asmjs";
import Buffer from "buffer";

import { mix } from "@/utils";

import { TX_METADATA_KEY, TX_METADATA_VERSION } from "../const";
import { getChangeAddressBech32, getUnusedAddress, getUtxos, getWalletStakeAddressBech32 } from "./address";

function getProtocolParams() {
  return {
    linearFee: {
      minFeeA: "44",
      minFeeB: "155381",
    },
    minUtxo: "34482",
    poolDeposit: "500000000",
    keyDeposit: "2000000",
    maxValSize: 5000,
    maxTxSize: 16384,
    priceMem: 0.0577,
    priceStep: 0.0000721,
    coinsPerUtxoWord: "34482",
  };
}

function createTxBuilder() {
  const protocolParams = getProtocolParams();

  const txBuilder = TransactionBuilder.new(
    TransactionBuilderConfigBuilder.new()
      .fee_algo(
        LinearFee.new(
          BigNum.from_str(protocolParams.linearFee.minFeeA),
          BigNum.from_str(protocolParams.linearFee.minFeeB),
        ),
      )
      .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
      .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
      .max_value_size(protocolParams.maxValSize)
      .max_tx_size(protocolParams.maxTxSize)
      .prefer_pure_change(true)
      .build(),
  );

  return txBuilder;
}

function addMetadata(txBuilder, metadataKey, metadataValue) {
  const generalMetadata = GeneralTransactionMetadata.new();
  generalMetadata.insert(
    BigNum.from_str(metadataKey),
    encode_json_str_to_metadatum(JSON.stringify(metadataValue)),
  );

  const auxData = AuxiliaryData.new();
  auxData.set_metadata(generalMetadata);
  txBuilder.set_auxiliary_data(auxData);
  return auxData;
}

function addOutput(txBuilder, recipientAddress, amount) {
  const value = Value.new(BigNum.from_str(amount.toString()));
  const output = TransactionOutput.new(recipientAddress, value);
  txBuilder.add_output(output);
}

function addInputs(txBuilder, utxos, coinSelecionStrategy) {
  const txOutputs = TransactionUnspentOutputs.new();
  for (const utxo of utxos) {
    txOutputs.add(utxo.TransactionUnspentOutput);
  }
  txBuilder.add_inputs_from(txOutputs, coinSelecionStrategy);
}

function addChange(txBuilder, changeAddressBech32) {
  txBuilder.add_change_if_needed(Address.from_bech32(changeAddressBech32));
}

const buildTxDefaultOptions = {
  amount: 1e6,
  inputsCoinSelecionStrategy: 0,
  metadataKey: TX_METADATA_KEY,
  metadataValue: undefined,
};

function buildTx(recipientAddress, changeAddressBech32, utxos, options = {}) {
  // construct options
  const opts = mix(buildTxDefaultOptions, options);

  let auxData = undefined;

  // init builder
  const txBuilder = createTxBuilder();

  // metadata
  if (opts.metadataValue) {
    auxData = addMetadata(txBuilder, opts.metadataKey, opts.metadataValue);
  }

  // output
  addOutput(txBuilder, recipientAddress, opts.amount);

  // inputs
  addInputs(txBuilder, utxos, opts.inputsCoinSelecionStrategy);

  // change
  addChange(txBuilder, changeAddressBech32);

  // build tx
  const txBody = txBuilder.build();
  const witnessSet = TransactionWitnessSet.new();
  const tx = Transaction.new(txBody, TransactionWitnessSet.from_bytes(witnessSet.to_bytes()), auxData);

  return { tx, witnessSet };
}

export async function createTx(walletApi, recipientAddress, txBuilderOptions = {}) {
  const changeAddressBech32 = await getChangeAddressBech32(walletApi);
  const utxos = await getUtxos(walletApi);

  return buildTx(recipientAddress, changeAddressBech32, utxos, txBuilderOptions);
}

export async function createMetadataTx(walletApi, action, payload) {
  const recipientAddress = await getUnusedAddress(walletApi);
  const walletStakeAddressBech32 = await getWalletStakeAddressBech32(walletApi);

  const metadataValue = {
    action,
    creator: walletStakeAddressBech32,
    version: TX_METADATA_VERSION,
    payload,
  };

  return await createTx(walletApi, recipientAddress, { metadataValue });
}

export function getSignedTxCbor(signedTx) {
  return Buffer.from(signedTx.to_bytes(), "utf8").toString("hex");
}
