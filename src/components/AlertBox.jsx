export default function AlertBox({ type = "error", message }) {
  if (!message) return null;

  const styles = {
    error: "bg-red-50 text-red-700 border-red-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
  };

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${styles[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
}
