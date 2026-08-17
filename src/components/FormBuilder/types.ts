import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { FormValues } from "./FormBuilder";

export type FormItemBlockProps = {
  id: string;
  expanded: boolean;
  index: number;
  setValue?: UseFormSetValue<FormValues>;
  register: UseFormRegister<FormValues>;
  unregister?: UseFormUnregister<FormValues>;
  onRemove: (id: string) => void;
  onToggleExpanded?: (id: string) => void;
  onMove?: (dir: "up" | "down") => void;
};
