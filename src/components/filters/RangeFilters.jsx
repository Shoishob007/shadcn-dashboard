import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RangeFilter = ({
  placeholder,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`bg-white dark:border-gray-500 dark:bg-gray-900 text-[10px] md:text-xs h-7 md:h-9 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="text-[10px] md:text-xs">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-[10px] md:text-xs"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
