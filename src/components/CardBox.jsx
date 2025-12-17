export default function CardBox({ title, children }) {
  return (
    <section className="glass-card rounded-2xl border border-white/50 p-6 shadow-xl">
      {title ? (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-slate-900">{title}</h2>
        </div>
      ) : null}
      <div className="text-slate-800">{children}</div>
    </section>
  );
}
