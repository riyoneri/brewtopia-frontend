"use client";

import Button from "@/components/button";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import TextAreaInputLabel from "@/components/input-labels/textarea-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
  category: z.string().min(1, "Enter category please"),
  price: z
    .number({ message: "Enter valid number as price please" })
    .min(1, "Minimum price is 1")
    .default(0),
  description: z.string().min(1, "Enter description please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CreateProductPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  return (
    <>
      <title>Create Product</title>
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

          <TextInputLabel
            placeholder="Enter price"
            register={methods.register("price", { valueAsNumber: true })}
            type="number"
            title="Price"
            error={methods.formState.errors.price?.message}
          />

          <SelectInputLabel
            hasHeader
            hasHeaderButton={false}
            title="Category"
            name="category"
            selectOptions={[
              { key: "first", text: "First" },
              { key: "second", text: "Second" },
            ]}
            error={methods.formState.errors.category?.message}
          />

          <TextAreaInputLabel
            title="Description"
            placeholder="Enter description"
            register={methods.register("description")}
            error={methods.formState.errors.description?.message}
          />
          <Button type="submit">Update Product</Button>
        </form>
      </FormProvider>
    </>
  );
}
