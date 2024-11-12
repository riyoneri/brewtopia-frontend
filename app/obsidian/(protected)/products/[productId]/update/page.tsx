"use client";

import Button from "@/components/button";
import ImageInputLabel from "@/components/input-labels/image-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import TextAreaInputLabel from "@/components/input-labels/textarea-input-label";
import { useAdminGetAllCategories } from "@/hooks/admin/use-admin-get-categories";
import { useAdminGetSingleProduct } from "@/hooks/admin/use-admin-get-single-product";
import useAdminUpdateProduct from "@/hooks/admin/use-admin-update-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectType, notFound, redirect, useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
  category: z.string().min(1, "Enter category please"),
  price: z
    .number({ message: "Enter valid number as price please" })
    .min(1, "Minimum price is 1")
    .default(0),
  description: z.string().min(1, "Enter description please"),
  image: z.union([
    z
      .custom<FileList>()
      .refine((files) => files?.length > 0, "Image is required")
      .refine(
        (fileList) =>
          fileList instanceof FileList &&
          ["image/jpeg", "image/png", "image/jpg"].includes(
            fileList[0]?.type.toLocaleLowerCase(),
          ),
        "Allowed formats are jpeg, png and jpg",
      )
      .refine(
        (fileList) => fileList[0]?.size <= 3_000_000,
        "Image size must be less than 3MBs",
      ),
    z.string().url("Must be a valid URL"),
  ]),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function UpdateProductPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  const { productId } = useParams<{ productId: string }>();
  const {
    getSingleProductData,
    getSingleProductError,
    getSingleProductLoading,
  } = useAdminGetSingleProduct(productId);

  const {
    getAllCategoriesData,
    getAllCategoriesError,
    getAllCategoriesLoading,
  } = useAdminGetAllCategories(undefined, undefined, false);

  const {
    updateProductData,
    updateProductError,
    updateProductIsLoading,
    updateProductMutate,
  } = useAdminUpdateProduct<InputsType>(productId);

  useEffect(() => {
    if (getSingleProductData) {
      methods.setValue("name", getSingleProductData.name);
      methods.setValue("category", getSingleProductData.category);
      methods.setValue("price", getSingleProductData.price);
      methods.setValue("description", getSingleProductData.description);
      methods.setValue("image", getSingleProductData.imageUrl);
    }

    if (updateProductData) {
      enqueueSnackbar("Product was updated", { variant: "success" });
      redirect("..", RedirectType.push);
    }
  }, [getSingleProductData, methods, updateProductData]);

  if (!productId) notFound();

  const options = getAllCategoriesData?.categories.length
    ? getAllCategoriesData?.categories.map((category) => ({
        key: category.id,
        text: category.name,
      }))
    : [{ key: "1", text: "No categories available" }];

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    const formData = new FormData();

    let key: keyof InputsType;

    for (key in data) {
      if (key === "image" && data[key] instanceof FileList)
        formData.append(key, data[key][0]);
      else formData.append(key, data[key].toString());
    }

    updateProductMutate(formData);
  };

  return (
    <>
      <title>Update Product</title>

      {getSingleProductLoading && (
        <div className="flex flex-col items-center">
          <span className="dui-loading dui-loading-spinner mx-auto"></span>
          <p>Getting product...</p>
        </div>
      )}

      {getSingleProductError && (
        <p className="text-center text-sm text-accent-red xs:text-base">
          {getSingleProductError.message}
        </p>
      )}

      {getSingleProductData && (
        <FormProvider {...methods}>
          <form
            className="mx-auto flex w-full flex-col gap-5 xs:w-3/4 sm:w-full md:w-3/4 lg:w-1/2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <TextInputLabel
              title="Name"
              placeholder="Enter name"
              register={methods.register("name")}
              error={
                methods.formState.errors.name?.message ||
                updateProductError?.validationErrors?.name
              }
            />

            <TextInputLabel
              placeholder="Enter price"
              register={methods.register("price", { valueAsNumber: true })}
              type="number"
              title="Price"
              error={
                methods.formState.errors.price?.message ||
                updateProductError?.validationErrors?.price
              }
            />

            {getAllCategoriesLoading && <p>Loading categories...</p>}

            {getAllCategoriesError && (
              <p className="text-accent-red">{getAllCategoriesError.message}</p>
            )}

            {getAllCategoriesData && (
              <SelectInputLabel
                hasHeader
                hasHeaderButton={false}
                defaultKey={getSingleProductData?.category}
                title="Category"
                name="category"
                firstOptionDisabled={options.length > 0}
                selectOptions={options}
                error={
                  methods.formState.errors.category?.message ||
                  updateProductError?.validationErrors?.category
                }
              />
            )}

            <TextAreaInputLabel
              title="Description"
              placeholder="Enter description"
              register={methods.register("description")}
              error={
                methods.formState.errors.description?.message ||
                updateProductError?.validationErrors?.description
              }
            />

            <ImageInputLabel
              title="Image"
              register={methods.register("image")}
              placeholder="Enter image"
              error={
                methods.formState.errors.image?.message ||
                updateProductError?.validationErrors?.image
              }
            />

            {updateProductError?.message && (
              <p className="text-center text-sm text-accent-red xs:text-base">
                {updateProductError.message}
              </p>
            )}

            <Button
              disabled={updateProductIsLoading}
              className="flex items-center justify-center"
              type="submit"
            >
              {updateProductIsLoading ? (
                <span className="dui-loading dui-loading-spinner"></span>
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </FormProvider>
      )}
    </>
  );
}
