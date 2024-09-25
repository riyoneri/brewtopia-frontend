import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import classNames from "classnames";
import { Controller } from "react-hook-form";

interface SelectInputLabelProperties {
  name: string;
  selections: { key: string | number; text: string }[];
  className?: string;
}

export default function SelectInputLabel({
  name,
  selections,
  className,
}: SelectInputLabelProperties) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          aria-label="Select an number of orders"
          className={classNames(className, "outline-none")}
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
