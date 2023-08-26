import CheckIcon from "@/icons/CheckIcon";
import { useState } from "react";

export default function DewCheckbox({
  checked,
  handleInputChange,
}: {
  checked: boolean;
  handleInputChange: (checked: boolean) => void;
}) {
  const [value, setValue] = useState(checked ? "checked" : "unchecked");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputChange(e.target.value === "checked");
    setValue(e.target.value === "checked" ? "unchecked" : "checked");
  }

  return (
    <div className="relative h-8 w-8 shrink-0">
      <input
        checked={checked}
        type="checkbox"
        className="peer h-full w-full cursor-pointer appearance-none rounded-full border-2 border-screw bg-spray checked:border-brand-purple checked:bg-brand-purple"
        onChange={handleChange}
        value={value}
      />
      <div className="pointer-events-none invisible absolute inset-0 flex items-center justify-center peer-checked:visible">
        <CheckIcon />
      </div>
    </div>
  );
}
