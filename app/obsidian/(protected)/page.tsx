"use client";

import DeliveryIllustration from "@/assets/illustrations/delivery.illustration";
import SearchInputLabel from "@/components/input-labels/search-input-label";
import NewOrdersList from "@/components/new-orders/new-orders-list";
import SummaryChart from "@/components/summary-chart";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaBoxesPacking, FaCartShopping, FaTruck } from "react-icons/fa6";
import { z } from "zod";

const inputsSchema = z.object({ orderId: z.string().min(1) });

type InputsType = z.infer<typeof inputsSchema>;

export default function AdminHomePage() {
  const { register } = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  return (
    <>
      <title>Dashboard</title>

      <div className="space-y-5">
        <div className="grid grid-rows-3 gap-5 *:p-3 xs:grid-cols-2 sm:grid-rows-2 sm:*:p-5 md:grid-cols-3">
          <div className="relative col-span-full row-span-2 space-y-2 overflow-hidden bg-accent-yellow/50 text-center xs:row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold">Track Order</h3>
            <p className="text-sm text-neutral-500">
              Type your order id find the order
            </p>
            <SearchInputLabel
              className="relative z-10 bg-white"
              name="orderId"
              register={register("orderId")}
            />
            <DeliveryIllustration className="absolute bottom-0 left-1/2 h-2/3 -translate-x-1/2 opacity-50" />
          </div>

          <div className="flex flex-row items-center justify-between gap-3 bg-tertiary/70 sm:flex-col-reverse lg:flex-row">
            <div>
              <h3 className="font-medium lg:text-lg">New Order</h3>
              <p className="text-2xl">3</p>
              <div className="space-x-1 text-neutral-500">
                <span>Rate:</span>
                <span className="text-accent-green">5%</span>
              </div>
            </div>
            <span className="rounded-full bg-primary p-3 text-white">
              <FaCartShopping />
            </span>
          </div>

          <div className="flex flex-row items-center justify-between gap-3 bg-primary/30 sm:flex-col-reverse lg:flex-row">
            <div>
              <h3 className="font-medium lg:text-lg">Order Processed</h3>
              <p className="text-2xl">20</p>
              <div className="space-x-1 text-neutral-500">
                <span>Rate:</span>
                <span className="text-accent-green">20%</span>
              </div>
            </div>
            <span className="rounded-full bg-accent-yellow p-3 text-white">
              <FaBoxesPacking />
            </span>
          </div>

          <div className="flex flex-row items-center justify-between gap-3 bg-accent-green/20 sm:flex-col-reverse sm:max-md:col-span-2 lg:flex-row">
            <div>
              <h3 className="font-medium lg:text-lg">Order Shipped</h3>
              <p className="text-2xl">239</p>
              <div className="space-x-1 text-neutral-500">
                <span>Rate:</span>
                <span className="text-accent-green">20%</span>
              </div>
            </div>
            <span className="rounded-full bg-accent-blue p-3 text-white">
              <FaTruck />
            </span>
          </div>

          <div className="bg-neutral-700 text-white sm:col-span-2 lg:col-span-1">
            <h3 className="font-medium lg:text-lg">New Customers This Month</h3>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
              <div>
                <p className="text-2xl">410</p>
                <div className="space-x-1">
                  <span>Growth:</span>
                  <span className="text-accent-green">20%</span>
                </div>
              </div>
              <div className="dui-avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="dui-avatar">
                  <div className="w-10">
                    <Image
                      width={50}
                      height={50}
                      alt="User Image"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="dui-avatar">
                  <div className="w-10">
                    <Image
                      width={50}
                      height={50}
                      alt="User Image"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="dui-avatar">
                  <div className="w-10">
                    <Image
                      width={50}
                      height={50}
                      alt="User Image"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="dui-avatar dui-placeholder">
                  <div className="w-10 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <NewOrdersList className="order-2 w-full xl:order-1 xl:col-span-1" />
          <SummaryChart className="order-1 xl:order-2 xl:col-span-2" />
        </div>
      </div>
    </>
  );
}
