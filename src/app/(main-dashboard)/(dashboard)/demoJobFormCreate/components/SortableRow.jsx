import { XIcon } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button.jsx";
import React from "react";

export function SortableRow({ item, removeItem, forceDragging = false }) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? "0.4" : "1",
    lineHeight: "4",
  };

  const draggableStyles = {
    cursor: isDragging || forceDragging ? "grabbing" : "grab",
  };

  return (
    <>
      <article
        className="flex flex-col w-full gap-2 [&:not(:first-child)]:pt-2"
        ref={setNodeRef}
        style={parentStyles}
      >
        <div className="bg-secondary dark:bg-gray-900 w-full rounded-md flex items-center gap-2 overflow-hidden max-w-[450px]">
          <div className="w-fit h-full flex items-center bg-gray-800 dark:bg-gray-300">
            <p className="w-full h-full text-center text-secondary text-sm py-2 px-3">{item.sequence}</p>
          </div>

          <div
            ref={setActivatorNodeRef}
            className="flex-grow"
            style={draggableStyles}
            {...attributes}
            {...listeners}
          >
            <p className="text-xs sm:text-sm">{item.title}</p>
          </div>

          <div className="w-fit h-full flex items-center justify-center">
            <Button
              size="xs sm:sm"
              variant="ghost"
              className="p-1"
              onClick={() => removeItem(item.id)}
            >
              <XIcon className="text-red-500 text-sm h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
