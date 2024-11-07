"use client";

import Button from "@/components/button";
import DeleteModal from "@/components/modals/delete-modal";
import Products from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | undefined>();
  return (
    <>
      <title>Product Details</title>
      {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          closeModal={() => setItemToDelete(undefined)}
          type="product"
        />
      )}
      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <div>
          <Image
            src={Products[2].imageUrl}
            height={500}
            width={500}
            alt={Products[2].imageUrl}
            className="w-1/2 object-cover"
          />
          <div className="mt-4 space-y-3">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:line-clamp-1 md:text-3xl lg:text-4xl">
              {Products[2].name}
            </h2>

            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium sm:text-2xl">
                  ${Products[2].price}
                </span>
                {Products[2].previousPrice && (
                  <span className="line-through">
                    ${Products[2].previousPrice}
                  </span>
                )}
              </div>
              {Products[2].hasDiscountInApp && (
                <>
                  <GoDotFill className="hidden text-xs md:block" />
                  <p className="text-sm text-primary xs:text-base">
                    Get 20% Off in App
                  </p>
                </>
              )}
            </div>

            <div className="mt-5 xs:space-y-3">
              <h4 className="text-lg font-medium">Description:</h4>
              <p className="text-neutral-400">{Products[2].description}</p>
            </div>
          </div>
        </div>
        <div className="flex h-min w-full max-w-full flex-col gap-2 bg-tertiary p-5 text-center lg:max-w-96">
          <Link href={`${pathname}/update`}>
            <Button className="w-full">Update Product</Button>
          </Link>
          <Link href={`/obsidian/promotions/create?p=${Products[0].id}`}>
            <Button className="w-full">Add discount</Button>
          </Link>
          <Button
            onClick={() =>
              setItemToDelete({ id: Products[0].id, name: Products[0].name })
            }
            className="!border-transparent !bg-accent-red hover:!bg-accent-red/80"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
