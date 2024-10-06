import Button from "@/components/button";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import { orderStatus } from "@/utils/constants/sort-filter-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  status: z.string(),
});

type InputsType = z.infer<typeof inputsSchema>;

interface EditOrderStatusProperties {
  order: OrderDto;
  closeHandler: () => void;
}

const onSubmit: SubmitHandler<InputsType> = (data) => data;

export default function EditOrderStatus({
  order,
  closeHandler,
}: EditOrderStatusProperties) {
  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });

  return (
    <>
      <input
        type="checkbox"
        checked={true}
        readOnly
        className="dui-modal-toggle"
      />

      <dialog className="dui-modal dui-modal-middle" role="dialog">
        <div className="dui-modal-box flex flex-col items-center gap-2 rounded-none p-2 pb-5 text-sm sm:text-base">
          <button
            className="size-5 self-end leading-none transition hover:bg-tertiary sm:size-7"
            onClick={closeHandler}
          >
            ✕
          </button>
          <h3 className="my-5 text-lg font-medium">
            {order.displayId} (${order.total})
          </h3>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid w-full gap-5 xs:w-2/3 sm:w-1/2"
            >
              <SelectInputLabel name="rows" selectOptions={orderStatus} />

              <Button type="submit">Update</Button>
            </form>
          </FormProvider>
        </div>
        <label
          className="dui-modal-backdrop bg-black/80"
          onClick={closeHandler}
        >
          Close
        </label>
      </dialog>
    </>
  );
}
