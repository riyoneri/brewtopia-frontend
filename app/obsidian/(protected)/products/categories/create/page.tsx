"use client";

import Button from "@/components/button";
import TextInputLabel from "@/components/input-labels/text-input-label";
import useAdminCreateCategory from "@/hooks/admin/use-admin-create-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectType, redirect } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CreateCategoryPage() {
  const {
    createCategoryData,
    createCategoryError,
    createCategoryIsLoading,
    createCategoryMutate,
  } = useAdminCreateCategory<InputsType>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  useEffect(() => {
    if (createCategoryData) {
      enqueueSnackbar("New category was created", { variant: "success" });
      redirect("./", RedirectType.push);
    }
  }, [createCategoryData]);

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    createCategoryMutate(JSON.stringify(data));
  };

  return (
    <>
      <title>Create Category</title>
      <form
        className="mx-auto flex w-full flex-col gap-5 xs:w-3/4 sm:w-full md:w-3/4 lg:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInputLabel
          title="Name"
          placeholder="Enter name"
          register={register("name")}
          error={
            errors.name?.message || createCategoryError?.validationErrors?.name
          }
        />

        {createCategoryError?.message && (
          <p className="text-center text-sm text-accent-red xs:text-base">
            {createCategoryError.message}
          </p>
        )}

        <Button
          disabled={createCategoryIsLoading}
          className="flex items-center justify-center"
          type="submit"
        >
          {createCategoryIsLoading ? (
            <span className="dui-loading dui-loading-spinner"></span>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </>
  );
}
