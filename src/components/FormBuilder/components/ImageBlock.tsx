import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";

const ImageBlock = ({
  register,
  id,
  index,
  setValue,
  ...rest
}: FormItemBlockProps) => {
  return (
    <FormItem
      title="Bild"
      description="Visar upp en bild."
      field={() => (
        <>
          <input {...register(`fields.${index}.values.file`)} type="file" />
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default ImageBlock;
