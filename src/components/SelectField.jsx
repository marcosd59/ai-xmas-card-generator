export default function SelectField({ label, value, onChange, options, name }) {
  return (
    <label className="flex flex-col gap-4">
      <span className="text-sm font-medium text-[#D4AF37]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#D4AF37]/40 bg-[#0F172A] px-5 py-4 text-white shadow-lg outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 focus:shadow-xl hover:border-[#D4AF37]/60 font-normal text-base"
      >
        <option value="" className="bg-[#0F172A] text-white">
          Selecciona una opción
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#0F172A] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
