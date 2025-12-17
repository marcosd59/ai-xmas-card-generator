import { useEffect, useState } from "react";

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generar configuración para cada copo
    // Usamos sessionStorage para mantener la misma configuración durante la sesión
    const getSnowflakeConfig = () => {
      const stored = sessionStorage.getItem("snowflakeConfig");

      let config;

      if (stored) {
        try {
          config = JSON.parse(stored);
        } catch {
          // Si hay error al parsear, generar nueva configuración
          config = null;
        }
      }

      if (!config) {
        // Generar configuración para 15 copos con delays y posiciones distribuidas
        config = Array.from({ length: 15 }, (_, i) => {
          const random = Math.random();
          return {
            left: i * 6.67 + random * 3, // Distribuir horizontalmente con variación
            delay: random * 6, // Delay aleatorio hasta 6 segundos para distribución
            duration: 5 + random * 2, // Duración entre 5-7 segundos
          };
        });

        sessionStorage.setItem("snowflakeConfig", JSON.stringify(config));
      }

      return config;
    };

    setSnowflakes(getSnowflakeConfig());
  }, []);

  const snowflakeChars = ["❄", "❅", "❆"];

  // Si aún no tenemos configuración, no renderizar nada
  if (snowflakes.length === 0) {
    return null;
  }

  return (
    <div className="snowflakes">
      {snowflakes.map((config, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${config.left}%`,
            animationDelay: `${config.delay}s`,
            animationDuration: `${config.duration}s`,
          }}
        >
          {snowflakeChars[i % 3]}
        </div>
      ))}
    </div>
  );
}
