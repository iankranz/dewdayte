export default function DewTextArea({
  value,
  handleChange,
  htmlFor,
  label,
}: {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className="flex h-60 flex-col gap-2">
      <label htmlFor={htmlFor} className="text-lg text-pewter">
        {label}
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full grow rounded-xl border border-screw bg-spray p-4 text-near-black focus:border-near-black focus:outline-none"
        id={htmlFor}
      />
    </div>
  );
}
