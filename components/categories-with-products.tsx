"use client";

import CategoriesList from "./categories/categories-list";
import ProductsList from "./products/products-list";

export default function CategoriesWithProducts() {
  return (
    <>
      <CategoriesList loading />

      <ProductsList loading />
    </>
  );
}
