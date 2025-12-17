import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinkClass =
  "px-3 py-2 text-sm font-medium rounded-full transition-colors duration-150";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo/Título */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg md:text-xl font-medium">
            Tarjeta Navideña
          </span>
          <span className="hidden sm:inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            MVP
          </span>
        </div>

        {/* Menú Desktop - Oculto en móvil */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/como-usarlo"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Cómo usarlo
          </NavLink>
          <NavLink
            to="/arquitectura"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Arquitectura
          </NavLink>
        </nav>

        {/* Botón Hamburger - Solo visible en móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 text-white hover:bg-white/15 rounded-full transition-colors duration-150"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mt-1.5 transform transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menú Móvil - Desplegable */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-full transition-colors duration-150 ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/como-usarlo"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-full transition-colors duration-150 ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Cómo usarlo
          </NavLink>
          <NavLink
            to="/arquitectura"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-full transition-colors duration-150 ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-white hover:bg-white/15"
              }`
            }
          >
            Arquitectura
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
