import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { Controller } from "react-hook-form";

interface SelectInputLabelProperties {
  name: string;
  selections: { key: string | number; text: string }[];
}

export default function SelectInputLabel({
  name,
  selections,
}: SelectInputLabelProperties) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          className="w-20 outline-none"
          size="sm"
          radius="none"
          variant="bordered"
          classNames={{
            popoverContent: "rounded-none",
            trigger:
              "data-[open]:border-neutral-400 data-[focus]:border-neutral-400",
          }}
        >
          <SelectSection>
            {selections.map((selection) => (
              <SelectItem className="rounded-none" key={selection.key}>
                {selection.text}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      )}
    />
  );
}
