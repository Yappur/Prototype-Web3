import { useState } from "react";
import { Link } from "react-router-dom";
import useWalletConnection from "../hooks/useWalletConnection.js";
import QRScannerModal from "../components/Modals/QRScannerModal.jsx";
import noise from "../assets/background/noise.png";
import bgBase64 from "../assets/background/bgImage.js";

export default function Home() {
  const {
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
  } = useWalletConnection();

  const [showError, setShowError] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleWalletClick = async () => {
    if (isConnected) {
      await disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const getWalletButtonText = () => {
    if (isLoading) return "Conectando...";
    if (isConnected) return account?.meta?.name || "Wallet Conectada";
    return "Conectar Wallet";
  };

  const handleQRScan = (data) => {
    console.log("Código QR escaneado:", data);
    setScannedData(data);
    setScanSuccess(true);

    processQRData(data);
  };

  const processQRData = (qrData) => {
    try {
      if (qrData.startsWith("http://") || qrData.startsWith("https://")) {
        // Redireccionar a URL externa
        window.location.href = qrData;
        return;
      }
    } catch (error) {
      console.error("Error procesando QR:", error);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 5000);
    }
  };

  const openQRScanner = () => {
    setShowQRScanner(true);
  };

  const closeQRScanner = () => {
    setShowQRScanner(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${noise}"), url("${bgBase64}")`,
      }}
    >
      {/* Error Toast */}
      {error && showError && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-center gap-2">
          <span className="text-sm">{error}</span>
          <button
            onClick={() => setShowError(false)}
            className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      <header className="relative z-10 flex items-center justify-between mx-8 px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-black"></div>
            <span className="font-medium text-gray-800">RAIZ</span>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <button
            onClick={openQRScanner}
            className="px-7 py-2 text-md font-medium border border-black transition-colors cursor-pointer relative hover:bg-black hover:text-white"
          >
            Escanear producto
          </button>
          <button
            onClick={handleWalletClick}
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

      <main className="relative z-10 px-8 py-16 mx-12">
        {/* Información de cuenta conectada */}
        {isConnected && account && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Wallet Conectada
                </p>
                <p className="text-xs text-gray-600 font-mono">
                  {account.address.slice(0, 8)}...{account.address.slice(-8)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-7xl font-normal leading-tight text-black mb-8">
              Autenticidad y sostenibilidad para productos regionales.
            </h1>
          </div>

          <div className="flex flex-col justify-center relative">
            {/* Línea divisoria vertical */}
            <div className="absolute left-0 top-0 bottom-0 bg-black border-1 hidden lg:block"></div>

            <div className="lg:pl-40">
              <div className="flex items-center gap-4 mb-7">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <h2 className="text-4xl font-medium text-black">
                  Escanea tu producto
                </h2>
              </div>
              <p className="text-2xl text-gray-800 leading-relaxed">
                Escaneá tu producto para acceder a <br /> información detallada
                sobre su <br /> origen.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-16">
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-medium text-black mb-4">
                  Volvé al origen
                </h3>
                <p className="text-xl text-gray-800 leading-relaxed">
                  Conocé productos sostenibles con sus verdaderas historias.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-medium text-black mb-4">
                  Verificá lo auténtico
                </h3>
                <p className="text-xl text-gray-800 leading-relaxed">
                  Cada artículo cuenta con una raíz: un origen verificable y
                  transparente, registrado con tecnología descentralizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {isConnected && (
          <div className="pt-16 border-t border-gray-300 mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-medium text-black mb-4">
                🌱 Bienvenido a RAIZ
              </h3>
              <p className="text-lg text-gray-800 mb-4">
                Tu wallet está conectada y lista para interactuar con productos
                verificados.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#202715] text-white rounded hover:bg-[#14180e] transition-colors">
                  Explorar Productos
                </button>
                <button className="px-6 py-3 border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  Mi Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <QRScannerModal
        isOpen={showQRScanner}
        onClose={closeQRScanner}
        onScan={handleQRScan}
      />
    </div>
  );
}
