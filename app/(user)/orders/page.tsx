"use client";

import SearchFilterInput from "@/components/filter/search-filter-input";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import Orders from "@/data/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pagination } from "@nextui-org/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const rows = Orders.map((order) => ({
  key: order.id,
  orderId: order.id,
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
    allowSorting: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Amount ($)",
    dataIndex: "amount",
    key: "amount",
    allowSorting: true,
  },
];

const inputsSchema = z.object({
  keyword: z.string().min(1),
  rows: z.number().default(5),
});

type InputsType = z.infer<typeof inputsSchema>;

const rowsSelections = [
  { key: 5, text: "5" },
  { key: 10, text: "10" },
  { key: 15, text: "15" },
];

export default function OrdersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState(1);
  const methods = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });
  const rowsWatcher = methods.watch("rows");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => {
    !isMounted && setIsMounted(true);

    setRowsPerPage(rowsWatcher ?? 5);
    setPage(1);
  }, [isMounted, rowsWatcher]);

  if (!isMounted) return;

  return (
    <>
      <title>Your Orders</title>
      <div className="maximum-width space-y-5 pt-5">
        <FormProvider {...methods}>
          <SearchFilterInput />
        </FormProvider>

        <Table
          bottomContent={
            <div className="flex flex-col items-end justify-between gap-5 md:flex-row">
              <div className="flex items-center gap-3 text-neutral-500">
                <span>View</span>
                <FormProvider {...methods}>
                  <SelectInputLabel name="rows" selections={rowsSelections} />
                </FormProvider>
                <span>Orders per page</span>
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
          }
          classNames={{ tbody: "border-b" }}
          aria-label="Example static collection table"
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
          <TableBody>
            {items.map((order) => (
              <TableRow key={order.key}>
                <TableCell className="py-3">{order.orderId}</TableCell>
                <TableCell className="py-3">{order.date}</TableCell>
                <TableCell className="py-3">{order.items}</TableCell>
                <TableCell className="py-3">{order.status}</TableCell>
                <TableCell className="py-3">${order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
