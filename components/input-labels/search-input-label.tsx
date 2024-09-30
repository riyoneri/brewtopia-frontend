import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface SearchInputLabelProperties
  extends Omit<FilterSortInputProperties, "selectOptions">,
    Pick<AllInputsProperties, "register"> {}

export default function SearchInputLabel({
  className,
  name,
  resetInput,
  hasHeader = false,
  title = "Search",
  register,
}: SearchInputLabelProperties) {
  return (
    <div className={classNames(className, "space-y-2 sm:space-y-1")}>
      {hasHeader && (
        <div className="flex items-center justify-between">
          <span className="cursor-default">{title}</span>
          <button onClick={resetInput}>Clear</button>
        </div>
      )}
      <label
        htmlFor={name}
        className="flex items-center gap-2 border-2 border-secondary/50 p-1"
      >
        <HiOutlineMagnifyingGlass />
        <input
          type="text"
          id={name}
          {...register}
          placeholder="Keyword"
          className="flex-1 outline-none"
        />
      </label>
    </div>
  );
}
