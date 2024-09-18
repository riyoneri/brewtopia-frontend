"use client";

import Button from "@/components/button";
import CountrySelectionInputLabel from "@/components/input-labels/country-selection-label";
import PhoneInputLabel from "@/components/input-labels/phone-input-label";
import RegionSelectionInputLabel from "@/components/input-labels/region-selection-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { z } from "zod";

const inputsSchema = z.object({
  name: z.string().min(1, "Enter your name please"),
  email: z.string().email("Enter valid email"),
  country: z.string().min(1, "Enter country please").default(""),
  region: z.string().min(1, "Enter region please").default(""),
  postalCode: z.string().min(1, "Enter postal code please"),
  address: z.string().min(1, "Enter address please"),
  phoneNumber: z.string().min(1, "Enter phone number please").default(""),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CheckoutInfoPage() {
  const router = useRouter();
  const methods = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const onSubmit = (_data: InputsType) => {
    router.replace("/checkout/payment");
  };

  return (
    <>
      <title>Checkout Data</title>
      <div className="space-y-5">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-5 sm:gap-8"
          >
            <div className="grid gap-3 sm:gap-5">
              <h5 className="text-xl font-medium sm:text-3xl">Customer Data</h5>
              <TextInputLabel
                title="Name"
                placeholder="Enter name"
                register={methods.register("name")}
                error={methods.formState.errors.name?.message}
              />
              <TextInputLabel
                title="Email"
                placeholder="Enter email"
                register={methods.register("email")}
                error={methods.formState.errors.email?.message}
              />
            </div>
            <div className="grid gap-3 sm:gap-5">
              <h5 className="text-xl font-medium sm:text-3xl">
                Shipping address
              </h5>
              <div className="flex flex-col flex-wrap gap-5 *:flex-1 sm:flex-row sm:items-start">
                <CountrySelectionInputLabel title="Country" />
                <RegionSelectionInputLabel title="Region" />
                <TextInputLabel
                  placeholder="Enter postal code"
                  register={methods.register("postalCode")}
                  title="Postal code"
                  error={methods.formState.errors.postalCode?.message}
                />
              </div>
              <TextInputLabel
                title="Address"
                placeholder="Enter address"
                register={methods.register("address")}
                error={methods.formState.errors.address?.message}
              />

              <PhoneInputLabel title="Phone number" />
            </div>

            <div className="mt-5 flex flex-col-reverse gap-5 xs:flex-row">
              <Link href="/menu" className="grid">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <FaArrowLeft />
                  Back to Shop
                </Button>
              </Link>
              <Button type="submit">Proceed to Shipping</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
