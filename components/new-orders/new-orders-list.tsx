import Orders from "@/data/orders";
import classNames from "classnames";

import NewOrderItem from "./new-order-item";

interface NewOrdersListProperties {
  className?: string;
}

export default function NewOrdersList({ className }: NewOrdersListProperties) {
  return (
    <div className={classNames(className, "bg-tertiary p-5 space-y-3")}>
      <h3 className="flex items-center gap-3 font-semibold">
        New Orders
        <span className="bg-accent-yellow px-3 py-1">5</span>
      </h3>

      <NewOrderItem {...Orders[0]} />
      <NewOrderItem {...Orders[1]} />
      <NewOrderItem {...Orders[2]} />
      <NewOrderItem {...Orders[3]} />
      <NewOrderItem {...Orders[4]} />
    </div>
  );
}
