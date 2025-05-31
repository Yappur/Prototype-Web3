import { useState } from "react";
import QRScannerModal from "../components/Modals/QRScannerModal.jsx";
import noise from "../assets/background/noise.png";
import raizBg from "../assets/background/raiz-bg.svg";
import bgBase64 from "../assets/background/bgImage.js";
import LandingNavbar from "../components/Navigate/LandingNavbar.jsx";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import useMetamaskConnection from "../hooks/useMetamaskConnection.js"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {
    connectWalletHandler,
    disconnectWalletHandler,
    isConnected,
    isLoading,
    error,
    reducedAddress,
    accountAddress
  } = useMetamaskConnection();

  const [showError, setShowError] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  const navigate = useNavigate()

  const handleWalletClick = async () => {
    if (isConnected) {
      await disconnectWalletHandler();
    } else {
      await connectWalletHandler();
      navigate("/Producers")
    }
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
      <img
        src={raizBg || "/placeholder.svg"}
        alt="Raiz background"
        className="fixed bottom-0 right-0 w-auto h-auto max-w-full max-h-full object-contain z-0 pointer-events-none hidden lg:block"
      />
      <LandingNavbar
        account={accountAddress}
        isConnected={isConnected}
        isLoading={isLoading}
        error={error}
        showError={showError}
        onWalletClick={handleWalletClick}
        onQRScannerOpen={openQRScanner}
        onCloseError={() => setShowError(false)}
      />

      <main className="relative z-10 px-8 py-16 mx-12">
        {/* Información de cuenta conectada */}
        {isConnected && reducedAddress && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Wallet Conectada
                </p>
                <p className="text-xs text-gray-600 font-mono">
                  {reducedAddress}
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
                <img src={arrowLeft} alt="flecha" />
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
      </main>

      <QRScannerModal
        isOpen={showQRScanner}
        onClose={closeQRScanner}
        onScan={handleQRScan}
      />
    </div>
  );
}
