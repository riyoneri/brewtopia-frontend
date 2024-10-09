import Button from "@/components/button";
import ConfirmedIllustration from "@/components/illustrations/confirmed-illustration";
import OrderProductsList from "@/components/order/order-products-list";
import ProductsList from "@/components/products/products-list";
import Orders from "@/data/orders";
import Link from "next/link";

export default function CheckoutDonePage() {
  return (
    <>
      <title>Checkout done</title>
      <div className="maximum-width pt-5">
        <section className="grid gap-3">
          <ConfirmedIllustration className="mx-auto w-1/3 xs:w-1/4 sm:w-1/6 lg:w-1/12" />
          <h3 className="mt-5 text-lg font-medium sm:text-center sm:text-xl md:text-3xl">
            Thanks for your order!
          </h3>
          <p className="sm:text-center">
            The order confirmation has been sent to{" "}
            <span className="font-medium underline">brewtopia@gmail.com</span>
          </p>
          <div className="mt-5 space-y-2">
            <div className="flex flex-col gap-2 xs:flex-row xs:items-center">
              <span className="font-medium lg:w-1/6">Transaction Date:</span>
              <span>29 April 2024</span>
            </div>
            <div className="flex flex-col gap-2 xs:flex-row xs:items-center">
              <span className="font-medium lg:w-1/6">Payment Method:</span>
              <span>Credit or Debit Card</span>
            </div>
            <div className="flex flex-col gap-2 xs:flex-row xs:items-center">
              <span className="font-medium lg:w-1/6">Shipping Address:</span>
              <span>KG 259 St.</span>
            </div>
          </div>
          <hr className="border-2" />
          <OrderProductsList products={Orders[0].products} />
          <hr className="border-2" />
          <div className="flex justify-between text-2xl font-medium">
            <p>Total</p>
            <p>${Orders[0].total}</p>
          </div>

          <Link href="/menu" className="mx-auto w-full font-medium sm:w-fit">
            <Button>Continue Shopping</Button>
          </Link>
        </section>

        <section className="mt-10 bg-tertiary py-8 sm:py-10">
          <div className="maximum-width space-y-5 sm:space-y-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              You May Also Like
            </h2>
            <ProductsList loading />
          </div>
        </section>
      </div>
    </>
  );
}
