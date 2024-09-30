import { parseDate } from "@internationalized/date";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCalendarDays } from "react-icons/fa6";

import Button from "../button";

interface DatePickerInputProperties
  extends Omit<FilterSortInputProperties, "selectOptions"> {}

const defaultDateRange = {
  start: parseDate(dayjs().format("YYYY-MM-DD")),
  end: parseDate(dayjs().format("YYYY-MM-DD")),
};

export default function DatePickerInput({
  name,
  className,
  resetInput,
}: DatePickerInputProperties) {
  const [value, setValue] = useState<RangeValue<DateValue>>(defaultDateRange);

  return (
    <div
      className={classNames(
        className,
        "flex md:items-start md:flex-row flex-col gap-5",
      )}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DateRangePicker
            aria-label="Pick date range"
            radius="none"
            variant="bordered"
            {...field}
            value={value}
            onChange={(range) => {
              setValue(range);
              field.onChange({
                start: range.start.toString(),
                end: range.end.toString(),
              });
            }}
            selectorIcon={<FaCalendarDays />}
            className="flex-1 rounded-none xl:max-w-xs"
            classNames={{
              inputWrapper:
                "border-2 hover:border-neutral-400 data-[focus]:border-neutral-400 data-[active]:border-neutral-400 border-neutral-400 h-full px-2 py-1 min-h-max",
              calendar: "rounded-none",
              base: "p-0",
              segment:
                "group-data-[invalid]:active:bg-orange-500/30 rounded-none group-data-[invalid]:focus:bg-orange-500/30",
            }}
          />
        )}
      />

      <Button
        className="whitespace-nowrap"
        disabled={value.start.compare(value.end) === 0}
        onClick={() => {
          setValue(defaultDateRange);
          resetInput && resetInput();
        }}
      >
        Clear Date
      </Button>
    </div>
  );
}
