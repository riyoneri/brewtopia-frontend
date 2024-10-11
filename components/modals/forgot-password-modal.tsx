import { useRouter } from "next/navigation";

export default function ForgotPasswordModal() {
  const router = useRouter();

  return (
    <>
      <input
        type="checkbox"
        checked={true}
        readOnly
        className="dui-modal-toggle"
      />

      <dialog className="dui-modal dui-modal-middle" role="dialog">
        <div className="dui-modal-box flex flex-col items-center gap-2 rounded-none px-3 text-sm xs:px-5 sm:text-base">
          <button
            className="size-5 self-end leading-none transition hover:bg-tertiary  sm:size-7"
            onClick={() => router.replace("./login")}
          >
            ✕
          </button>

          <h2 className="mb-2 font-medium xs:text-lg sm:text-xl">
            Reset password instructions sent!
          </h2>

          <p className="text-pretty text-center">
            Instructions to reset your password have been sent to your email.
            Please check your inbox and follow the instructions
          </p>
        </div>
        <label className="dui-modal-backdrop bg-black/80"></label>
      </dialog>
    </>
  );
}
