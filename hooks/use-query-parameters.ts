import { useSearchParams } from "next/navigation";

export default function useQueryParameters() {
  const searchParameters = useSearchParams();
  const parameters = new URLSearchParams(searchParameters.toString());

  return {
    removeAll: () => {
      window.history?.replaceState(undefined, "", "/menu");
    },
    updateOrDelete: (property: string, value?: string) => {
      if (value) parameters.set(property, value);
      else parameters.delete(property);

      const newParameters = parameters.toString();
      window.history?.pushState(
        {},
        "",
        `${window.location.pathname}?${newParameters}`,
      );
    },
  };
}
