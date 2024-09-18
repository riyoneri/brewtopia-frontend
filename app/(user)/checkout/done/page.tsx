import Button from "@/components/button";
import ConfirmedIllustration from "@/components/illustrations/confirmed-illustration";
import OrderItemsList from "@/components/order/order-products-list";
import ProductsList from "@/components/products/products-list";
import Orders from "@/data/orders";

export default function CheckoutDonePage() {
  return (
    <>
      <title>Checkout done</title>
      <div className="maximum-width pt-5">
        <section className="grid gap-3">
          <ConfirmedIllustration className="mx-auto w-1/3 sm:w-1/5" />
          <h3 className="mt-5 text-center text-xl font-medium sm:text-3xl">
            Thanks for your order!
          </h3>
          <p className="text-center">
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
          <OrderItemsList products={Orders[0].products} />
          <hr className="border-2" />
          <div className="flex justify-between text-2xl font-medium">
            <p>Total</p>
            <p>${Orders[0].total}</p>
          </div>

          <Button className="mx-auto w-full font-medium sm:w-fit">
            Continue Shopping
          </Button>
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
