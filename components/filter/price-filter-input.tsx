import { Select } from "@headlessui/react";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa6";

export default function PriceFilterInput() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>Price</span>
        <button>Clear</button>
      </div>
      <div className="relative">
        <Select
          className={classNames(
            "border-secondary/50 border-2 p-1",
            "focus:outline-none",
            // Make the text of each option black on Windows
            "*:text-black",
          )}
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="delayed">Delayed</option>
          <option value="canceled">Canceled</option>
        </Select>
        <FaChevronDown
          className="group pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
