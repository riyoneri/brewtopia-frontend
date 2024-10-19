import DeactivatedIllustration from "@/assets/illustrations/deactivated.illustration";
import { useSession } from "next-auth/react";

export default function DeactivatedAccount() {
  const { data: session } = useSession();

  return (
    <div className="hero-height grid place-content-center gap-2 px-5 text-center">
      <DeactivatedIllustration className="mx-auto w-2/3 sm:w-1/2" />
      <p className="py-5 text-xl font-medium">Hey {session?.user.name}</p>
      <p>
        We hope you&apos;re well. Your Brewtopia account is currently
        deactivated.
      </p>

      <p>
        If this is an error or you need help, we&apos;re here for you. Reach out
        anytime! Cheers,
      </p>
      <p className="font-medium">The Brewtopia Team</p>
    </div>
  );
}
