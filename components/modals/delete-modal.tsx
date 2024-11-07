import { UseMutateFunction } from "@tanstack/react-query";

import Button from "../button";

interface DeleteModalProperties {
  item: ItemToDelete;
  type: string;
  fetchData: () => {
    isPending: boolean;
    mutate: UseMutateFunction<ResponseData, ResponseError, string, unknown>;
    error: ResponseError | null;
    data: ResponseData | undefined;
  };
  closeModal: () => void;
}

export default function DeleteModal({
  item,
  type,
  fetchData,
  closeModal,
}: DeleteModalProperties) {
  const { data, error, isPending, mutate } = fetchData();

  data && closeModal();

  return (
    <>
      <input type="checkbox" checked readOnly className="dui-modal-toggle" />

      <dialog className="dui-modal dui-modal-middle" role="dialog">
        <div className="dui-modal-box flex flex-col items-center gap-2 rounded-none p-5 text-center text-sm sm:text-base">
          <h2 className="text-xl font-medium capitalize underline">
            Delete {type}
          </h2>
          <p>Are you sure you want to delete this {type}?</p>
          <p className="my-4 font-medium">{item.name}</p>
          <hr className="w-full border-2" />
          {error && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {error.message}
            </p>
          )}
          <div className="mt-2 flex flex-col gap-3 self-stretch *:flex-1 xs:flex-row xs:justify-end xs:gap-5 xs:self-end">
            <Button
              onClick={() => mutate(item.id)}
              disabled={isPending}
              className="flex items-center justify-center border-transparent !bg-accent-red disabled:!border-accent-red/5 disabled:!bg-accent-red/40"
            >
              {isPending ? (
                <span className="dui-loading dui-loading-spinner dui-loading-sm"></span>
              ) : (
                "Delete"
              )}
            </Button>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
        <label className="dui-modal-backdrop bg-black/80"></label>
      </dialog>
    </>
  );
}
