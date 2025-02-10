// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function Combobox({
//   options,
//   value,
//   onChange,
//   placeholder = "Select option...",
//   emptyText = "No results found.",
//   multiple = false,
//   className,
// }) {
//   const [open, setOpen] = React.useState(false);

//   const selected = multiple
//     ? options.filter((option) => value?.includes(option.id))
//     : options.find((option) => option.id === value);

//   const handleSelect = (currentValue) => {
//     const selectedOption = options.find((option) => option.id === currentValue);
//     if (!selectedOption) return;

//     if (multiple) {
//       const newValue = value?.includes(currentValue)
//         ? value.filter((v) => v !== currentValue)
//         : [...(value || []), currentValue];
//       onChange(newValue);
//     } else {
//       onChange(currentValue === value ? null : currentValue);
//       setOpen(false);
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className={cn("w-full justify-between", className)}
//         >
//           {multiple ? (
//             <span className="truncate">
//               {selected?.length ? `${selected.length} selected` : placeholder}
//             </span>
//           ) : (
//             <span className="truncate">{selected?.title || placeholder}</span>
//           )}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput
//             placeholder={`Search ${placeholder.toLowerCase()}...`}
//           />
//           <CommandEmpty>{emptyText}</CommandEmpty>
//           <CommandGroup>
//             {options.map((option) => (
//               <CommandItem
//                 key={option.id}
//                 value={option.title}
//                 onSelect={() => handleSelect(option.id)}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     (
//                       multiple
//                         ? value?.includes(option.id)
//                         : value === option.id
//                     )
//                       ? "opacity-100"
//                       : "opacity-0"
//                   )}
//                 />
//                 {option.title}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
