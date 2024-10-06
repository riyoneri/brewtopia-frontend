import Button from "../button";

interface DeleteCategoryModalProperties {
  category: CategoryDto;
  cancelDelete: () => void;
}

export default function DeleteCategoryModal({
  category,
  cancelDelete,
}: DeleteCategoryModalProperties) {
  return (
    <>
      <input type="checkbox" checked readOnly className="dui-modal-toggle" />

      <dialog className="dui-modal dui-modal-middle" role="dialog">
        <div className="dui-modal-box flex flex-col items-center gap-2 rounded-none p-5 text-center text-sm sm:text-base">
          <h2 className="text-xl font-medium underline">Delete Category</h2>
          <p>Are you sure you want to delete this category?</p>
          <p className="my-4 font-medium">{category.name}</p>
          <hr className="w-full border-2" />
          <div className="mt-2 flex flex-col gap-3 self-stretch *:flex-1 xs:flex-row xs:justify-end xs:gap-5 xs:self-end">
            <Button className="flex items-center justify-center border-transparent !bg-accent-red">
              Delete
              <span className="dui-loading dui-loading-spinner dui-loading-sm"></span>
            </Button>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
          </div>
        </div>
        <label className="dui-modal-backdrop bg-black/80">Close</label>
      </dialog>
    </>
  );
}
