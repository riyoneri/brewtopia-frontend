"use client";

import Button from "@/components/button";
import SearchFilterInput from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import DeleteCategoryModal from "@/components/modals/delete-category-modal";
import Categories from "@/data/categories";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { z } from "zod";

const columns = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
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

export default function CategoriesListPage() {
  const pathname = usePathname();
  const [categoryToDelete, setCategoryToDelete] = useState<
    undefined | CategoryDto
  >();
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      rows: 5,
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState(1);
  const rowsWatcher = methods.watch("rows");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(Categories.length / rowsPerPage);

  const categories = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return Categories.slice(start, end);
  }, [page, rowsPerPage]);

  useEffect(() => {
    !isMounted && setIsMounted(true);

    setRowsPerPage(rowsWatcher ?? 5);
    setPage(1);
  }, [isMounted, rowsWatcher]);

  return (
    <>
      <title>All Categories</title>
      {categoryToDelete && (
        <DeleteCategoryModal
          category={categoryToDelete}
          cancelDelete={() => setCategoryToDelete(undefined)}
        />
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-start">
          <FormProvider {...methods}>
            <SearchFilterInput
              name="search"
              register={methods.register("search")}
              className="flex-1"
            />
          </FormProvider>
          <Link href={`${pathname}/create`}>
            <Button className="w-full">Add Category</Button>
          </Link>
        </div>

        <Table
          className="flex-1 overflow-x-auto"
          classNames={{ tbody: "border-b", tr: "border-b" }}
          aria-label="Categories table"
          removeWrapper
          fullWidth
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
          <TableBody emptyContent={"You don't have any categories yet."}>
            {categories.map((category) => (
              <TableRow key={category.id} className="*:whitespace-nowrap">
                <TableCell className="w-full">{category.name}</TableCell>
                <TableCell>
                  <Switch
                    size="sm"
                    defaultSelected
                    aria-label="Category status"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-5">
                    <Link href={`${pathname}/${category.id}/update`}>
                      <Button variant="outline">
                        <FaPenToSquare />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="group/delete-btn"
                      onClick={() => setCategoryToDelete(category)}
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
