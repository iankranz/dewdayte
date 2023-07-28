export default function DewButton({
  type,
  children,
  handleClick,
}: {
  type: "primary" | "secondary";
  children: React.ReactNode;
  handleClick?: () => void;
}) {
  const bgClass = type === "primary" ? "bg-pewrple" : "bg-transparent";

  const textColorClass = type === "primary" ? "text-white" : "text-pewrple";

  const borderClass =
    type === "primary" ? "border-transparent" : "border-pewrple";

  return (
    <button
      className={`w-full rounded-lg border-2 px-8 py-4 font-spline ${bgClass} ${textColorClass} ${borderClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
