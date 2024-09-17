import classNames from "classnames";
import { CountryDropdown } from "react-country-region-selector";
import { Controller, useFormContext } from "react-hook-form";

import { AllInputsProperties } from "./text-input-label";

type CountrySelectionInputLabelProperties = Pick<AllInputsProperties, "title">;

export default function CountrySelectionInputLabel({
  title,
}: CountrySelectionInputLabelProperties) {
  const {
    formState: { errors },
  } = useFormContext<{ country: string }>();

  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <Controller
        name="country"
        render={({ field }) => (
          <>
            <CountryDropdown
              {...field}
              defaultOptionLabel="Select a country"
              id={title}
              classes={classNames(
                "border-2 hidden sm:block px-2 py-1 scrollbar outline-none",
                {
                  "border-secondary/50": !errors.country,
                  "border-accent-red": errors.country,
                },
              )}
            />
            <CountryDropdown
              {...field}
              id={title}
              defaultOptionLabel="Select a country"
              classes={classNames(
                "border-2 sm:hidden px-2 py-1 scrollbar outline-none",
                {
                  "border-secondary/50": !errors.country,
                  "border-accent-red": errors.country,
                },
              )}
              labelType="short"
            />
          </>
        )}
      />

      {errors.country && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {errors.country.message}
        </p>
      )}
    </label>
  );
}
