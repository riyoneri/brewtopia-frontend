import { AllInputsProperties } from "@/utils/input-properties";
import { parseDateTime } from "@internationalized/date";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCalendarDays } from "react-icons/fa6";

const defaultDateRange = {
  start: parseDateTime(dayjs().format("YYYY-MM-DD")),
  end: parseDateTime(dayjs().format("YYYY-MM-DD")),
};

interface DateRangeInputLabelProperties
  extends Omit<AllInputsProperties, "placeholder"> {}

export default function DateRangeInputLabel({
  title,
  register,
  error,
}: DateRangeInputLabelProperties) {
  const [value, setValue] = useState<RangeValue<DateValue>>(defaultDateRange);

  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <Controller
        name={register.name}
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
            className="rounded-none"
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
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
