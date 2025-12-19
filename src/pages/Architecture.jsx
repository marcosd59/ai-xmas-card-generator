export default function Architecture() {
  const services = [
    {
      id: "frontend",
      name: "Frontend",
      description: "React + Vite + Tailwind",
      image: "/images/react.png",
      color: "from-[#D4AF37]/20 to-[#A7F3D0]/20",
      borderColor: "border-[#D4AF37]/40",
      details: "Netlify - El usuario elige tono y tipo, hace clic en 'Generar'",
    },
    {
      id: "api-gateway",
      name: "API Gateway",
      description: "HTTP API",
      image: "/images/api-gateway.png",
      color: "from-[#A7F3D0]/20 to-[#D4AF37]/20",
      borderColor: "border-[#A7F3D0]/40",
      details: "Maneja CORS y enruta POST /generate a Lambda",
    },
    {
      id: "lambda",
      name: "AWS Lambda",
      description: "Node.js 20",
      image: "/images/lamda.png",
      color: "from-[#D4AF37]/20 to-[#A7F3D0]/20",
      borderColor: "border-[#D4AF37]/40",
      details: "Orquesta Bedrock, Polly y S3. Genera URL firmada",
    },
    {
      id: "bedrock",
      name: "Amazon Bedrock",
      description: "Claude Haiku",
      image: "/images/bedrock.png",
      color: "from-[#A7F3D0]/20 to-[#D4AF37]/20",
      borderColor: "border-[#A7F3D0]/40",
      details: "Genera el mensaje navideño con IA",
    },
    {
      id: "polly",
      name: "Amazon Polly",
      description: "Text-to-Speech",
      image: "/images/amazon-polly.png",
      color: "from-[#D4AF37]/20 to-[#A7F3D0]/20",
      borderColor: "border-[#D4AF37]/40",
      details: "Convierte el texto a voz (es-MX, Andres)",
    },
    {
      id: "s3",
      name: "Amazon S3",
      description: "Almacenamiento",
      image: "/images/s3.png",
      color: "from-[#A7F3D0]/20 to-[#D4AF37]/20",
      borderColor: "border-[#A7F3D0]/40",
      details: "Almacena MP3 con URL firmada (5 min expiración)",
    },
  ];

  const flowSteps = [
    {
      step: "1",
      title: "Usuario selecciona",
      description: "Elige tono y tipo de mensaje, luego hace clic en 'Generar'",
    },
    {
      step: "2",
      title: "Frontend envía petición",
      description: "POST /generate con {tono, tipo} a API Gateway",
    },
    {
      step: "3",
      title: "Lambda procesa",
      description: "Valida, llama Bedrock para texto, Polly para audio",
    },
    {
      step: "4",
      title: "Audio a S3",
      description: "Polly genera MP3 y Lambda lo sube a S3",
    },
    {
      step: "5",
      title: "URL firmada",
      description:
        "Lambda genera URL firmada (5 min) y responde {text, audioUrl}",
    },
    {
      step: "6",
      title: "Usuario recibe",
      description: "Frontend muestra texto y reproduce audio desde S3",
    },
  ];

  return (
    <div className="flex flex-col items-center px-4 pt-8 pb-6 relative">
      {/* Puntos amarillos parpadeantes sutiles */}
      <div className="stars">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/20 px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-[#D4AF37] drop-shadow-lg">
              🏗️ Arquitectura Serverless
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-medium md:text-4xl lg:text-5xl drop-shadow-2xl tracking-wide leading-tight">
            <span className="text-[#A7F3D0]">Cómo está</span>
            <br />
            <span className="text-white">Hecha la</span>
            <br />
            <span className="text-[#D4AF37]">Aplicación</span>
          </h1>

          <p className="text-base text-white/95 font-normal drop-shadow-md mb-3">
            Descubre la arquitectura serverless que potencia tu tarjeta navideña
          </p>
          <p className="text-sm text-white/85 font-light drop-shadow-sm">
            Tecnologías de AWS trabajando juntas para crear algo mágico
          </p>
        </div>

        {/* Diagrama de Arquitectura */}
        <div className="mb-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-[#A7F3D0]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#D4AF37]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <span className="text-lg">🔧</span>
                <p className="text-base font-medium text-[#D4AF37]">
                  Componentes de la Arquitectura
                </p>
              </div>
            </div>

            {/* Grid de servicios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={service.id}
                  className="relative rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0F172A]/80 to-[#1a2332]/80 p-6 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300"
                >
                  {service.image && (
                    <div className="mb-4 flex justify-center">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1a2332] border border-[#D4AF37]/20 p-3 flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-white mb-1 text-center">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-medium text-center mb-3">
                    {service.description}
                  </p>
                  <p className="text-xs text-white/70 font-light leading-relaxed text-center">
                    {service.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagrama de Flujo Visual */}
        <div className="mb-8 rounded-3xl border border-[#A7F3D0]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#A7F3D0]/8 via-transparent to-[#D4AF37]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#A7F3D0]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#A7F3D0]/10 border border-[#A7F3D0]/20">
                <p className="text-base font-medium text-[#A7F3D0]">
                  Flujo Completo
                </p>
              </div>
            </div>

            {/* Diagrama Visual con Flechas */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[1000px] md:min-w-full">
                {/* Fila 1: Usuario -> Frontend -> API Gateway -> Lambda */}
                <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 flex-wrap md:flex-nowrap">
                  {/* Usuario */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="text-2xl md:text-3xl mb-2">👤</div>
                      <p className="text-xs font-semibold text-white">
                        Usuario
                      </p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        Navegador
                      </p>
                    </div>
                  </div>

                  {/* Flecha */}
                  <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
                    <div className="flex items-center">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#A7F3D0] to-[#D4AF37]"></div>
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-[#D4AF37]"></div>
                    </div>
                    <p className="text-[9px] text-[#A7F3D0] mt-1 font-medium">
                      POST
                    </p>
                  </div>

                  {/* Frontend */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/react.png"
                          alt="React"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Frontend
                      </p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        React + Vite
                      </p>
                    </div>
                  </div>

                  {/* Flecha */}
                  <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
                    <div className="flex items-center">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#A7F3D0] to-[#D4AF37]"></div>
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-[#D4AF37]"></div>
                    </div>
                    <p className="text-[9px] text-[#A7F3D0] mt-1 font-medium">
                      HTTPS
                    </p>
                  </div>

                  {/* API Gateway */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#A7F3D0] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/api-gateway.png"
                          alt="API Gateway"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        API Gateway
                      </p>
                      <p className="text-[10px] text-[#A7F3D0] mt-1">
                        HTTP API
                      </p>
                    </div>
                  </div>

                  {/* Flecha */}
                  <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
                    <div className="flex items-center">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#A7F3D0] to-[#D4AF37]"></div>
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-[#D4AF37]"></div>
                    </div>
                    <p className="text-[9px] text-[#A7F3D0] mt-1 font-medium">
                      Invoca
                    </p>
                  </div>

                  {/* Lambda */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/lamda.png"
                          alt="Lambda"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">Lambda</p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        Node.js 20
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fila 2: Lambda -> Bedrock y Polly (en paralelo) */}
                <div className="flex items-start justify-center mb-6 relative">
                  {/* Lambda (centro) */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/lamda.png"
                          alt="Lambda"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">Lambda</p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        Orquesta
                      </p>
                    </div>

                    {/* Flechas hacia abajo */}
                    <div className="flex gap-6 md:gap-12 mt-3">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#A7F3D0]"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-[#A7F3D0]"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#A7F3D0]"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-[#A7F3D0]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fila 3: Bedrock y Polly */}
                <div className="flex items-center justify-center gap-6 md:gap-12 mb-6">
                  {/* Bedrock */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#A7F3D0] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/bedrock.png"
                          alt="Bedrock"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Bedrock
                      </p>
                      <p className="text-[10px] text-[#A7F3D0] mt-1">
                        Claude Haiku
                      </p>
                    </div>
                  </div>

                  {/* Polly */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/amazon-polly.png"
                          alt="Polly"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">Polly</p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        Text-to-Speech
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fila 4: Polly -> S3 -> Usuario */}
                <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
                  {/* Espacio para alinear con Polly */}
                  <div className="w-32 md:w-36"></div>

                  {/* Flecha hacia abajo desde Polly */}
                  <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
                    <div className="h-10 md:h-12 w-0.5 bg-gradient-to-b from-[#A7F3D0] to-[#D4AF37]"></div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-[#D4AF37]"></div>
                    <p className="text-[9px] text-[#A7F3D0] mt-1 font-medium">
                      MP3
                    </p>
                  </div>

                  {/* S3 */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#A7F3D0] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 flex items-center justify-center bg-white/5 rounded-lg p-2">
                        <img
                          src="/images/s3.png"
                          alt="S3"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white">S3</p>
                      <p className="text-[10px] text-[#A7F3D0] mt-1">
                        Almacenamiento
                      </p>
                    </div>
                  </div>

                  {/* Flecha de vuelta al usuario */}
                  <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
                    <div className="flex items-center">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#A7F3D0]"></div>
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-[#A7F3D0]"></div>
                    </div>
                    <p className="text-[9px] text-[#D4AF37] mt-1 font-medium">
                      URL
                    </p>
                  </div>

                  {/* Usuario recibe */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-4 w-32 md:w-36 text-center backdrop-blur-sm shadow-lg">
                      <div className="text-2xl md:text-3xl mb-2">🎄</div>
                      <p className="text-xs font-semibold text-white">
                        Usuario
                      </p>
                      <p className="text-[10px] text-[#D4AF37] mt-1">
                        Recibe tarjeta
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen del flujo */}
            <div className="mt-8 rounded-2xl border border-[#A7F3D0]/40 bg-gradient-to-br from-[#0F172A]/80 to-[#1a2332]/80 p-6 backdrop-blur-sm max-w-4xl mx-auto">
              <h4 className="text-base font-medium text-[#A7F3D0] mb-3 text-center">
                Flujo completo
              </h4>
              <p className="text-sm text-white/90 font-light leading-relaxed text-center">
                El usuario selecciona tono y tipo, el frontend envía la petición
                a API Gateway, Lambda se activa automáticamente, llama a Bedrock
                para generar el texto y a Polly para convertir a voz, el MP3 se
                almacena en S3, y finalmente el usuario recibe el texto y la URL
                firmada del audio para reproducirlo.
              </p>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div className="mb-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-[#A7F3D0]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#D4AF37]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <span className="text-lg">🔒</span>
                <p className="text-base font-medium text-[#D4AF37]">
                  Seguridad y Privacidad
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Sin credenciales en el frontend",
                "CORS configurado solo para el dominio del sitio",
                "URLs firmadas de S3 expiran en ~5 minutos",
                "Lambda valida entrada (tono/tipo permitidos)",
                "Timeouts defensivos en cliente (20s) y backend",
                "IAM con permisos mínimos necesarios",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0F172A]/60 to-[#1a2332]/60 p-4 backdrop-blur-sm"
                >
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <p className="text-sm text-white/90 font-light leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
