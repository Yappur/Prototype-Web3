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
      {/* Barra de navegación */}
      <header className="relative z-10 flex items-center justify-between border-b-2 border-black mx-8 px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-black"></div>
            <span className="font-medium text-gray-800">RAIZ</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-black font-medium">
          <a href="#" className="hover:underline">
            Conectar Wallet
          </a>
          <a href="#" className="hover:underline">
            Acceso Productores
          </a>
        </div>
      </header>

      {/* Contenido central */}
      <main className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="relative max-w-md">
          <div className="absolute -left-16 top-12 w-32"></div>
          <h1 className="text-7xl font-semilight tracking-wide text-black">
            Volvé
            <br />
            al origen
            <br />
            Verificá
            <br />
            lo auténtico
          </h1>
        </div>
      </main>
    </div>
  );
}
