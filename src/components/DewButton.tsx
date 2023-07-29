export default function DewButton({
  type,
  children,
  handleClick,
}: {
  type: "primary" | "secondary" | "tertiary" | "surface-light";
  children: React.ReactNode;
  handleClick?: () => void;
}) {
  let bgClass = "";
  let textColorClass = "";
  let borderClass = "";

  switch (type) {
    case "primary":
      bgClass = "bg-brand-purple";
      textColorClass = "text-white";
      borderClass = "border-transparent";
      break;
    case "secondary":
      bgClass = "bg-transparent";
      textColorClass = "text-brand-purple";
      borderClass = "border-brand-purple";
      break;
    case "tertiary":
      bgClass = "bg-transparent";
      textColorClass = "text-brand-purple";
      borderClass = "border-transparent";
      break;
    case "surface-light":
      bgClass = "bg-white";
      textColorClass = "text-near-black";
      borderClass = "border-transparent";
      break;
  }

  return (
    <button
      className={`w-full rounded-lg border-2 px-8 py-4 font-spline ${bgClass} ${textColorClass} ${borderClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
