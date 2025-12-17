export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-3 mt-2 relative z-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-white/80 mb-1">
          Hecho con <span className="text-[#D4AF37]">✨</span> y mucho espíritu
          navideño
        </p>
        <p className="text-xs text-white/60">
          © 2025 - AI Xmas Card Generator
        </p>
      </div>
    </footer>
  );
}
