import ConfirmedIllustration from "@/components/illustrations/confirmed-illustration";
import OrderItemsList from "@/components/order/order-items-list";

export default function CheckoutDonePage() {
  return (
    <>
      <title>Checkout done</title>
      <div className="maximum-width grid gap-2 space-y-2 pt-5">
        <ConfirmedIllustration className="mx-auto w-1/3 sm:w-1/5" />
        <h3 className="mt-5 text-center text-xl font-medium sm:text-3xl">
          Thanks for your order!
        </h3>
        <p className="text-center">
          The order confirmation has been sent to{" "}
          <span className="font-medium underline">brewtopia@gmail.com</span>
        </p>
        <div className="mt-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium lg:w-1/6">Transaction Date:</span>
            <span>29 April 2024</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium lg:w-1/6">Payment Method:</span>
            <span>Credit or Debit Card</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium lg:w-1/6">Shipping Address:</span>
            <span>KG 259 St.</span>
          </div>
        </div>
        <hr className="border-2" />
        <OrderItemsList />
      </div>
    </>
  );
}
