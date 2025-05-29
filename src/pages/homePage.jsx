export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f9e6d7] via-[#f8d8c3] to-[#f5d0b8]">
      <div
        className="absolute left-[62%] top-1/3 h-[1300px] w-[1300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 20%, rgba(230, 230, 230, 0.6) 30%, rgba(255, 245, 235, 0.75) 45%, rgba(255, 245, 235, 0.7) 55%, rgba(255, 245, 235, 0.61) 70%, rgba(255, 245, 235, 0.1) 80%, transparent 90%)",
          filter: "blur(42px)",
        }}
      ></div>

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
