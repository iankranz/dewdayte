import DewRadioInput from "./DewRadioInput";
import { type Task } from "@/hooks/useTask";
import DewButton from "./DewButton";

export default function TaskViewPanel({
  task,
  handleDueCategoryChange,
}: {
  task: Task | null;
  handleDueCategoryChange: (value: string) => void;
}) {
  const dueCategories = [
    { id: "today-radio-item", label: "today", value: "TODAY" },
    { id: "this-week-radio-item", label: "this week", value: "THIS_WEEK" },
    { id: "this-month-radio-item", label: "this month", value: "THIS_MONTH" },
  ];

  if (!task) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-spline text-2xl">{task.name}</h1>
      <DewRadioInput
        legend="due"
        name="due category selector"
        inputs={dueCategories}
        checked={task.dueCategory ?? "TODAY"}
        handleCheckedChange={handleDueCategoryChange}
      />
      <p>{task.description}</p>
      <div className="flex flex-col gap-4">
        {/* <DewButton type="primary">complete</DewButton>
        <DewButton type="tertiary">delete task</DewButton> */}
      </div>
    </div>
  );
}
