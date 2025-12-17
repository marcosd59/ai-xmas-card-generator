import LoadingSpinner from "./LoadingSpinner.jsx";

export default function PrimaryButton({
  children,
  loading = false,
  variant = "primary",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0F172A] shadow-xl shadow-[#D4AF37]/30 focus:ring-[#D4AF37]/60 focus:ring-offset-2 disabled:opacity-70 hover:shadow-2xl hover:shadow-[#D4AF37]/40",
    ghost:
      "border-2 border-[#D4AF37] bg-[#FAFAFA]/95 text-[#D4AF37] shadow-md hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] focus:ring-[#D4AF37]/30 disabled:opacity-70 hover:shadow-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <LoadingSpinner /> : null}
      {children}
    </button>
  );
}
