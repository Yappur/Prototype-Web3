import noise from "../assets/background/noise.png";
import bgBase64 from "../assets/background/bgImage.js";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${noise}"), url("${bgBase64}")`,
      }}
    >
      <header className="relative z-10 flex items-center justify-between mx-8 px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-black"></div>
            <span className="font-medium text-gray-800">RAIZ</span>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <button className="px-7 py-2 text-md text-black font-medium border border-black bg-transparent hover:bg-black hover:text-white transition-colors cursor-pointer">
            Conectar Wallet
          </button>
          <button className="px-7 py-2 text-md text-white font-medium bg-[#202715] hover:bg-[#14180e] transition-colors cursor-pointer">
            Acceso Productores
          </button>
        </div>
      </header>

      <main className="relative z-10 px-8 py-16 mx-12">
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
      </main>
    </div>
  );
}
