import { ethers } from "ethers";

export const metamaskConnection = async () => {
  let provider, signer, address;
  if (window.ethereum == null) {
    provider = ethers.getDefaultProvider();
    throw new Error(
      "No se detectó ninguna wallet. Verificá que esté instalada."
    );
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    address = await signer.getAddress();
  }
  const network = await provider.getNetwork();
  if (network.chainId !== 1287n) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x507" }], // 1287 en hexadecimal
    });
  }
  return { provider, signer, address };
};
