import { Select } from "@headlessui/react";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa6";

interface SelectInputLabelProperties {
  name: string;
  selections: { key: string | number; text: string }[];
}

export default function SelectInputLabel({
  name,
  selections,
}: SelectInputLabelProperties) {
  return (
    <label
      htmlFor={name}
      className="flex items-center gap-1 border-2 px-2 py-1 text-black"
    >
      <FaChevronDown aria-hidden="true" />
      <Controller
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            className={classNames(
              "appearance-none text-right border-none focus:outline-none *:text-black",
            )}
            id={name}
          >
            {selections.map((selection) => (
              <option key={selection.key} value={selection.key}>
                {selection.text}
              </option>
            ))}
          </Select>
        )}
      />
    </label>
  );
}
