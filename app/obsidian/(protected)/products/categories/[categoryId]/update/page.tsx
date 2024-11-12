"use client";

import Button from "@/components/button";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { useAdminGetSingleCategory } from "@/hooks/admin/use-admin-get-single-category";
import useAdminUpdateCategory from "@/hooks/admin/use-admin-update-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectType, notFound, redirect, useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function UpdateCategoryPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  const { categoryId } = useParams<{ categoryId: string }>();
  const {
    getSingleCategoryData,
    getSingleCategoryError,
    getSingleCategoryLoading,
  } = useAdminGetSingleCategory(categoryId);

  const {
    updateCategoryData,
    updateCategoryError,
    updateCategoryIsLoading,
    updateCategoryMutate,
  } = useAdminUpdateCategory<InputsType>(categoryId);

  useEffect(() => {
    getSingleCategoryData && setValue("name", getSingleCategoryData.name);

    if (updateCategoryData) {
      enqueueSnackbar("Category was updated", { variant: "success" });
      redirect("..", RedirectType.replace);
    }
  }, [getSingleCategoryData, setValue, updateCategoryData]);

  if (!categoryId) notFound();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    updateCategoryMutate(JSON.stringify(data));
  };

  return (
    <>
      <title>Update Category</title>
      {getSingleCategoryLoading && (
        <div className="flex flex-col items-center">
          <span className="dui-loading dui-loading-spinner mx-auto"></span>
          <p>Getting category...</p>
        </div>
      )}

      {getSingleCategoryError && (
        <p className="text-center text-sm text-accent-red xs:text-base">
          {getSingleCategoryError.message}
        </p>
      )}

      {getSingleCategoryData && (
        <form
          className="mx-auto flex w-full flex-col gap-5 xs:w-3/4 sm:w-full md:w-3/4 lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputLabel
            title="Name"
            placeholder="Enter name"
            register={register("name")}
            error={
              errors.name?.message ||
              updateCategoryError?.validationErrors?.name
            }
          />

          {updateCategoryError?.message && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {updateCategoryError.message}
            </p>
          )}

          <Button
            disabled={updateCategoryIsLoading}
            className="flex items-center justify-center"
            type="submit"
          >
            {updateCategoryIsLoading ? (
              <span className="dui-loading dui-loading-spinner"></span>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      )}
    </>
  );
}
