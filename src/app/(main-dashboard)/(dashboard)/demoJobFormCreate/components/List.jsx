import { useState } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableRow } from './SortableRow';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function StepsList({ availableSteps, selectedSteps, onStepsChange }) {
  const [activeId, setActiveId] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = selectedSteps.findIndex(step => step.id === active.id);
      const newIndex = selectedSteps.findIndex(step => step.id === over.id);
      
      const newSteps = [...selectedSteps];
      const [removed] = newSteps.splice(oldIndex, 1);
      newSteps.splice(newIndex, 0, removed);
      
      // Update sequences
      const updatedSteps = newSteps.map((step, index) => ({
        ...step,
        sequence: index + 1
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
      .filter(step => step.id !== stepId)
      .map((step, index) => ({
        ...step,
        sequence: index + 1
      }));
    onStepsChange(updatedSteps);
  };

  const addStep = (step) => {
    if (selectedSteps.some(s => s.id === step.id)) return;
    
    const newStep = {
      ...step,
      sequence: selectedSteps.length + 1
    };
    
    onStepsChange([...selectedSteps, newStep]);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        {/* <h3 className="text-sm font-medium mb-3">Selected Steps</h3> */}
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={selectedSteps.map(step => step.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedSteps.map((step) => (
                <SortableRow
                  key={step.id}
                  item={step}
                  removeItem={removeStep}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableRow
                item={selectedSteps.find(step => step.id === activeId)}
                removeItem={removeStep}
                forceDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div className="w-64 bg-secondary dark:bg-gray-800 dark:border dark:border-gray-500 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3 text-center">Available Steps</h3>
        <div className="space-y-2">
          {availableSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-md"
            >
              <span className="text-sm p-1">{step.title}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => addStep(step)}
                disabled={selectedSteps.some(s => s.id === step.id)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}