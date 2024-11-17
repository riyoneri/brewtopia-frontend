"use client";

import Button from "@/components/button";
import DeleteModal from "@/components/modals/delete-modal";
import useAdminDeleteProduct from "@/hooks/admin/use-admin-delete-product";
import { useAdminGetSingleProduct } from "@/hooks/admin/use-admin-get-single-product";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | undefined>();
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();
  const {
    getSingleProductData,
    getSingleProductError,
    getSingleProductLoading,
  } = useAdminGetSingleProduct(productId);

  if (getSingleProductError?.statusCode === 404) notFound();

  const descriptionParagraphs = getSingleProductData?.description
    .split("\n")
    .map((paragraph: string, index) => ({ id: index, text: paragraph }));

  return (
    <>
      <title>Product Details</title>
      {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          closeModal={() => {
            router.replace(".");
            setItemToDelete(undefined);
          }}
          type="product"
          fetchData={useAdminDeleteProduct}
        />
      )}

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        {getSingleProductLoading && (
          <div className="mx-auto flex flex-col justify-center self-start">
            <span className="dui-loading dui-loading-spinner mx-auto"></span>
            <p>Getting Product...</p>
          </div>
        )}

        {getSingleProductError && (
          <p className="text-center text-sm text-accent-red xs:text-base">
            {getSingleProductError.message}
          </p>
        )}

        {getSingleProductData && (
          <>
            <div className="w-full">
              <Image
                src={getSingleProductData.imageUrl}
                height={500}
                width={500}
                alt={`${getSingleProductData.name} Image`}
                className="max-h-72 bg-tertiary object-contain"
              />
              <div className="mt-4 space-y-3">
                <h2 className="text-lg xs:text-xl sm:text-2xl md:line-clamp-1 md:text-3xl lg:text-4xl">
                  {getSingleProductData.name}
                </h2>

                <div className="flex flex-col gap-1 md:flex-row md:items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium sm:text-2xl">
                      ${getSingleProductData.price}
                    </span>
                    {getSingleProductData.previousPrice && (
                      <span className="line-through">
                        ${getSingleProductData.previousPrice}
                      </span>
                    )}
                  </div>
                  {getSingleProductData.hasDiscountInApp && (
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
                  <div className="space-y-3 text-neutral-400">
                    {descriptionParagraphs?.map((paragraph) => (
                      <p key={paragraph.id}>{paragraph.text}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-min w-full max-w-full flex-col gap-2 bg-tertiary p-5 text-center lg:max-w-96">
              <Link href={`${pathname}/update`}>
                <Button className="w-full">Update Product</Button>
              </Link>
              <Link
                href={`/obsidian/promotions/create?p=${getSingleProductData.id}`}
              >
                <Button className="w-full">Add discount</Button>
              </Link>
              <Button
                onClick={() =>
                  setItemToDelete({
                    id: getSingleProductData.id,
                    name: getSingleProductData.name,
                  })
                }
                className="!border-transparent !bg-accent-red hover:!bg-accent-red/80"
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
