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

interface Sort {
  id: number;
  property: string;
  text: string;
  direction: number;
}

const sorts: Sort[] = [
  { id: 1, direction: 1, property: "name", text: "Name (A-Z)" },
  { id: 2, direction: -1, property: "name", text: "Name (Z-A)" },
  { id: 3, direction: 1, property: "price", text: "Price: Low to High" },
  { id: 4, direction: -1, property: "price", text: "Price: High to Low" },
  { id: 5, direction: 1, property: "sellCount", text: "Best Seller" },
  { id: 6, direction: 1, property: "createdAt", text: "Newest Arrivals" },
];

const defaultSelection = {
  id: 0,
  direction: 1,
  property: "none",
  text: "Sorts",
};

export default function SortInput() {
  const [selected, setSelected] = useState(defaultSelection);

  const [, setSort] = useQueryState("sort");

  useEffect(() => {
    if (selected.id) setSort(String(selected.id));
    // eslint-disable-next-line unicorn/no-null
    else setSort(null);
  }, [selected.id, setSort]);

  return (
    <div className="space-y-2 sm:space-y-1">
      <div className="flex items-center justify-between">
        <span>Sort By</span>
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
              displayValue={(range: Sort) => range.text}
            />
            <ComboboxButton className="absolute inset-0 flex items-center justify-end">
              <FaChevronDown className="relative right-2 size-4" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom start"
            transition
            className={classNames(
              "border-2 space-y-0.5 bg-white mt-3 min-w-[var(--input-width)]",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
            )}
          >
            {sorts.map((sort) => (
              <ComboboxOption
                key={sort.id}
                value={sort}
                className="group flex cursor-pointer select-none items-center gap-2 px-2 py-1 transition data-[selected]:bg-tertiary hover:bg-tertiary"
              >
                <FaCheck className="size-4 text-neutral-200 group-data-[selected]:text-black" />
                <div className="text-sm/6">{sort.text}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
    </div>
  );
}
