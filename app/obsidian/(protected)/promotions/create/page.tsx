"use client";

import Button from "@/components/button";
import DatePickerInputLabel from "@/components/input-labels/date-picker-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import Products from "@/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z
  .object({
    name: z.string().min(1, "Enter name please"),
    newPrice: z.number().min(1),
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
  const priceWatcher = methods.watch("newPrice");
  const nameWatcher = methods.watch("name");

  return (
    <>
      <title>Create Promotion</title>

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <FormProvider {...methods}>
          <form
            className="mx-auto flex w-full flex-col gap-5"
            onSubmit={methods.handleSubmit((data) => data)}
          >
            <TextInputLabel
              title="Name"
              placeholder="Enter name"
              register={methods.register("name")}
              error={methods.formState.errors.name?.message}
            />

            <TextInputLabel
              title="New price"
              placeholder="Enter new price"
              register={methods.register("newPrice", { valueAsNumber: true })}
              error={methods.formState.errors.newPrice?.message}
            />

            <DatePickerInputLabel
              register={methods.register("startDate")}
              title="Start date"
              error={methods.formState.errors.startDate?.message}
            />

            <DatePickerInputLabel
              register={methods.register("endDate")}
              title="End date"
              error={methods.formState.errors.endDate?.message}
            />

            <Button type="submit">Create</Button>
          </form>
        </FormProvider>
        <div className="flex h-min w-full max-w-full flex-col gap-2 bg-tertiary p-5 lg:max-w-96">
          <Image
            src={Products[0].imageUrl}
            height={100}
            width={100}
            alt={`${Products[0].name} Image`}
            className="size-20 object-cover lg:mx-auto"
          />

          <p className="text-lg font-medium md:text-xl">{Products[0].name}</p>
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
              ${Products[0].price}
            </span>
          </div>
          {nameWatcher && (
            <p className="break-all text-primary">{nameWatcher}</p>
          )}
        </div>
      </div>
    </>
  );
}
