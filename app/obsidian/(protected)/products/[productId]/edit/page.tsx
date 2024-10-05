"use client";

import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter name please"),
  category: z.string().min(1, "Enter category please"),
  price: z.number().min(1),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function EditProductPage() {
  const methods = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  // const onSubmit: SubmitHandler<InputsType> = data => data

  return (
    <>
      <title>Edit Product</title>
      <form>
        <TextInputLabel
          title="Name"
          placeholder="Enter product name"
          register={methods.register("name")}
        />
      </form>
    </>
  );
}
