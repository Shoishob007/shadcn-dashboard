"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyText = "No options found.",
  multiple = false,
}) {
  const [open, setOpen] = React.useState(false);
  const safeValue = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const getSelectedText = React.useCallback(() => {
    if (!multiple) {
      const selectedOption = options.find(
        (option) => option.value === safeValue[0]
      );
      return selectedOption ? selectedOption.label : placeholder;
    }
    return safeValue.length === 0
      ? placeholder
      : `${safeValue.length} selected`;
  }, [multiple, options, placeholder, safeValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getSelectedText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup>
            {(options || []).map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  if (multiple) {
                    const newValue = safeValue.includes(option.value)
                      ? safeValue.filter((v) => v !== option.value)
                      : [...safeValue, option.value];
                    onChange(newValue);
                  } else {
                    onChange(safeValue[0] === option.value ? "" : option.value);
                    setOpen(false);
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    multiple
                      ? safeValue.includes(option.value)
                      : safeValue[0] === option.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
