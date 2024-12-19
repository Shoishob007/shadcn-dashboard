import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" size="sm" className="bg-gray-200 max-w-sm">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" className="">
        Applied
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Shortlisted
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        Rejected
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
