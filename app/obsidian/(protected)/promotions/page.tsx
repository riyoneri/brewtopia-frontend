"use client";

import Button from "@/components/button";
import SearchInputLabel from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import Discounts from "@/data/discounts";
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
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowRight, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { z } from "zod";

const columns = [
  {
    title: "No",
    key: "index",
    dataIndex: "index",
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const inputsSchema = z.object({
  search: z.string().min(1),
  rows: z.number().default(5),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function PromotionsPage() {
  const pathname = usePathname();
  const [_itemToDelete, setItemToDelete] = useState<undefined | ItemToDelete>();

  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      rows: 5,
    },
  });

  const [page, setPage] = useState(1);
  const rowsWatcher = methods.watch("rows");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(Discounts.length / rowsPerPage);

  const discounts = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return Discounts.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => {
    setRowsPerPage(rowsWatcher ?? 5);
    setPage(1);
  }, [rowsWatcher]);

  return (
    <>
      <title>Promotions</title>
      {/* {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          type="category"
          closeModal={() => setItemToDelete(undefined)}
        />
      )} */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-start">
          <FormProvider {...methods}>
            <SearchInputLabel
              name="search"
              register={methods.register("search")}
              className="flex-1"
            />
          </FormProvider>
          <Link href={`${pathname}/create`}>
            <Button className="w-full">Add Discount</Button>
          </Link>
        </div>

        <Table
          className="flex-1 overflow-x-auto"
          classNames={{ tbody: "border-b", tr: "border-b" }}
          aria-label="Products table"
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
          <TableBody emptyContent={"You don't have any discounts yet."}>
            {discounts.map((discount, index) => (
              <TableRow key={discount.id} className="*:whitespace-nowrap">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{discount.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-5">
                    <div className="grid">
                      <p>{dayjs(discount.startDate).format("DD MMM YYYY")}</p>
                      <span className="text-sm text-neutral-400">
                        {dayjs(discount.startDate).format("HH:mm")}
                      </span>
                    </div>
                    <FaArrowRight />
                    <div className="grid">
                      <p>{dayjs(discount.endDate).format("DD MMM YYYY")}</p>
                      <span className="text-sm text-neutral-400">
                        {dayjs(discount.endDate).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{discount.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-5">
                    <Link href={`${pathname}/${discount.id}/update`}>
                      <Button variant="outline">
                        <FaPenToSquare />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="group/delete-btn"
                      onClick={() => setItemToDelete(discount)}
                    >
                      <FaTrash className="text-accent-red group-hover/delete-btn:text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex max-w-full flex-col items-center justify-between gap-5 overflow-x-auto overflow-y-visible  xs:overflow-x-hidden lg:flex-row">
          <div className="flex flex-col items-center gap-3 text-neutral-500 xs:flex-row">
            <span className="hidden sm:block">View</span>
            <FormProvider {...methods}>
              <SelectInputLabel
                className="w-full sm:w-20 sm:min-w-20"
                name="rows"
                selectOptions={rowsPerPageSelections}
              />
            </FormProvider>
            <span className="whitespace-nowrap">Products per page</span>
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
