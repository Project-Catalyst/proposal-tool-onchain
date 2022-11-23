import { COMPATIBLE_WALLETS } from "./const";

function getCardanoWalletsObject() {
  const wallets = window.cardano;
  if (wallets) {
    return wallets;
  }
  throw new Error("No available wallets found");
}

export function getWalletObject(key) {
  const cardanoWalletsObject = getCardanoWalletsObject();
  if (!cardanoWalletsObject[key]) {
    throw new Error(`Wallet "${key}" is not in "window" object`);
  }
  return cardanoWalletsObject[key];
}

export function getCompatibleWalletsKeys() {
  return COMPATIBLE_WALLETS.split(/\W+/).map((key) => key.trim());
}

export function getAvailableWalletsKeys() {
  const cardanoWalletsObject = getCardanoWalletsObject();
  const compatibleWalletsKeys = getCompatibleWalletsKeys();
  return Object.keys(cardanoWalletsObject).filter((key) => compatibleWalletsKeys.includes(key));
}

export async function getWalletApi(key) {
  const walletObject = getWalletObject(key);
  return await walletObject.enable();
}
