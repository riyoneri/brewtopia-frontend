import { Select } from "@headlessui/react";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa6";

interface SelectInputLabelProperties {
  name: string;
  selections: { key: string | number; text: string }[];
}

export default function SelectInputLabel({ name }: SelectInputLabelProperties) {
  return (
    <label
      htmlFor={name}
      className="group flex w-14 items-center gap-1 border-2 px-2 py-1 text-black"
    >
      <Select
        className={classNames(
          "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          // Make the text of each option black on Windows
          "*:text-black",
        )}
      >
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </Select>
      <FaChevronDown
        className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
        aria-hidden="true"
      />
      {/* <FaChevronDown className="group-data-[focus]:rotate-180" aria-hidden="true" />
      <Controller
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            className={classNames(
              "appearance-none text-right w-full border-none focus:outline-none *:text-black",
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
      /> */}
    </label>
  );
}
