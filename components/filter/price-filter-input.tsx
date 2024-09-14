"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import classNames from "classnames";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

interface Range {
  id: number;
  text: string;
  min: number;
  max: number;
}

const ranges = [
  { id: 1, text: "$1 - $10", min: 1, max: 10 },
  { id: 2, text: "$10 - $20", min: 10, max: 20 },
  { id: 4, text: "$20 - $30", min: 20, max: 30 },
  { id: 5, text: "$30 - $40", min: 30, max: 40 },
  { id: 6, text: "$40 - $50", min: 40, max: 50 },
];

const defaultSelection = {
  id: 0,
  text: "Price range",
  min: 0,
  max: 0,
};

export default function PriceFilterInput() {
  const [selected, setSelected] = useState(defaultSelection);
  const [, setPrice] = useQueryState("price");

  useEffect(() => {
    if (selected.id) setPrice(String(selected.id));
    // eslint-disable-next-line unicorn/no-null
    else setPrice(null);
  }, [selected.id, setPrice]);

  return (
    <div className="space-y-2 sm:space-y-1">
      <div className="flex items-center justify-between">
        <span>Price</span>
        <button onClick={() => setSelected(defaultSelection)}>Clear</button>
      </div>
      <div className="relative">
        <Combobox
          value={selected}
          onChange={(value) => value && setSelected(value)}
        >
          <div className="relative">
            <ComboboxInput
              className={classNames(
                "w-full border-2 border-secondary/50  p-1 outline-none",
              )}
              readOnly
              displayValue={(range: Range) => range.text}
            />
            <ComboboxButton className="absolute inset-0 flex items-center justify-end">
              <FaChevronDown className="relative right-2 size-4" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom start"
            transition
            className={classNames(
              "border-2 bg-white space-y-0.5 mt-3 min-w-[var(--input-width)]",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
            )}
          >
            {ranges.map((range) => (
              <ComboboxOption
                key={range.id}
                value={range}
                className="group flex cursor-pointer select-none items-center gap-2 px-2 py-1 transition data-[selected]:bg-tertiary hover:bg-tertiary"
              >
                <FaCheck className="size-4 text-neutral-200 group-data-[selected]:text-black" />
                <div className="text-sm/6">{range.text}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
    </div>
  );
}
