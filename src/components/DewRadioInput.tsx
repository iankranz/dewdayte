import React from "react";

interface RadioInputData {
  id: string;
  label: string;
  value: string;
}

export default function DewRadioInput({
  legend,
  name,
  checked,
  inputs,
  handleCheckedChange,
}: {
  legend: string;
  name: string;
  checked: string;
  inputs: RadioInputData[];
  handleCheckedChange: (checked: string) => void;
}) {
  function handleRadioInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleCheckedChange(e.target.value);
  }

  return (
    <fieldset>
      <legend className="mb-2 text-lg text-pewter">{legend}</legend>
      <div className="flex gap-3">
        {inputs.map((input) => {
          return (
            <div
              key={input.id}
              className="relative isolate flex h-fit w-fit items-center justify-center rounded-full px-4 py-2"
            >
              <input
                id={input.id}
                type="radio"
                name={name}
                value={input.value}
                checked={input.value === checked}
                className="peer absolute z-10 h-full w-full appearance-none rounded-full border border-screw bg-spray checked:bg-brand-purple"
                onChange={handleRadioInputChange}
              />
              <label
                htmlFor={input.id}
                className="relative z-20 text-black peer-checked:text-white"
              >
                {input.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
