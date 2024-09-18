import OrderProductItem from "./order-product-item";

export default function OrderProductsList({
  products,
}: Pick<OrderDto, "products">) {
  return (
    <div>
      <h3 className="text-lg font-medium sm:text-2xl md:text-3xl">
        Your Order
      </h3>
      <div className="divide-y-2 *:py-3">
        {products.map((product) => (
          <OrderProductItem {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
