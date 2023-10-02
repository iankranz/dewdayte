import DewButton from "./DewButton";
import DewTextInput from "./DewTextInput";
import { useState, useEffect } from "react";
import DewTextArea from "./DewTextArea";
import DewRadioInput from "./DewRadioInput";
import { type Task } from "@/hooks/useTask";

export default function TaskEditPanel({
  task,
  handleFormSubmit,
  handleFormDiscard,
}: {
  task: Task | null;
  handleFormSubmit: (
    name: string | null,
    dueCategory: string,
    description: string | null
  ) => void;
  handleFormDiscard: () => void;
}) {
  const [name, setName] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueCategory, setDueCategory] = useState("TODAY");

  const dueCategories = [
    { id: "today-radio-item", label: "today", value: "TODAY" },
    { id: "this-week-radio-item", label: "this week", value: "THIS_WEEK" },
    { id: "this-month-radio-item", label: "this month", value: "THIS_MONTH" },
  ];

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function handleDueCategoryChange(newDueCategory: string) {
    setDueCategory(newDueCategory);
  }

  function handleDoneClick() {
    handleFormSubmit(name, dueCategory, description);
  }

  function handleDiscardClick() {
    handleFormDiscard();
  }

  useEffect(() => {
    if (!task) return;
    setName(task.name ?? "");
    setDueCategory(task.dueCategory ?? "TODAY");
    setDescription(task.description ?? "");
  }, [task]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
      <DewTextInput
        value={name}
        handleChange={handleNameChange}
        label="task name"
        htmlFor="task-name-input"
      />
      <DewRadioInput
        legend="due"
        name="due category selector"
        inputs={dueCategories}
        checked={dueCategory}
        handleCheckedChange={handleDueCategoryChange}
      />
      <DewTextArea
        value={description}
        handleChange={handleDescriptionChange}
        label="description"
        htmlFor="task-description-textarea"
      />
      <div className="flex flex-col gap-4">
        <DewButton type="primary" handleClick={handleDoneClick}>
          done
        </DewButton>
        <DewButton type="tertiary" handleClick={handleDiscardClick}>
          discard changes
        </DewButton>
      </div>
    </form>
  );
}
