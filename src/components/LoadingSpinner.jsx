export default function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <span
      className={`${sizeClasses[size]} animate-spin rounded-full border-red-500/60 border-t-red-600`}
      aria-hidden="true"
    />
  );
}
