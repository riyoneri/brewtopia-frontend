"use client";

import Button from "@/components/button";
import ImageInputLabel from "@/components/input-labels/image-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import TextAreaInputLabel from "@/components/input-labels/textarea-input-label";
import useAdminCreateProduct from "@/hooks/admin/use-admin-create-product";
import { useGetAllCategories } from "@/hooks/admin/use-admin-get-categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectType, redirect } from "next/navigation";
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
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Image is required")
    .refine(
      (fileList) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(
          fileList[0]?.type.toLocaleLowerCase(),
        ),
      "Allowed formats are jpeg, png and jpg",
    )
    .refine(
      (fileList) => fileList[0]?.size <= 3_000_000,
      "Image size must be less than 3MBs",
    ),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CreateProductPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });
  const {
    createProductData,
    createProductError,
    createProductIsLoading,
    createProductMutate,
  } = useAdminCreateProduct<InputsType>();
  const {
    getAllCategoriesData,
    getAllCategoriesError,
    getAllCategoriesLoading,
  } = useGetAllCategories(undefined, undefined, false);

  useEffect(() => {
    if (createProductData) {
      enqueueSnackbar("New product was created", { variant: "success" });
      redirect(".", RedirectType.push);
    }
  }, [createProductData]);

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
      if (key === "image") formData.append(key, data[key][0]);
      else formData.append(key, data[key].toString());
    }

    createProductMutate(formData);
  };

  return (
    <>
      <title>Create Product</title>
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
              createProductError?.validationErrors?.name
            }
          />

          <TextInputLabel
            placeholder="Enter price"
            register={methods.register("price", { valueAsNumber: true })}
            type="number"
            title="Price"
            error={
              methods.formState.errors.price?.message ||
              createProductError?.validationErrors?.price
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
              title="Category"
              name="category"
              firstOptionDisabled={options.length > 0}
              selectOptions={options}
              error={
                methods.formState.errors.category?.message ||
                createProductError?.validationErrors?.category
              }
            />
          )}

          <TextAreaInputLabel
            title="Description"
            placeholder="Enter description"
            register={methods.register("description")}
            error={
              methods.formState.errors.description?.message ||
              createProductError?.validationErrors?.description
            }
          />

          <ImageInputLabel
            title="Image"
            register={methods.register("image")}
            placeholder="Enter image"
            error={
              methods.formState.errors.image?.message ||
              createProductError?.validationErrors?.image
            }
          />

          {createProductError?.message && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {createProductError.message}
            </p>
          )}

          <Button
            disabled={createProductIsLoading}
            className="flex items-center justify-center"
            type="submit"
          >
            {createProductIsLoading ? (
              <span className="dui-loading dui-loading-spinner"></span>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
