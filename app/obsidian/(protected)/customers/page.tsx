"use client";

import SearchInputLabel from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import Users from "@/data/users";
import { rowsPerPageSelections } from "@/utils/constants/sort-filter-options";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const columns = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const inputsSchema = z.object({
  search: z.string().min(1),
  rows: z.number().default(5),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function CustomersPage() {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      rows: 5,
    },
  });

  const [page, setPage] = useState(1);
  const rowsWatcher = methods.watch("rows");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(Users.length / rowsPerPage);

  const customers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return Users.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => {
    setRowsPerPage(rowsWatcher ?? 5);
    setPage(1);
  }, [rowsWatcher]);

  return (
    <>
      <title>All Customers</title>

      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <SearchInputLabel
            name="search"
            register={methods.register("search")}
          />
        </FormProvider>

        <Table
          className="flex-1 overflow-x-auto"
          classNames={{ tbody: "border-b", tr: "border-b" }}
          aria-label="Customers table"
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
          <TableBody emptyContent={"You don't have customers products yet."}>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="*:whitespace-nowrap">
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Switch
                    size="sm"
                    defaultSelected
                    aria-label="Product status"
                  />
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
