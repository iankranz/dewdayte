export default function DewButton({
  type,
  children,
  handleClick,
  width,
  padding,
}: {
  type: "primary" | "secondary" | "tertiary" | "surface-light";
  children: React.ReactNode;
  handleClick?: () => void;
  width?: "full" | "fit";
  padding?: "md" | "sm";
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

  let widthClass = "";
  switch (width) {
    case "fit":
      widthClass = "w-fit";
      break;
    case "full":
    default:
      widthClass = "w-full";
  }

  let paddingClass = "";
  switch (padding) {
    case "sm":
      paddingClass = "px-3.5 py-1.5";
      break;
    case "md":
    default:
      paddingClass = "px-8 py-4";
  }

  return (
    <button
      className={`box-border rounded-lg border-2 font-spline ${bgClass} ${textColorClass} ${borderClass} ${widthClass} ${paddingClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
