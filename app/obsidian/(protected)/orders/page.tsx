"use client";

import SearchFilterInput from "@/components/input-labels/search-input-label";
import SelectInput from "@/components/input-labels/select-input-label";
import { orderStatus } from "@/utils/constants/sort-filter-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

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
    allowSorting: true,
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
    allowSorting: true,
  },
];

const inputsSchema = z.object({
  search: z.string().min(1),
  rows: z.number().default(5),
  status: z.string(),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function OrdersPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: { status: orderStatus[0].key },
  });

  return (
    <>
      <title>Orders</title>
      <div className="space-y-5 pt-5">
        <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-end">
          <FormProvider {...methods}>
            <SearchFilterInput
              name="search"
              register={methods.register("search")}
              className="flex-1"
            />

            <SelectInput
              resetValue={() => {
                methods.setValue("status", "all");
              }}
              name="status"
              selectOptions={orderStatus}
            />
          </FormProvider>
        </div>

        <Table
          className="mt-2 max-w-full flex-1 overflow-x-auto"
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
            {[]}
          </TableBody>
        </Table>
      </div>
    </>
  );
}