"use client";

import Button from "@/components/button";
import SearchFilterInput from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import DatePickerInput from "@/components/inputs/date-picker-input";
import EditOrderStatus from "@/components/modals/admin/edit-order-status";
import Orders from "@/data/orders";
import {
  orderStatus,
  rowsPerPageSelections,
} from "@/utils/constants/sort-filter-options";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { z } from "zod";

const rows = Orders.map((order) => ({
  key: order.id,
  id: order.id,
  orderId: order.displayId,
  date: dayjs(order.createdAt).format("DD MMM YYYY"),
  items: order.products.length,
  status: order.status,
  amount: order.total,
}));

const columns = [
  {
    title: "Order Id",
    key: "orderId",
    dataIndex: "orderId",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const inputsSchema = z.object({
  search: z.string(),
  rows: z.number(),
  status: z.string(),
  dateRange: z.object({
    start: z.string().date(),
    end: z.string().date(),
  }),
});

type InputsType = z.infer<typeof inputsSchema>;

const defaultDateRange = {
  start: dayjs().format("YYYY-MM-DD"),
  end: dayjs().format("YYYY-MM-DD"),
};

export default function OrdersPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      status: orderStatus[0].key,
      dateRange: defaultDateRange,
      rows: 5,
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState(1);
  const rowsWatcher = methods.watch("rows");
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | undefined>();

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => {
    !isMounted && setIsMounted(true);

    setRowsPerPage(Number(rowsWatcher));
    setPage(1);
  }, [isMounted, rowsWatcher]);

  if (!isMounted) return;

  return (
    <>
      <title>Orders</title>
      {selectedOrder && (
        <EditOrderStatus
          order={selectedOrder}
          closeHandler={() => setSelectedOrder(undefined)}
        />
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-5 xl:flex-row xl:items-start">
          <FormProvider {...methods}>
            <SearchFilterInput
              name="search"
              register={methods.register("search")}
              className="flex-1"
            />

            <SelectInputLabel
              resetInput={() => {
                methods.setValue("status", "all");
              }}
              name="status"
              selectOptions={orderStatus}
            />

            <DatePickerInput
              name="dateRange"
              resetInput={() => {
                methods.setValue("dateRange", defaultDateRange);
              }}
            />
          </FormProvider>
        </div>

        <Table
          className="flex-1 overflow-x-auto"
          classNames={{ tbody: "border-b" }}
          aria-label="Orders table"
          removeWrapper
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn
                className="border-y-2 border-black bg-transparent text-base text-black hover:text-black"
                key={column.key}
              >
                {column.title}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"You don't have any orders yet."}>
            {items.map((order) => (
              <TableRow key={order.key}>
                <TableCell className="py-3">{order.orderId}</TableCell>
                <TableCell className="whitespace-nowrap py-3">
                  {order.date}
                </TableCell>
                <TableCell className="py-3">{order.items}</TableCell>
                <TableCell className="py-3">{order.status}</TableCell>
                <TableCell className="py-3">${order.amount}</TableCell>
                <TableCell className="py-3">
                  <Button
                    onClick={() =>
                      setSelectedOrder(
                        Orders.find((orderItem) => orderItem.id === order.id),
                      )
                    }
                    variant="outline"
                  >
                    <FaArrowUpRightFromSquare />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex max-w-full flex-col items-center justify-between gap-5 overflow-x-auto overflow-y-visible py-3 xs:overflow-x-hidden lg:flex-row">
          <div className="flex flex-col items-center gap-3 text-neutral-500 xs:flex-row">
            <span className="hidden sm:block">View</span>
            <FormProvider {...methods}>
              <SelectInputLabel
                className="w-full sm:w-20 sm:min-w-20"
                name="rows"
                selectOptions={rowsPerPageSelections}
              />
            </FormProvider>
            <span className="whitespace-nowrap">Orders per page</span>
          </div>
          <Pagination
            isCompact
            showControls
            radius="none"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  );
}
