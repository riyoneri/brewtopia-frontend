import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";
import Image from "next/image";
import { useWatch } from "react-hook-form";
import { FaImage } from "react-icons/fa6";

interface ImageInputLabelProperties extends AllInputsProperties {}

export default function ImageInputLabel({
  title,
  register,
  placeholder,
  error,
}: ImageInputLabelProperties) {
  const imageValue = useWatch({ name: register.name });

  const imageSource =
    imageValue instanceof FileList
      ? URL.createObjectURL(imageValue?.[0])
      : imageValue;

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      {imageValue ? (
        <Image
          draggable="false"
          src={imageSource}
          width={100}
          height={100}
          alt={`${title}`}
          className={classNames("size-24 object-cover border-2", {
            "border-secondary/50": !error,
            "border-accent-red": error,
          })}
        />
      ) : (
        <span className="grid size-24 min-w-24 place-content-center bg-tertiary">
          <FaImage className="" />
        </span>
      )}

      <label htmlFor={title} className="grid w-full flex-1 gap-1">
        <p>{title}</p>
        <input
          type="file"
          className={classNames(
            "border-2 min-w-1 file:px-2 file:py-1 file:bg-primary hover:file:bg-primary/80 file:transition file:border-none file:text-white outline-none",
            {
              "border-secondary/50": !error,
              "border-accent-red": error,
            },
          )}
          placeholder={placeholder}
          {...register}
          id={title}
        />
        {error && (
          <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
            {error}
          </p>
        )}
      </label>
    </div>
  );
}
