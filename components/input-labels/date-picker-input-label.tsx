import { AllInputsProperties } from "@/utils/input-properties";
import { parseDateTime } from "@internationalized/date";
import { DatePicker, DateValue } from "@nextui-org/react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCalendarDays } from "react-icons/fa6";

const defaultValue = parseDateTime(dayjs().format("YYYY-MM-DD"));

interface DatePickerInputLabelProperties
  extends Omit<AllInputsProperties, "placeholder"> {}

export default function DatePickerInputLabel({
  title,
  register,
  error,
}: DatePickerInputLabelProperties) {
  const [value, setValue] = useState<DateValue>(defaultValue);

  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <Controller
        defaultValue={dayjs()}
        name={register.name}
        render={({ field }) => (
          <DatePicker
            aria-label="Pick date"
            radius="none"
            isInvalid={!!error}
            variant="bordered"
            {...field}
            value={value}
            showMonthAndYearPickers
            onChange={(value) => {
              setValue(value);
              field.onChange(dayjs(value.toString()));
            }}
            selectorIcon={<FaCalendarDays />}
            dateInputClassNames={{
              inputWrapper: classNames(
                "border-2 px-2 py-1",
                {
                  "hover:border-neutral-400 focus-within:!border-neutral-400 data-[focus]:border-neutral-400 data-[active]:border-neutral-400 border-neutral-400":
                    !error,
                },
                {
                  "hover:border-accent-red focus-within:!border-accent-red data-[focus]:border-accent-red data-[active]:border-accent-red border-accent-red":
                    error,
                },
              ),
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
