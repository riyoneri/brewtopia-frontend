"use client";

import Button from "@/components/button";
import PhoneInputLabel from "@/components/input-labels/phone-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { z } from "zod";

const inputsSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Enter card number please")
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .default(""),
  name: z.string().min(1, "Enter holder name").default(""),
  expirationDate: z
    .string()
    .min(1, "Enter expiration date please")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .default(""),
  cardCVV: z
    .string()
    .min(1, "Enter CVV please")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .default(""),
  phoneNumber: z.string().min(1, "Enther phone number please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  const submitHandler: SubmitHandler<InputsType> = (_data) => {
    router.replace("/checkout/done");
  };

  const [selected, setSelected] = useState<"card" | "mtn" | "none">("none");
  return (
    <>
      <title>Payment</title>
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium sm:w-1/6">Contact:</span>
            <span>lion@email.com</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium sm:w-1/6">Ship to:</span>
            <span>Kellett Ave, Sydney, New South Wales 2011 Australia</span>
          </div>
        </div>
        <hr className="border-2" />
        <h3 className="text-2xl font-medium">Payment method</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <RadioGroup
              value={selected}
              onChange={setSelected}
              aria-label="Server size"
              className="divide-y-2"
            >
              <Radio value="card" as="div" className="">
                {({ checked }) => (
                  <>
                    <Disclosure as="div" className="flex flex-col">
                      <DisclosureButton className="flex items-center gap-3 px-4 py-3">
                        <input
                          type="radio"
                          className="dui-radio dui-radio-sm sm:dui-radio-md"
                          checked={checked}
                          readOnly
                        />
                        Credit or debit card
                      </DisclosureButton>
                      <div className="relative overflow-hidden">
                        <DisclosurePanel
                          transition
                          as="div"
                          className="flex flex-col flex-wrap gap-3 px-4 pb-3 transition duration-100 ease-out *:flex-1 data-[closed]:-translate-y-6 data-[closed]:opacity-0 sm:flex-row sm:items-start sm:gap-5"
                        >
                          {({ close }) => {
                            if (!checked) {
                              close();
                            }

                            return (
                              <>
                                <TextInputLabel
                                  title="Card number"
                                  register={methods.register("cardNumber")}
                                  placeholder="Enter number"
                                  error={
                                    methods.formState.errors.cardNumber?.message
                                  }
                                />
                                <TextInputLabel
                                  title="Name"
                                  register={methods.register("name")}
                                  placeholder="Enter name on card"
                                  error={methods.formState.errors.name?.message}
                                />

                                <TextInputLabel
                                  title="Expiration date"
                                  register={methods.register("expirationDate")}
                                  placeholder="MM/YY"
                                  error={
                                    methods.formState.errors.expirationDate
                                      ?.message
                                  }
                                />
                                <TextInputLabel
                                  title="CVV"
                                  register={methods.register("cardCVV")}
                                  placeholder="Enter card CVV"
                                  error={
                                    methods.formState.errors.cardCVV?.message
                                  }
                                />
                              </>
                            );
                          }}
                        </DisclosurePanel>
                      </div>
                    </Disclosure>
                  </>
                )}
              </Radio>
              <Radio value="mtn" as="div" className="relative ">
                {({ checked }) => (
                  <>
                    <Disclosure as="div" className="flex flex-col">
                      <DisclosureButton className="flex items-center gap-3 px-4 py-3">
                        <input
                          type="radio"
                          className="dui-radio dui-radio-sm sm:dui-radio-md"
                          checked={checked}
                          readOnly
                        />
                        MTN mobile money
                      </DisclosureButton>
                      <div className="relative overflow-hidden">
                        <DisclosurePanel
                          transition
                          as="div"
                          className="flex gap-5 px-4 pb-3 transition duration-100 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                        >
                          {({ close }) => {
                            if (!checked) close();

                            return <PhoneInputLabel title="Phone number" />;
                          }}
                        </DisclosurePanel>
                      </div>
                    </Disclosure>
                  </>
                )}
              </Radio>
            </RadioGroup>
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
              <Button type="submit">Done</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
