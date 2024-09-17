import classNames from "classnames";
import { RegionDropdown } from "react-country-region-selector";
import { Controller, useFormContext } from "react-hook-form";

import { AllInputsProperties } from "./text-input-label";

type RegionSelectionInputLabelProperties = Pick<AllInputsProperties, "title">;

export default function RegionSelectionInputLabel({
  title,
}: RegionSelectionInputLabelProperties) {
  const {
    formState: { errors },
    watch,
  } = useFormContext<{ region: string; country: string }>();

  const country = watch("country");

  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <Controller
        name="region"
        render={({ field }) => (
          <RegionDropdown
            {...field}
            blankOptionLabel="No country selected"
            defaultOptionLabel="Selection a region"
            country={country}
            classes={classNames("border-2 px-2 py-1 scrollbar outline-none", {
              "border-secondary/50": !errors.region,
              "border-accent-red": errors.region,
            })}
            id={title}
          />
        )}
      />

      {errors.region && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {errors.region.message}
        </p>
      )}
    </label>
  );
}
