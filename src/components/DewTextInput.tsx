export default function DewTextInput({
  value,
  handleChange,
  htmlFor,
  label,
}: {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-lg text-pewter">
        {label}
      </label>
      <input
        value={value}
        onChange={handleChange}
        className="w-full rounded-xl border border-screw bg-spray p-4 text-near-black focus:border-near-black focus:outline-none"
        id={htmlFor}
      />
    </div>
  );
}
