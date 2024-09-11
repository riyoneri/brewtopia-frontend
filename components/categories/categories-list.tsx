import classNames from "classnames";
import { useState } from "react";

import CategoryCard from "./category-card";
import CategoryCardSkeleton from "./category-card-skeleton";

interface CategoriesListProperties {
  categories?: CategoryDto[];
  error?: string;
  loading?: boolean;
}

export default function CategoriesList({
  categories,
  error,
  loading,
}: CategoriesListProperties) {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <div
      className={classNames("relative grid md:grid-cols-3 md:text-center", {
        "md:gap-0 gap-1": !loading,
        "gap-5": loading,
      })}
    >
      {loading && (
        <>
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </>
      )}
      {error && (
        <p className="col-span-full text-center text-red-500">{error}</p>
      )}
      {categories &&
        (categories.length > 0 ? (
          <>
            <>
              <span
                className={classNames(
                  "absolute h-0.5 w-1/3 hidden md:block left-0 bg-secondary top-0 transition-transform",
                  {
                    "translate-x-full": selectedTab === categories?.[1].id,
                    "translate-x-[200%]": selectedTab === categories?.[2].id,
                  },
                )}
              ></span>
              <span
                className={classNames(
                  "absolute h-0.5 w-1/3 hidden md:block left-0 bg-secondary bottom-0 transition-transform",
                  {
                    "translate-x-full": selectedTab === categories?.[1].id,
                    "translate-x-[200%]": selectedTab === categories?.[2].id,
                  },
                )}
              ></span>
            </>

            {categories.map((category) => (
              <CategoryCard
                {...category}
                handleClick={() => setSelectedTab(category.id)}
                key={category.id}
              />
            ))}
          </>
        ) : (
          <p className="col-span-full mt-5 sm:text-center sm:text-xl">
            No Categories available.
          </p>
        ))}
    </div>
  );
}
