import CheckIcon from "@/icons/CheckIcon";

export default function DewCheckbox() {
  return (
    <div className="relative h-8 w-8 shrink-0">
      <input
        type="checkbox"
        className="peer h-full w-full cursor-pointer appearance-none rounded-full border-2 border-screw bg-spray checked:border-brand-purple checked:bg-brand-purple"
      />
      <div className="pointer-events-none invisible absolute inset-0 flex items-center justify-center peer-checked:visible">
        <CheckIcon />
      </div>
    </div>
  );
}
