"use client";

import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import classNames from "classnames";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa6";

interface SelectInputLabelProperties extends FilterSortInputProperties {
  firstOptionDisabled?: boolean;
}

export default function SelectInputLabel({
  title,
  name,
  hasHeader = false,
  selectOptions,
  className,
  firstOptionDisabled = true,
  hasHeaderButton = true,
  resetInput,
  error,
}: SelectInputLabelProperties) {
  const defaultOptionKey = selectOptions[0].key;
  const [value, setValue] = useState(defaultOptionKey);

  return (
    <label
      htmlFor={name}
      className={classNames(className, "space-y-2 sm:space-y-1 min-w-40")}
    >
      {hasHeader && (
        <div className="flex items-center justify-between">
          <span>{title}</span>
          {hasHeaderButton && (
            <button
              onClick={() => {
                setValue(defaultOptionKey);
                resetInput && resetInput();
              }}
            >
              Clear
            </button>
          )}
        </div>
      )}

      <Controller
        name={name}
        defaultValue={defaultOptionKey}
        render={({ field: { onChange, ...otherFieldProperties } }) => (
          <Select
            {...otherFieldProperties}
            aria-label="Select an number of orders"
            className="min-w-max"
            radius="none"
            variant="bordered"
            disabledKeys={[firstOptionDisabled ? "" : defaultOptionKey]}
            selectedKeys={[value]}
            value={value}
            disallowEmptySelection
            classNames={{
              popoverContent: "rounded-none border-2 mt-3 border-neutral-300",
              trigger: classNames(
                "data-[open]:border-neutral-400 border-2 px-2 py-1 h-full min-h-max",
                {
                  "border-neutral-400 data-[focus]:border-neutral-400": !error,
                  "border-accent-red data-[focus]:border-accent-red": error,
                },
              ),
              selectorIcon: "relative size-10 end-0",
              value: "text-sm sm:text-base leading-[1.33]",
            }}
            onChange={(event) => {
              onChange(event);
              setValue(event.target.value);
            }}
            selectorIcon={<FaChevronDown />}
          >
            <SelectSection>
              {selectOptions.map((selectOption) => (
                <SelectItem className="rounded-none" key={selectOption.key}>
                  {selectOption.text}
                </SelectItem>
              ))}
            </SelectSection>
          </Select>
        )}
      />
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
