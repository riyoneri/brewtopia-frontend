"use client";

import Button from "@/components/button";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CreateCategoryPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  return (
    <>
      <title>Create Category</title>
      <form
        className="mx-auto flex w-full flex-col gap-5 xs:w-3/4 sm:w-full md:w-3/4 lg:w-1/2"
        onSubmit={handleSubmit((data) => data)}
      >
        <TextInputLabel
          title="Name"
          placeholder="Enter name"
          register={register("name")}
          error={errors.name?.message}
        />

        <Button type="submit">Create</Button>
      </form>
    </>
  );
}
