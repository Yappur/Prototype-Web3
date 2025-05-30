import { ethers } from "ethers";
import { useState } from "react";

export function useMetamaskConnection() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const connectWalletHandler = async () => {
    try {
      setIsLoading(true);
      let signer;
      let provider;

      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        accountChangedHandler(signer);
      }
      setIsLoading(false);
      setError();
      setIsConnected(true);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setAccountAddress(address);
  };

  const disconnectWalletHandler = async () => {
    setIsLoading(true);
    setAccountAddress(null);
    setIsConnected(false);
    setIsLoading(false);
  };

  return {
    accountAddress,
    connectWalletHandler,
    disconnectWalletHandler,
    isConnected,
    isLoading,
    error,
    reducedAddress: `${accountAddress?.slice(0, 8)}...${accountAddress?.slice(
      -8
    )}`,
  };
}

export default useMetamaskConnection;
