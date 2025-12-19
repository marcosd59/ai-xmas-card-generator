import { useEffect, useRef, useState } from "react";
import SelectField from "../components/SelectField.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import AlertBox from "../components/AlertBox.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Footer from "../components/Footer.jsx";
import { generateCard } from "../api/generateCard.js";

const toneOptions = [
  { value: "emotivo", label: "Emotivo" },
  { value: "alegre", label: "Alegre" },
  { value: "tranquilo", label: "Tranquilo" },
  { value: "inspirador", label: "Inspirador" },
];

const typeOptions = [
  { value: "reflexion fin de año", label: "Reflexión fin de año" },
  { value: "agradecimiento", label: "Agradecimiento" },
  { value: "esperanza", label: "Esperanza" },
  { value: "sorpresa", label: "Sorpresa" },
];

export default function Home() {
  const [tono, setTono] = useState("");
  const [tipo, setTipo] = useState("");
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const backgroundAudioRef = useRef(null);

  // Música de fondo - Solo cuando se genera la tarjeta
  useEffect(() => {
    if (generated && backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = 0.3;
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.play().catch(() => {
        // autoplay fallback: user can press play
      });
    } else if (!generated && backgroundAudioRef.current) {
      // Pausar música si se resetea
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }

    // Cleanup: detener audio al desmontar o cambiar estado
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.currentTime = 0;
      }
    };
  }, [generated]);

  // Audio del mensaje - Detener cuando se resetea o cambia
  useEffect(() => {
    if (audioUrl && audioRef.current && generated) {
      // Detener cualquier audio anterior antes de cargar el nuevo
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      // Cargar el nuevo audio
      audioRef.current.load();

      // Intentar reproducir automáticamente cuando el audio esté listo
      const playAudio = async () => {
        if (audioRef.current) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            // Si falla el autoplay (políticas del navegador), intentar de nuevo
            // Esto puede pasar si el navegador bloquea el autoplay
            console.log(
              "Intento de autoplay, si falla el usuario puede presionar play"
            );
            setIsPlaying(false);
          }
        }
      };

      // Intentar reproducir cuando el audio tenga datos suficientes
      const handleCanPlay = () => {
        playAudio();
      };

      // También intentar cuando el audio esté completamente cargado
      const handleLoadedData = () => {
        playAudio();
      };

      audioRef.current.addEventListener("canplay", handleCanPlay, {
        once: true,
      });
      audioRef.current.addEventListener("loadeddata", handleLoadedData, {
        once: true,
      });

      // Intentar reproducir inmediatamente también (por si ya está listo)
      playAudio();

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplay", handleCanPlay);
          audioRef.current.removeEventListener("loadeddata", handleLoadedData);
        }
      };
    } else if ((!audioUrl || !generated) && audioRef.current) {
      // Detener audio si no hay URL o si se resetea
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }

    // Cleanup: detener audio al desmontar o cambiar estado
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioUrl, generated]);

  // Actualizar tiempo y duración del audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioUrl, generated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tono || !tipo) {
      setError(
        "Por favor, selecciona un tono y un tipo de mensaje para crear tu regalo especial."
      );
      return;
    }

    setLoading(true);

    // Detener cualquier audio anterior antes de generar uno nuevo
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }

    try {
      const data = await generateCard({ tono, tipo });
      setText(data.text || "");
      setAudioUrl(data.audioUrl || "");
      setGenerated(true);
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado.");
      setGenerated(false);
      // Asegurar que los audios estén detenidos en caso de error
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.currentTime = 0;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Detener todos los audios antes de resetear
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }

    setText("");
    setAudioUrl("");
    setGenerated(false);
    setError("");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "mensaje-navideno.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center px-4 pt-8 pb-6 relative">
      {/* Música de fondo */}
      <audio
        ref={backgroundAudioRef}
        src="/audio/navidad.mp3"
        loop
        volume={0.1}
        style={{ display: "none" }}
      />

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
        {/* Paso 1: Formulario de selección */}
        {!generated && !loading && (
          <>
            {/* Header con mensaje de regalo */}
            <div className="mb-8 text-center">
              {/* Badge Powered by AI */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/20 px-4 py-2 shadow-lg">
                <span className="text-sm font-medium text-[#D4AF37] drop-shadow-lg">
                  ✨ Powered by AI
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-medium md:text-5xl lg:text-6xl drop-shadow-2xl tracking-normal leading-tight">
                <span className="text-white mr-2">Tu</span>
                <span className="text-[#D4AF37] mr-2">Tarjeta</span>
                <br />
                <span className="text-white mr-2">Navideña</span>
                <span className="text-[#D4AF37]">Perfecta</span>
              </h1>

              <p className="text-base text-white/95 font-normal drop-shadow-md mb-3">
                Hecha especialmente para ti, con todo mi cariño
              </p>
              <p className="text-sm text-white/85 font-light drop-shadow-sm">
                Selecciona cómo quieres que sea tu mensaje y crearemos algo
                único juntos
              </p>
            </div>

            {/* Panel de controles */}
            <div className="mb-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A]/98 via-[#0F172A]/95 to-[#0F172A]/98 backdrop-blur-xl p-6 shadow-2xl md:p-8 relative overflow-hidden">
              {/* Efecto sutil de brillo mejorado */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-[#A7F3D0]/5 pointer-events-none"></div>

              {/* Borde interno sutil */}
              <div className="absolute inset-[1px] rounded-3xl border border-[#D4AF37]/10 pointer-events-none"></div>

              {/* Mensaje especial de regalo */}
              <div className="mb-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  <span className="text-lg">💝</span>
                  <p className="text-base font-medium text-[#D4AF37]">
                    Personaliza tu regalo navideño
                  </p>
                </div>
                <p className="text-sm text-white/80 font-light max-w-md mx-auto">
                  Elige el tono y el tipo de mensaje que más te guste. Nuestra
                  IA creará algo único para ti.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField
                    label="¿Qué tono quieres para tu mensaje?"
                    value={tono}
                    onChange={setTono}
                    options={toneOptions}
                    name="tono"
                  />
                  <SelectField
                    label="¿Qué tipo de mensaje te gustaría?"
                    value={tipo}
                    onChange={setTipo}
                    options={typeOptions}
                    name="tipo"
                  />
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  <PrimaryButton type="submit" loading={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Creando tu regalo especial...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Generar Tarjeta
                      </span>
                    )}
                  </PrimaryButton>
                </div>
                {error && (
                  <div className="mt-6">
                    <AlertBox type="error" message={error} />
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        {/* Paso 2: Tarjeta generada */}
        {(generated || loading) && (
          <div className="relative">
            {loading ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center space-y-8 relative z-10">
                <div className="text-6xl mb-6 animate-bounce">🎁</div>
                <LoadingSpinner size="lg" />
                <div className="text-center">
                  <p className="text-xl font-medium text-[#D4AF37]">
                    Estoy preparando tu regalo especial...
                  </p>
                  <p className="text-sm text-white/80 mt-4">
                    Un momento mágico, solo unos segundos más
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    ✨
                  </span>
                  <span
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    🎄
                  </span>
                  <span
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ⭐
                  </span>
                  <span
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: "0.6s" }}
                  >
                    💝
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Tarjeta principal */}
                <div className="relative mx-auto w-full max-w-2xl transform transition-all duration-700 ease-out scale-100 opacity-100">
                  {/* Borde degradado mejorado - sin animación pulse */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#D4AF37]/50 via-[#A7F3D0]/40 via-white/30 to-[#D4AF37]/50 p-[2px] shadow-2xl"></div>

                  {/* Contenido de la tarjeta - Fondo oscuro mejorado */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1a2332] to-[#0F172A] p-10 shadow-2xl md:p-12 backdrop-blur-sm border border-[#D4AF37]/30">
                    {/* Efecto de brillo mejorado */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#A7F3D0]/15 pointer-events-none"></div>

                    {/* Patrón de fondo sutil más elegante */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                      }}
                    ></div>

                    <div className="space-y-8 relative z-10">
                      {/* Encabezado de la tarjeta mejorado */}
                      <div className="border-b border-[#D4AF37]/40 pb-8 text-center relative pt-8">
                        {/* Línea decorativa superior - completamente fuera del contenedor */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-20 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#A7F3D0] to-[#D4AF37] rounded-full shadow-lg"></div>
                        </div>
                        {/* Título con espacio suficiente */}
                        <div className="pt-8">
                          <h2 className="text-4xl font-medium text-white md:text-5xl drop-shadow-2xl font-great-vibes tracking-normal mb-6 leading-tight">
                            {text ? "Feliz Navidad" : ""}
                          </h2>
                        </div>
                        {text && (
                          <div className="mt-4 space-y-2">
                            <p className="text-xs font-light uppercase tracking-[0.2em] text-[#A7F3D0]/90">
                              {tipo} • {tono}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Mensaje generado mejorado */}
                      {text && (
                        <>
                          {/* Badge IA sutil */}
                          <div className="flex justify-center mb-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5">
                              <svg
                                className="w-3 h-3 text-[#D4AF37]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-medium text-[#D4AF37]/90">
                                Generado con IA
                              </span>
                            </div>
                          </div>

                          <div className="min-h-[200px] py-6 px-4">
                            <div className="whitespace-pre-line text-center text-lg leading-[1.9] text-white/95 md:text-xl font-normal card-text">
                              {text}
                            </div>
                          </div>

                          {/* Audio player personalizado */}
                          {audioUrl && (
                            <div className="mt-8 rounded-2xl border border-[#A7F3D0]/40 bg-gradient-to-br from-[#0F172A]/90 to-[#1a2332]/90 p-6 shadow-xl backdrop-blur-sm">
                              <div className="mb-5 flex items-center justify-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-pulse"></div>
                                <span className="text-sm font-medium text-[#A7F3D0] tracking-wide">
                                  Tu mensaje también tiene voz
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-pulse"></div>
                              </div>

                              {/* Audio oculto para control */}
                              <audio
                                ref={audioRef}
                                autoPlay
                                src={audioUrl}
                                style={{ display: "none" }}
                              />

                              {/* Reproductor personalizado */}
                              <div className="mt-4 space-y-4">
                                {/* Controles principales */}
                                <div className="flex items-center gap-4">
                                  {/* Botón Play/Pause */}
                                  <button
                                    onClick={togglePlayPause}
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D4AF37] transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 group"
                                    aria-label={
                                      isPlaying ? "Pausar" : "Reproducir"
                                    }
                                  >
                                    {isPlaying ? (
                                      <svg
                                        className="w-6 h-6 text-[#0F172A] ml-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                      </svg>
                                    ) : (
                                      <svg
                                        className="w-6 h-6 text-[#0F172A] ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    )}
                                  </button>

                                  {/* Barra de progreso */}
                                  <div className="flex-1 space-y-2">
                                    <div
                                      className="relative h-2.5 bg-[#0F172A]/60 rounded-full cursor-pointer group border border-[#A7F3D0]/20"
                                      onClick={handleSeek}
                                    >
                                      <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#A7F3D0] via-[#D4AF37] to-[#F59E0B] rounded-full transition-all duration-100 shadow-sm"
                                        style={{
                                          width: `${
                                            duration
                                              ? (currentTime / duration) * 100
                                              : 0
                                          }%`,
                                        }}
                                      />
                                      <div
                                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#D4AF37] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border-2 border-white/30"
                                        style={{
                                          left: `calc(${
                                            duration
                                              ? (currentTime / duration) * 100
                                              : 0
                                          }% - 10px)`,
                                        }}
                                      />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/70 font-medium">
                                      <span>{formatTime(currentTime)}</span>
                                      <span>{formatTime(duration)}</span>
                                    </div>
                                  </div>

                                  {/* Botón de descarga */}
                                  <button
                                    onClick={handleDownload}
                                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0F172A]/60 hover:bg-[#0F172A]/80 border border-[#A7F3D0]/30 hover:border-[#A7F3D0]/50 transition-all duration-300 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 group"
                                    aria-label="Descargar audio"
                                    title="Descargar audio"
                                  >
                                    <svg
                                      className="w-5 h-5 text-[#A7F3D0] group-hover:text-[#D4AF37] transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-center text-white/50 mt-4 italic font-light">
                                Escucha tu mensaje personalizado
                              </p>
                            </div>
                          )}

                          {/* Pie de página mejorado */}
                          <div className="flex flex-col items-center gap-2 pt-6 border-t border-[#D4AF37]/20">
                            <p className="text-xs text-white/50 font-light">
                              Creado con ✨ AI Xmas Card Generator
                            </p>
                            <p className="text-[10px] text-white/30 font-light">
                              Mensaje generado con inteligencia artificial
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                {text && (
                  <div className="mt-8 flex flex-wrap gap-5 justify-center">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(text);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium bg-[#0F172A] hover:bg-[#0F172A]/90 text-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copiar
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: "Mi Tarjeta Navideña",
                            text: text,
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium bg-[#0F172A] hover:bg-[#0F172A]/90 text-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      Compartir
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
                      Nueva Tarjeta
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
