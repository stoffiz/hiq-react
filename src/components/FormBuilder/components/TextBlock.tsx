import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";

const TextBlock = ({
  register,
  setValue,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  return (
    <FormItem
      title="Text"
      description="Visar upp text."
      field={() => <InputField {...register(`fields.${index}.values.text`)} />}
      id={id}
      {...rest}
    />
  );
};

export default TextBlock;
