import classNames from "classnames";

interface CategoryCardProperties extends CategoryDto {
  handleClick?: () => void;
  isActive?: boolean;
}

export default function CategoryCard({
  name,
  isActive,
  handleClick,
}: CategoryCardProperties) {
  return (
    <span
      className={classNames(
        "md:border-y-2 py-2 font-medium uppercase hover:bg-tertiary cursor-pointer transition md:hover:bg-transparent px-2",
        { "bg-tertiary md:bg-transparent": isActive },
      )}
      onClick={handleClick}
    >
      {name}
    </span>
  );
}
