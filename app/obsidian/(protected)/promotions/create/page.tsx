"use client";

import Button from "@/components/button";
import DateRangeInputLabel from "@/components/input-labels/date-range-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CreatePromotionPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  return (
    <>
      <title>Create Promotion</title>

      <FormProvider {...methods}>
        <form
          className="mx-auto flex w-full flex-col gap-5 xs:w-3/4 sm:w-full md:w-3/4 lg:w-1/2"
          onSubmit={methods.handleSubmit((data) => data)}
        >
          <TextInputLabel
            title="Name"
            placeholder="Enter name"
            register={methods.register("name")}
            error={methods.formState.errors.name?.message}
          />

          <DateRangeInputLabel
            register={methods.register("date")}
            title="Date range"
            error=""
          />

          <Button type="submit">Create</Button>
        </form>
      </FormProvider>
    </>
  );
}
