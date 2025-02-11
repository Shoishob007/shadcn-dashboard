"use client";

import React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
  emptyText = "No options found.",
  multiple = false,
  isEditing = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const safeValue = React.useMemo(() => {
    if (value === null || value === undefined) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];
    return [];
  }, [value]);

  // options is always an array and has required properties
  const safeOptions = React.useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.filter(
      (opt) =>
        opt && typeof opt === "object" && "value" in opt && "label" in opt
    );
  }, [options]);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return safeOptions.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [safeOptions, searchQuery]);

  // Get selected items for display
  const selectedItems = React.useMemo(() => {
    return safeValue
      .map((val) => safeOptions.find((opt) => opt.value === val))
      .filter(Boolean);
  }, [safeValue, safeOptions]);

  const getSelectedText = React.useCallback(() => {
    if (!multiple) {
      const selectedOption = selectedItems[0];
      return selectedOption ? selectedOption.label : placeholder;
    }
    return selectedItems.length === 0
      ? placeholder
      : `${selectedItems.length} selected`;
  }, [multiple, selectedItems, placeholder]);

  if (!isEditing) {
    return (
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <Badge key={item.value} variant="secondary">
            {item.label}
          </Badge>
        ))}
        {selectedItems.length === 0 && (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </div>
    );
  }

  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValue = safeValue.includes(optionValue)
        ? safeValue.filter((v) => v !== optionValue)
        : [...safeValue, optionValue];
      onChange(newValue);
    } else {
      onChange(safeValue[0] === optionValue ? "" : optionValue);
      setOpen(false);
    }
  };

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
      <PopoverContent className="w-full p-2">
        <div className="flex items-center border rounded-md mb-2">
          <Search className="h-4 w-4 ml-2 text-gray-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus:ring-0"
          />
        </div>
        <div className="max-h-60 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="py-2 px-2 text-sm text-gray-500">{emptyText}</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  flex items-center w-full px-2 py-2 text-sm rounded-md
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  ${
                    safeValue.includes(option.value)
                      ? "bg-gray-100 dark:bg-gray-800"
                      : ""
                  }
                `}
              >
                <Check
                  className={`
                    mr-2 h-4 w-4
                    ${
                      safeValue.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  `}
                />
                {option.label}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
