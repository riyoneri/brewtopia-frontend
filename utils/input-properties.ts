import { UseFormRegisterReturn } from "react-hook-form";

export interface AllInputsProperties {
  title: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}
