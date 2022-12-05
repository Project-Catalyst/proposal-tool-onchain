import {
  Address,
  BaseAddress,
  RewardAddress,
  TransactionUnspentOutput,
} from "@emurgo/cardano-serialization-lib-asmjs";
import Buffer from "buffer";

export function extractStakeAddressBech32(addressBech32, networkId = 1) {
  const addr = Address.from_bech32(addressBech32);
  const baseAddr = BaseAddress.from_address(addr);
  const stakeCred = baseAddr.stake_cred();

  const rewardAddrBytes = new Uint8Array(29);
  rewardAddrBytes.set([networkId === 1 ? 0xe1 : 0xe0], 0);
  rewardAddrBytes.set(stakeCred.to_bytes().slice(4, 32), 1);

  const rewardAddr = RewardAddress.from_address(Address.from_bytes(rewardAddrBytes));
  const stakeAddressBech32 = rewardAddr.to_address().to_bech32();

  return stakeAddressBech32;
}

export async function getWalletStakeAddressBech32(walletApi, networkId) {
  const _networkId = networkId || (await walletApi.getNetworkId());

  const unusedAddresses = await walletApi.getUnusedAddresses();
  const unusedAddressBech32 = Address.from_bytes(Buffer.from(unusedAddresses[0], "hex")).to_bech32();

  const walletStakeAddressBech32 = extractStakeAddressBech32(unusedAddressBech32, _networkId);
  return walletStakeAddressBech32;
}

export async function getUnusedAddress(walletApi) {
  const raw = await walletApi.getUnusedAddresses();
  const unusedAddressBech32 = Address.from_bytes(Buffer.from(raw[0], "hex")).to_bech32();
  const unusedAddress = Address.from_bech32(unusedAddressBech32);
  return unusedAddress;
}

export async function getChangeAddressBech32(walletApi) {
  const raw = await walletApi.getChangeAddress();
  const changeAddressBech32 = Address.from_bytes(Buffer.from(raw, "hex")).to_bech32();
  return changeAddressBech32;
}

export async function getUtxos(walletApi) {
  const utxos = [];
  const rawUtxos = await walletApi.getUtxos();

  for (const rawUtxo of rawUtxos) {
    const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, "hex"));

    const input = utxo.input();
    const txid = Buffer.from(input.transaction_id().to_bytes(), "utf8").toString("hex");
    const txindx = input.index();

    const output = utxo.output();
    const amount = output.amount().coin().to_str(); // ADA amount in lovelace
    const multiasset = output.amount().multiasset();

    let multiAssetStr = "";
    if (multiasset) {
      const keys = multiasset.keys(); // policy Ids of thee multiasset
      const N = keys.len();

      // console.log(`${N} Multiassets in the UTXO`)
      for (let i = 0; i < N; i++) {
        const policyId = keys.get(i);
        const policyIdHex = Buffer.from(policyId.to_bytes(), "utf8").toString("hex");

        // console.log(`policyId: ${policyIdHex}`)
        const assets = multiasset.get(policyId);
        const assetNames = assets.keys();
        const K = assetNames.len();
        // console.log(`${K} Assets in the Multiasset`)

        for (let j = 0; j < K; j++) {
          const assetName = assetNames.get(j);
          const assetNameString = Buffer.from(assetName.name(), "utf8").toString();
          const assetNameHex = Buffer.from(assetName.name(), "utf8").toString("hex");
          const multiassetAmt = multiasset.get_asset(policyId, assetName);

          multiAssetStr += [
            `+ ${multiassetAmt.to_str()}`,
            `${policyIdHex}.${assetNameHex} (${assetNameString})`,
          ].join(" + ");
          // console.log(assetNameString)
          // console.log(`Asset Name: ${assetNameHex}`)
        }
      }
    }

    const obj = {
      inputValue: input,
      txid: txid,
      txindx: txindx,
      amount: amount,
      str: `${txid} #${txindx} = ${amount}`,
      multiAssetStr: multiAssetStr,
      TransactionUnspentOutput: utxo,
    };

    // console.log(`utxo: ${str}`)
    utxos.push(obj);
  }

  return utxos;
}
