import DewButton from "./DewButton";
import DewTextInput from "./DewTextInput";
import { useState } from "react";
import DewTextArea from "./DewTextArea";
import DewRadioInput from "./DewRadioInput";

export default function TaskEditPanel({
  handleFormSubmit,
  handleFormDiscard,
}: {
  handleFormSubmit: (
    name: string,
    dueCategory: string,
    description: string
  ) => void;
  handleFormDiscard: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueCategory, setDueCategory] = useState("today");

  const dueCategories = [
    { id: "today-radio-item", label: "today", value: "today" },
    { id: "this-week-radio-item", label: "this week", value: "this-week" },
    { id: "this-month-radio-item", label: "this month", value: "this-month" },
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
      <div>
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
