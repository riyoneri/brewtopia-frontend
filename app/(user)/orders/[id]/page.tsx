import OrderProductsList from "@/components/order/order-products-list";
import Orders from "@/data/orders";
import dayjs from "dayjs";
import { FaCircleCheck } from "react-icons/fa6";

const order = Orders[0];

export default function OrderDetails() {
  return (
    <>
      <title>Order Details</title>
      <div className="from-white from-90% to-tertiary to-90% lg:bg-gradient-to-r ">
        <div className="maximum-width flex flex-col gap-10 *:pt-5 lg:flex-row">
          <div className="flex-1 space-y-5 bg-white">
            <h1 className="text-4xl font-medium">Order Details</h1>
            <div className="mt-10 space-y-2">
              <div className="flex flex-col lg:flex-row lg:items-center">
                <span className="font-semibold lg:w-1/4">Order Status:</span>
                <span>{order.status}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <span className="font-semibold lg:w-1/4">
                  Transaction Date:
                </span>
                <span>{dayjs().format("D MMM YYYY")}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <span className="font-semibold lg:w-1/4">Payment method:</span>
                <span>Credit or Debit Card</span>
              </div>
            </div>
            <hr className="border-2" />
            <OrderProductsList products={order.products} />
          </div>
          <div className="lg:dynamic-hero-height mb-5 w-full space-y-5 bg-tertiary px-5 lg:mb-0 lg:w-96">
            <h3 className="text-xl font-medium xs:text-2xl">Order Status</h3>
            <div>
              <ul className="dui-timeline dui-timeline-vertical dui-timeline-compact md:dui-timeline-horizontal lg:dui-timeline-vertical">
                <li>
                  <div className="dui-timeline-middle">
                    <FaCircleCheck className="text-2xl" />
                  </div>
                  <div className="dui-timeline-end  space-y-2 rounded-none">
                    <h3 className="font-medium">Processed</h3>
                    <p className="text-sm">
                      The order is being processed by the seller
                    </p>
                  </div>
                  <hr className="" />
                </li>
                <li>
                  <hr className="" />
                  <div className="dui-timeline-middle">
                    <FaCircleCheck className="text-2xl" />
                  </div>
                  <div className="dui-timeline-end ">
                    <h3 className="font-medium">Shipped</h3>
                    <p className="text-sm">
                      The order has been sent by the seller
                    </p>
                  </div>
                  <hr className="" />
                </li>
                <li>
                  <hr className="" />
                  <div className="dui-timeline-middle">
                    <FaCircleCheck className="text-2xl" />
                  </div>
                  <div className="dui-timeline-end ">
                    <h3 className="font-medium">Delivered</h3>
                    <p className="text-sm">
                      The order has been received by the buyer
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
