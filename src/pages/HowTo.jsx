export default function HowTo() {
  const steps = [
    {
      number: "01",
      title: "Elige el tono",
      description:
        "Selecciona entre emotivo, alegre, tranquilo o inspirador para definir el sentimiento de tu mensaje.",
      icon: "🎭",
    },
    {
      number: "02",
      title: "Selecciona el tipo",
      description:
        "Elige entre reflexión fin de año, agradecimiento, esperanza o sorpresa para personalizar tu tarjeta.",
      icon: "🎁",
    },
    {
      number: "03",
      title: "Genera tu tarjeta",
      description:
        "Pulsa el botón 'Generar Tarjeta' y espera unos segundos. Nuestra IA creará un mensaje único para ti.",
      icon: "✨",
    },
    {
      number: "04",
      title: "Disfruta y comparte",
      description:
        "Escucha el audio, copia el texto o comparte tu tarjeta navideña personalizada con tus seres queridos.",
      icon: "🎄",
    },
  ];

  const ejemplos = [
    {
      tono: "Emotivo",
      tipo: "Agradecimiento",
      color: "from-[#D4AF37]/20 to-[#A7F3D0]/20",
    },
    {
      tono: "Alegre",
      tipo: "Sorpresa",
      color: "from-[#A7F3D0]/20 to-[#D4AF37]/20",
    },
    {
      tono: "Tranquilo",
      tipo: "Reflexión fin de año",
      color: "from-[#D4AF37]/20 to-[#A7F3D0]/20",
    },
    {
      tono: "Inspirador",
      tipo: "Esperanza",
      color: "from-[#A7F3D0]/20 to-[#D4AF37]/20",
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

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          {/* Badge Powered by AI */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/20 px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-[#D4AF37] drop-shadow-lg">
              📖 Guía paso a paso
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-medium md:text-4xl lg:text-5xl drop-shadow-2xl tracking-wide leading-tight">
            <span className="text-[#D4AF37]">Aprende a</span>
            <br />
            <span className="text-white">Crear tu Tarjeta</span>
            <br />
            <span className="text-[#A7F3D0]">Navideña</span>
          </h1>

          <p className="text-base text-white/95 font-normal drop-shadow-md mb-3">
            Sigue estos sencillos pasos para crear tu tarjeta navideña perfecta
          </p>
          <p className="text-sm text-white/85 font-light drop-shadow-sm">
            Generada con inteligencia artificial, única y personalizada para ti
          </p>
        </div>

        {/* Pasos */}
        <div className="mb-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-[#A7F3D0]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#D4AF37]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <span className="text-lg">📝</span>
                <p className="text-base font-medium text-[#D4AF37]">
                  Pasos para crear tu tarjeta
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0F172A]/80 to-[#1a2332]/80 p-6 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#A7F3D0]/20 flex items-center justify-center text-2xl">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          {step.number}
                        </span>
                        <h3 className="text-lg font-medium text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-white/80 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="mb-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-[#A7F3D0]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#D4AF37]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#A7F3D0]/10 border border-[#A7F3D0]/20">
                <span className="text-lg">💡</span>
                <p className="text-base font-medium text-[#A7F3D0]">
                  Ejemplos de combinaciones
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ejemplos.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0F172A]/80 to-[#1a2332]/80 p-5 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                    Ejemplo {idx + 1}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-white/60 font-light">Tono</p>
                      <p className="text-sm font-medium text-white">
                        {item.tono}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-light">Tipo</p>
                      <p className="text-sm font-medium text-white">
                        {item.tipo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacidad */}
        <div className="mb-8 rounded-3xl border border-[#A7F3D0]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#A7F3D0]/8 via-transparent to-[#D4AF37]/5 pointer-events-none"></div>

          {/* Borde interno sutil */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#A7F3D0]/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#A7F3D0]/10 border border-[#A7F3D0]/20">
                <span className="text-lg">🔒</span>
                <p className="text-base font-medium text-[#A7F3D0]">
                  Privacidad y seguridad
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-white/90 font-light leading-relaxed text-center">
                No almacenamos tus selecciones ni el contenido generado. El
                audio se sirve desde una URL firmada con expiración corta y solo
                para que puedas escucharlo o descargarlo al momento. Tu
                privacidad es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
