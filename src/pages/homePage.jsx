export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f9e6d7] via-[#f8d8c3] to-[#f5d0b8]">
      {/* Capas de gradientes con difuminado */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#f2d4c7] via-transparent to-[#e8c4a8] opacity-60"
        style={{ filter: "blur(8px)" }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#f6e1d3] to-transparent opacity-40"
        style={{ filter: "blur(6px)" }}
      ></div>

      {/* GRANULADO PRINCIPAL - Más visible */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.9) 0.8px, transparent 1.2px),
        radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.8) 1px, transparent 1.5px),
        radial-gradient(circle at 40% 80%, rgba(101, 67, 33, 0.7) 0.6px, transparent 1px),
        radial-gradient(circle at 90% 20%, rgba(139, 69, 19, 0.6) 0.9px, transparent 1.3px),
        radial-gradient(circle at 10% 90%, rgba(205, 133, 63, 0.5) 1.1px, transparent 1.6px),
        radial-gradient(circle at 60% 40%, rgba(160, 82, 45, 0.8) 0.7px, transparent 1.1px),
        radial-gradient(circle at 30% 60%, rgba(139, 69, 19, 0.7) 0.8px, transparent 1.2px),
        radial-gradient(circle at 70% 10%, rgba(101, 67, 33, 0.6) 0.9px, transparent 1.4px)
      `,
          backgroundSize:
            "25px 25px, 35px 35px, 20px 20px, 40px 40px, 30px 30px, 28px 28px, 33px 33px, 38px 38px",
        }}
      ></div>

      {/* GRANULADO SECUNDARIO - Puntos más pequeños */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 25% 75%, rgba(139, 69, 19, 1) 0.3px, transparent 0.6px),
        radial-gradient(circle at 75% 25%, rgba(160, 82, 45, 0.9) 0.4px, transparent 0.7px),
        radial-gradient(circle at 45% 15%, rgba(101, 67, 33, 0.8) 0.2px, transparent 0.5px),
        radial-gradient(circle at 85% 85%, rgba(205, 133, 63, 0.7) 0.5px, transparent 0.8px),
        radial-gradient(circle at 15% 45%, rgba(139, 69, 19, 0.9) 0.3px, transparent 0.6px),
        radial-gradient(circle at 65% 65%, rgba(160, 82, 45, 0.8) 0.4px, transparent 0.7px)
      `,
          backgroundSize:
            "15px 15px, 18px 18px, 12px 12px, 22px 22px, 16px 16px, 20px 20px",
        }}
      ></div>

      {/* TEXTURA ADICIONAL - Variación de tamaños */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 35% 55%, rgba(139, 69, 19, 0.6) 1.2px, transparent 2px),
        radial-gradient(circle at 55% 35%, rgba(101, 67, 33, 0.5) 1.5px, transparent 2.5px),
        radial-gradient(circle at 85% 55%, rgba(160, 82, 45, 0.7) 1px, transparent 1.8px)
      `,
          backgroundSize: "50px 50px, 45px 45px, 55px 55px",
        }}
      ></div>

      {/* Aro principal */}
      <div
        className="absolute left-[62%] top-1/3 h-[1300px] w-[1300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, 
        rgba(210, 110, 45, 0.3) 30%,
        rgba(225, 135, 70, 0.25) 32%, 
        rgba(240, 160, 95, 0.2) 40%,
        transparent 18%, 
        rgba(255, 245, 235, 0.15) 40%, 
        rgba(255, 245, 235, 0.25) 45%, 
        rgba(255, 245, 235, 0.3) 55%, 
        rgba(255, 245, 235, 0.2) 70%, 
        rgba(255, 245, 235, 0.1) 80%, 
        transparent 90%)`,
          filter: "blur(8px)",
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
