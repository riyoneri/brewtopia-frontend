"use client";

import Button from "@/components/button";
import DatePickerInputLabel from "@/components/input-labels/date-picker-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import useAdminCreatePromotion from "@/hooks/admin/use-admin-create-promotion";
import { useAdminGetSingleProduct } from "@/hooks/admin/use-admin-get-single-product";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useQueryState } from "nuqs";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z
  .object({
    name: z.string().min(1, "Enter name please"),
    price: z.number().min(1),
    startDate: z
      .custom<Dayjs>((value) => dayjs.isDayjs(value), {
        message: "Pick valid start date please",
      })
      .refine(
        (value) => value.isAfter(dayjs()),
        "Start date must be in future",
      ),
    endDate: z.custom<Dayjs>((value) => dayjs.isDayjs(value), {
      message: "Pick valid end date please",
    }),
  })
  .refine((data) => data.endDate.isAfter(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type InputsType = z.infer<typeof inputsSchema>;

export default function CreatePromotionPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      startDate: dayjs(),
      endDate: dayjs(),
    },
  });
  const [productId] = useQueryState("p");
  const {
    getSingleProductData,
    getSingleProductError,
    getSingleProductLoading,
  } = useAdminGetSingleProduct(productId || "");

  const {
    createPromotionError,
    createPromotionIsLoading,
    createPromotionMutate,
  } = useAdminCreatePromotion<InputsType>();

  const priceWatcher = methods.watch("price");
  const nameWatcher = methods.watch("name");

  if (!productId || getSingleProductError?.statusCode === 404) notFound();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    createPromotionMutate(
      JSON.stringify({
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      }),
    );
  };

  return (
    <>
      <title>Create Promotion</title>

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <FormProvider {...methods}>
          <form
            className="mx-auto flex w-full flex-col gap-5"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <TextInputLabel
              title="Name"
              placeholder="Enter name"
              register={methods.register("name")}
              error={
                methods.formState.errors.name?.message ||
                createPromotionError?.validationErrors?.name
              }
            />

            <TextInputLabel
              title="New price"
              type="number"
              placeholder="Enter new price"
              register={methods.register("price", { valueAsNumber: true })}
              error={
                methods.formState.errors.price?.message ||
                createPromotionError?.validationErrors?.price
              }
            />

            <DatePickerInputLabel
              register={methods.register("startDate")}
              title="Start date"
              error={
                methods.formState.errors.startDate?.message ||
                createPromotionError?.validationErrors?.startDate
              }
            />

            <DatePickerInputLabel
              register={methods.register("endDate")}
              title="End date"
              error={
                methods.formState.errors.endDate?.message ||
                createPromotionError?.validationErrors?.endDate
              }
            />

            {createPromotionError && (
              <p className="text-center text-sm text-accent-red xs:text-base">
                {createPromotionError.message}
              </p>
            )}

            <Button
              disabled={createPromotionIsLoading}
              className="flex items-center justify-center"
              type="submit"
            >
              {createPromotionIsLoading ? (
                <span className="dui-loading dui-loading-spinner"></span>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </FormProvider>
        <div className="flex h-min w-full max-w-full flex-col gap-2 bg-tertiary p-5 lg:max-w-96">
          {getSingleProductLoading && (
            <div className="mx-auto flex flex-col justify-center self-start">
              <span className="dui-loading dui-loading-spinner mx-auto"></span>
              <p>Getting Product...</p>
            </div>
          )}

          {getSingleProductError && (
            <p className="text-accent-red">{getSingleProductError.message}</p>
          )}

          {getSingleProductData && (
            <>
              <Image
                src={getSingleProductData.imageUrl}
                height={100}
                width={100}
                alt={`${getSingleProductData.name} Image`}
                className="size-20 object-cover lg:mx-auto"
              />

              <p className="text-lg font-medium md:text-xl">
                {getSingleProductData.name}
              </p>
              <div className="flex gap-1">
                {!Number.isNaN(priceWatcher) && priceWatcher > 0 && (
                  <span className="text-base font-medium sm:text-lg">
                    ${priceWatcher}
                  </span>
                )}
                <span
                  className={classNames({
                    "text-xs sm:text-sm line-through": priceWatcher,
                    "text-base sm:text-lg font-medium": !priceWatcher,
                  })}
                >
                  ${getSingleProductData.price}
                </span>
              </div>
              {nameWatcher && (
                <p className="break-all text-primary">{nameWatcher}</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
