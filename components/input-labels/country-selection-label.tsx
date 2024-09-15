import classNames from "classnames";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

import { AllInputsProperties } from "./text-input-label";

interface CountrySelectionInputLabelProperties
  extends Omit<AllInputsProperties, "register" | "placeholder"> {
  setValue: (_value: string) => void;
}

export default function CountrySelectionInputLabel({
  title,
  error,
  setValue,
}: CountrySelectionInputLabelProperties) {
  const [country, setCountry] = useState("");

  return (
    <label
      htmlFor={title}
      className="grid gap-1 overflow-scroll sm:overflow-visible"
    >
      <p>{title}</p>
      <CountryDropdown
        defaultOptionLabel="Select a country"
        value={country}
        onChange={(value) => {
          setCountry(value);
          setValue(value);
        }}
        classes={classNames(
          "border-2 hidden sm:block px-2 py-1 scrollbar outline-none",
          {
            "border-secondary/50": !error,
            "border-accent-red": error,
          },
        )}
      />
      <CountryDropdown
        defaultOptionLabel="Select a country"
        value={country}
        onChange={(value) => {
          setCountry(value);
          setValue(value);
        }}
        classes={classNames(
          "border-2 sm:hidden px-2 py-1 scrollbar outline-none",
          {
            "border-secondary/50": !error,
            "border-accent-red": error,
          },
        )}
        labelType="short"
      />

      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
