"use client";

import SearchFilterInput from "@/components/filter/search-filter-input";
import Orders from "@/data/orders";
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

export default function OrdersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <>
      <title>Your Orders</title>
      <div className="maximum-width space-y-5 pt-5">
        <SearchFilterInput />
        <Table
          bottomContent={
            <div className="flex justify-between">
              <div className="flex items-center gap-5 text-neutral-500">
                <span className="">View</span>
                <span className="">{rowsPerPage}</span>
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
        <button
          onClick={() => {
            setRowsPerPage((previousRowsPerPage) => previousRowsPerPage + 3);
            setPage(1);
          }}
        >
          Increase view count
        </button>
      </div>
    </>
  );
}
