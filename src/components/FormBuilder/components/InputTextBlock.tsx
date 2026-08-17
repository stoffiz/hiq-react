import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";

const InputTextBlock = ({
  register,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  return (
    <FormItem
      title="Textfält"
      description="Kunden kan skriva in valfri text."
      field={() => (
        <>
          <InputField
            label="Label"
            placeholder="Label"
            {...register(`fields.${index}.values.label`)}
          />
          <InputField
            label="Placeholder-text (valfri)"
            placeholder="Placeholder-text"
            {...register(`fields.${index}.values.placeholder`)}
          />
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default InputTextBlock;
