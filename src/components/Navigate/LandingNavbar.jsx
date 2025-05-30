import { Link } from "react-router-dom";
import logo from "../../assets/RaizLogo.svg";

const LandingNavbar = ({
  account,
  isConnected,
  isLoading,
  error,
  showError,
  onWalletClick,
  onQRScannerOpen,
  onCloseError,
}) => {
  const getWalletButtonText = () => {
    if (isLoading) return "Conectando...";
    if (isConnected) return account?.meta?.name || "Wallet Conectada";
    return "Conectar Wallet";
  };

  return (
    <>
      {/* Error Toast */}
      {error && showError && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-center gap-2">
          <span className="text-sm">{error}</span>
          <button
            onClick={onCloseError}
            className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      <header className="relative z-10 flex items-center justify-between mx-8 px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <button
            onClick={onQRScannerOpen}
            className="px-7 py-2 text-md font-medium border border-black transition-colors cursor-pointer relative hover:bg-black hover:text-white"
          >
            Escanear producto
          </button>
          <button
            onClick={onWalletClick}
            disabled={isLoading}
            className={`px-7 py-2 text-md font-medium border border-black transition-colors cursor-pointer relative ${
              isConnected
                ? "bg-green-100 text-green-800 border-green-600 hover:bg-green-200"
                : "text-black bg-transparent hover:bg-black hover:text-white"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isConnected && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
            {getWalletButtonText()}
          </button>
          <Link
            to="/Producers"
            className="px-7 py-2 text-md text-white font-medium bg-[#202715] hover:bg-[#14180e] transition-colors cursor-pointer"
          >
            Acceso Productores
          </Link>
        </div>
      </header>
    </>
  );
};

export default LandingNavbar;
