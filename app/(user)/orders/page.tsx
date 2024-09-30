"use client";

import SearchFilterInput from "@/components/input-labels/search-input-label";
import SelectInput from "@/components/input-labels/select-input-label";
import Orders from "@/data/orders";
import { rowsPerPageSelections } from "@/utils/constants/sort-filter-options";
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
import Link from "next/link";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
];

const inputsSchema = z.object({
  keyword: z.string().min(1),
  rows: z.number().default(5),
});

type InputsType = z.infer<typeof inputsSchema>;

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
      <div className="maximum-width dynamic-hero-height flex flex-col gap-y-3 py-5">
        <FormProvider {...methods}>
          <SearchFilterInput
            name="search"
            register={methods.register("keyword")}
          />
        </FormProvider>

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
          <TableBody>
            {items.map((order) => (
              <TableRow key={order.key}>
                <TableCell className="py-3">
                  <Link href={`/orders/${order.id}`} className="underline">
                    {order.orderId}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap py-3">
                  {order.date}
                </TableCell>
                <TableCell className="py-3">{order.items}</TableCell>
                <TableCell className="py-3">{order.status}</TableCell>
                <TableCell className="py-3">${order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex max-w-full flex-col items-center justify-between gap-5 overflow-x-auto overflow-y-visible py-3 xs:overflow-x-hidden sm:flex-row">
          <div className="flex flex-col items-center gap-3 text-neutral-500 xs:flex-row">
            <span className="hidden xs:block">View</span>
            <FormProvider {...methods}>
              <SelectInput
                className="w-full xs:min-w-20 sm:w-20"
                name="rows"
                selectOptions={rowsPerPageSelections}
              />
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
      </div>
    </>
  );
}
