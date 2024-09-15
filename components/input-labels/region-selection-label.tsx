import classNames from "classnames";
import { useState } from "react";
import { RegionDropdown } from "react-country-region-selector";

import { AllInputsProperties } from "./text-input-label";

interface RegionSelectionInputLabelProperties
  extends Omit<AllInputsProperties, "register" | "placeholder"> {
  country: string;
  setValue: (_value: string) => void;
}

export default function RegionSelectionInputLabel({
  title,
  error,
  setValue,
  country,
}: RegionSelectionInputLabelProperties) {
  const [region, setRegion] = useState("");

  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <RegionDropdown
        blankOptionLabel="No country selected"
        defaultOptionLabel="Selection a region"
        country={country}
        value={region}
        onChange={(value) => {
          setRegion(value);
          setValue(value);
        }}
        classes={classNames("border-2 px-2 py-1 scrollbar outline-none", {
          "border-secondary/50": !error,
          "border-accent-red": error,
        })}
      />
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
