"use client";

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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
    .min(1)
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .default(""),
  cardCVV: z
    .string()
    .min(1)
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .default(""),
  phoneNumber: z.string().min(1),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CheckoutPaymentPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });
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
                        className="flex flex-col flex-wrap gap-3 px-4 pb-3 transition duration-100 ease-out *:flex-1 data-[closed]:-translate-y-6 data-[closed]:opacity-0 sm:flex-row sm:gap-5"
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
                              />
                              <TextInputLabel
                                title="Name"
                                register={methods.register("name")}
                                placeholder="Enter name on card"
                              />

                              <TextInputLabel
                                title="Expiration date"
                                register={methods.register("expirationDate")}
                                placeholder="MM/YY"
                              />
                              <TextInputLabel
                                title="CVV"
                                register={methods.register("cardCVV")}
                                placeholder="Enter card CVV"
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

                          return (
                            <>
                              <PhoneInputLabel title="Phone number" />
                            </>
                          );
                        }}
                      </DisclosurePanel>
                    </div>
                  </Disclosure>
                </>
              )}
            </Radio>
          </RadioGroup>
        </FormProvider>
      </div>
    </>
  );
}
