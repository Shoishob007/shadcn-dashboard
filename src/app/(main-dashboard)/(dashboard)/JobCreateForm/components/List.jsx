import { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "./SortableRow";
import { Button } from "@/components/ui/button";
import { FileWarning, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export function StepsList({ availableSteps, selectedSteps, onStepsChange }) {
  const [activeId, setActiveId] = useState(null);
  const [isAddingCustomStep, setIsAddingCustomStep] = useState(false);
  const [customStepTitle, setCustomStepTitle] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = selectedSteps.findIndex((step) => step.id === active.id);
      const newIndex = selectedSteps.findIndex((step) => step.id === over.id);

      const newSteps = [...selectedSteps];
      const [removed] = newSteps.splice(oldIndex, 1);
      newSteps.splice(newIndex, 0, removed);

      // Update sequences
      const updatedSteps = newSteps.map((step, index) => ({
        ...step,
        sequence: index + 1,
      }));

      onStepsChange(updatedSteps);
    }

    setActiveId(null);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const removeStep = (stepId) => {
    const updatedSteps = selectedSteps
      .filter((step) => step.id !== stepId)
      .map((step, index) => ({
        ...step,
        sequence: index + 1,
      }));
    onStepsChange(updatedSteps);
  };

  const addStep = (step) => {
    if (selectedSteps.some((s) => s.id === step.id)) return;

    const newStep = {
      ...step,
      sequence: selectedSteps.length + 1,
    };

    onStepsChange([...selectedSteps, newStep]);

    console.log(selectedSteps)
  };

  const handleAddCustomStep = () => {
    if (!customStepTitle.trim()) return;

    const customStep = {
      id: `custom-${Date.now()}`,
      title: customStepTitle,
      sequence: selectedSteps.length + 1,
    };

    onStepsChange([...selectedSteps, customStep]);
    setCustomStepTitle("");
    setIsAddingCustomStep(false);
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
      <div className="flex-1">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={selectedSteps.map((step) => step.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedSteps.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-center text-gray-700 dark:text-gray-400 bg-secondary dark:bg-gray-800 px-4 py-4 sm:py-12 rounded-md dark:border dark:border-gray-500">
                  <FileWarning className="h-6 sm:h-12 w-6 sm:w-12 mb-2" />
                  <p className="text-xs sm:text-sm ">
                    No steps added yet. Add steps from the box and they will be
                    displayed here!
                  </p>
                </div>
              ) : (
                selectedSteps.map((step) => (
                  <SortableRow
                    key={step.id}
                    item={step}
                    removeItem={removeStep}
                  />
                ))
              )}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableRow
                item={selectedSteps.find((step) => step.id === activeId)}
                removeItem={removeStep}
                forceDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div className="w-fit h-fit bg-secondary mx-auto sm:mx-0 dark:bg-gray-800 border dark:border-gray-500 p-4 rounded-lg">
        <h3 className="text-sm font-medium sm:mb-3 text-center dark:underline dark:underline-offset-4">
          Available Stages
        </h3>
        <div className="space-y-2 flex flex-col">
          {availableSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center gap-0 justify-between dark:bg-gray-800 rounded-md"
            >
              <span className="text-xs sm:text-sm p-1 sm:p-2">
                {step.title}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="p-0 hover:!bg-transparent"
                onClick={() => addStep(step)}
                disabled={selectedSteps.some((s) => s.id === step.id)}
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-800 dark:text-gray-300" />
              </Button>
              <Separator orientation="vertical" className="px-2" />
            </div>
          ))}

          {/* "Others" Button */}
          {isAddingCustomStep ? (
            <div className="flex flex-col gap-2">
              <Input
                value={customStepTitle}
                onChange={(e) => setCustomStepTitle(e.target.value)}
                placeholder="Enter custom step title"
                className="text-sm placeholder:text-xs border"
              />
              <Button 
                size="sm"
                onClick={handleAddCustomStep}
                disabled={!customStepTitle.trim()}
              >
               + Add Step
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddingCustomStep(true)}
              className="mt-2 bg-secondary hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 border dark:border-gray-500 transition-all duration-300"
            >
              + Add Custom Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
