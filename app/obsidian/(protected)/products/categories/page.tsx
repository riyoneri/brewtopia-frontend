"use client";

import Button from "@/components/button";
import SearchFilterInput from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import DeleteModal from "@/components/modals/delete-modal";
import useDeleteCategory from "@/hooks/admin/use-admin-delete-category";
import { useGetAllCategories } from "@/hooks/admin/use-admin-get-categories";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [itemToDelete, setItemToDelete] = useState<undefined | ItemToDelete>();
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      rows: 5,
    },
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsWatcher = methods.watch("rows");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    getAllCategoriesData,
    getAllCategoriesError,
    getAllCategoriesLoading,
  } = useGetAllCategories(page, rowsPerPage);

  useEffect(() => {
    setRowsPerPage(rowsWatcher ?? 5);
    setPage(1);
  }, [rowsWatcher]);

  useEffect(() => {
    if (getAllCategoriesData) {
      if (getAllCategoriesData.categories.length === 0 && page > 1)
        setPage((previousPage) => --previousPage);

      setTotalPages(Math.ceil(getAllCategoriesData.total / rowsPerPage));
    }
  }, [getAllCategoriesData, page, rowsPerPage]);

  return (
    <>
      <title>All Categories</title>
      {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          type="category"
          fetchData={useDeleteCategory}
          closeModal={() => setItemToDelete(undefined)}
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
          <TableBody
            isLoading={getAllCategoriesLoading}
            loadingContent={
              <span className="dui-loading dui-loading-spinner dui-loading-lg h-min"></span>
            }
            emptyContent={
              getAllCategoriesError ? (
                <p className="text-center text-accent-red">
                  {getAllCategoriesError?.message}
                </p>
              ) : (
                "You don't have any categories yet."
              )
            }
          >
            {getAllCategoriesData?.categories?.map((category) => (
              <TableRow key={category.id} className="*:whitespace-nowrap">
                <TableCell className="w-full">{category.name}</TableCell>
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
                      onClick={() =>
                        setItemToDelete({
                          id: category.id,
                          name: category.name,
                        })
                      }
                    >
                      <FaTrash className="text-accent-red group-hover/delete-btn:text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )) ?? []}
          </TableBody>
        </Table>

        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <div className="flex flex-col items-center gap-3 text-neutral-500 xs:flex-row">
            <span className="hidden sm:block">View</span>
            <FormProvider {...methods}>
              <SelectInputLabel
                className="w-full sm:w-20 sm:min-w-20"
                name="rows"
                selectOptions={rowsPerPageSelections}
              />
            </FormProvider>
            <span className="whitespace-nowrap">Categories per page</span>
          </div>
          <Pagination
            isCompact
            showControls
            className="max-w-full"
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
